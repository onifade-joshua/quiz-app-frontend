import type {
  ImportedDocument,
  Question,
  CBTSession,
  CBTAnswer,
  CBTResult,
  CBTResultAnswer,
  TheoryQuestion  // ✅ NEW IMPORT
} from '../types'

/**
 * formatTime - convert seconds to mm:ss or hh:mm:ss string
 */
export const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) seconds = 0
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

/**
 * generateQuestions - lightweight generator for demo/test use (OBJECTIVE QUESTIONS)
 */
export const generateQuestions = (
  _selectedDocuments: string[], // renamed with _ to silence unused warning
  difficulty: 'mixed' | 'easy' | 'hard',
  count: number
): Question[] => {
  const difficulties =
    difficulty === 'mixed'
      ? ['easy', 'medium', 'hard']
      : [difficulty as 'easy' | 'hard' | 'medium']

  const questions: Question[] = []

  for (let i = 0; i < count; i++) {
    const diff = difficulties[Math.floor(Math.random() * difficulties.length)] as
      | 'easy'
      | 'medium'
      | 'hard'

    questions.push({
      id: `q-${Date.now()}-${i}`,
      question: `Sample Question ${i + 1}: Identify the main idea (difficulty: ${diff})`,
      options: {
        A: 'Option A',
        B: 'Option B',
        C: 'Option C',
        D: 'Option D'
      },
      correctAnswer: (['A', 'B', 'C', 'D'][
        Math.floor(Math.random() * 4)
      ] as 'A' | 'B' | 'C' | 'D'),
      difficulty: diff,
      subject: 'General Studies',
      explanation: 'This is a generated explanation for the sample question.',
      audioExplanation: undefined,
      points: diff === 'easy' ? 1 : diff === 'medium' ? 2 : 3,
      timeAllotted: 60
    })
  }

  return questions
}

/**
 * ✅ NEW FUNCTION: generateTheoryQuestions
 * Generate theory questions from imported documents
 */
export const generateTheoryQuestions = (
  documentIds: string[],
  allDocuments: ImportedDocument[],
  count: number
): TheoryQuestion[] => {
  // Filter selected documents
  const selectedDocs = allDocuments.filter(doc => documentIds.includes(doc.id))
  
  if (selectedDocs.length === 0) {
    return []
  }

  const allTheoryQuestions: TheoryQuestion[] = []

  // Extract questions from each document
  for (const doc of selectedDocs) {
    const questions = extractTheoryQuestionsFromDocument(doc, count)
    allTheoryQuestions.push(...questions)
  }

  // Shuffle and limit to requested count
  const shuffled = allTheoryQuestions.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * ✅ NEW HELPER: extractTheoryQuestionsFromDocument
 * Extract theory questions from a single document's content
 */
function extractTheoryQuestionsFromDocument(
  doc: ImportedDocument,
  maxQuestions: number
): TheoryQuestion[] {
  const questions: TheoryQuestion[] = []
  const content = doc.content || doc.textExplanation || ''
  
  if (!content.trim()) {
    // If no content, generate generic questions
    return generateGenericTheoryQuestions(doc, Math.min(3, maxQuestions))
  }

  const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0)

  // Method 1: Look for structured Q&A format
  let currentQuestion = ''
  let currentAnswer = ''
  let inAnswer = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Detect question patterns
    const isQuestionStart = 
      line.match(/^(Question|Q)\s*\d+[:.]/i) ||
      line.match(/^\d+\.\s+/i) ||
      line.match(/^(Discuss|Explain|Define|Describe|Compare|Analyze|Evaluate|Examine)/i)

    if (isQuestionStart) {
      // Save previous question if exists
      if (currentQuestion.trim()) {
        questions.push({
          id: `theory-${doc.id}-${questions.length}`,
          question: currentQuestion.trim(),
          suggestedAnswer: currentAnswer.trim() || 'Refer to course materials for detailed answer.',
          points: 10,
          topic: doc.subject,
          documentId: doc.id,
          difficulty: 'medium'
        })
      }

      // Start new question
      currentQuestion = line.replace(/^(Question|Q)\s*\d+[:.]?\s*/i, '').trim()
      currentAnswer = ''
      inAnswer = false
    }
    // Detect answer patterns
    else if (line.match(/^(Answer|A\d+|Solution)[:]/i)) {
      inAnswer = true
      currentAnswer = line.replace(/^(Answer|A\d+|Solution)[:]\s*/i, '').trim()
    }
    // Continue accumulating answer
    else if (inAnswer && line.length > 0) {
      currentAnswer += ' ' + line
    }
    // Continue accumulating question
    else if (currentQuestion && !inAnswer && line.length > 0 && !line.match(/^(Answer|A\d+|Solution)[:]/i)) {
      currentQuestion += ' ' + line
    }
  }

  // Add last question
  if (currentQuestion.trim()) {
    questions.push({
      id: `theory-${doc.id}-${questions.length}`,
      question: currentQuestion.trim(),
      suggestedAnswer: currentAnswer.trim() || 'Refer to course materials for detailed answer.',
      points: 10,
      topic: doc.subject,
      documentId: doc.id,
      difficulty: 'medium'
    })
  }

  // Method 2: If no structured questions found, generate from content sections
  if (questions.length === 0) {
    const sections = content
      .split('\n\n')
      .map(s => s.trim())
      .filter(s => s.length > 100) // Only substantial sections

    const sampleSize = Math.min(maxQuestions, sections.length)

    for (let i = 0; i < sampleSize; i++) {
      const section = sections[i]
      const preview = section.substring(0, 200)
      const remainingText = section.substring(200)
      
      questions.push({
        id: `theory-${doc.id}-section-${i}`,
        question: `Based on the following excerpt from "${doc.title}", provide a detailed explanation:\n\n"${preview}${section.length > 200 ? '...' : ''}"`,
        suggestedAnswer: remainingText || section,
        points: 10,
        topic: doc.subject,
        documentId: doc.id,
        difficulty: 'medium'
      })
    }
  }

  // Method 3: Last resort - generic questions
  if (questions.length === 0) {
    return generateGenericTheoryQuestions(doc, Math.min(3, maxQuestions))
  }

  return questions.slice(0, maxQuestions)
}

/**
 * ✅ NEW HELPER: generateGenericTheoryQuestions
 * Generate generic theory questions when document has no structure
 */
function generateGenericTheoryQuestions(
  doc: ImportedDocument,
  count: number
): TheoryQuestion[] {
  const genericQuestions = [
    {
      question: `Discuss the main concepts and key ideas presented in "${doc.title}".`,
      answer: `This question requires a comprehensive understanding of the material covered in ${doc.title}. Focus on identifying the core themes, principles, and arguments presented in the document.`
    },
    {
      question: `Explain the significance of the topics covered in ${doc.subject} as presented in this material.`,
      answer: `Consider the broader context and importance of these topics within the field of ${doc.subject}. Discuss how the concepts relate to practical applications and theoretical frameworks.`
    },
    {
      question: `Analyze and evaluate the key arguments or methodologies discussed in "${doc.title}".`,
      answer: `Provide a critical analysis of the approaches, theories, or methodologies presented. Consider strengths, weaknesses, and potential applications.`
    },
    {
      question: `Compare and contrast different perspectives or approaches related to ${doc.subject} covered in this document.`,
      answer: `Identify various viewpoints or methods discussed and analyze their similarities, differences, advantages, and limitations.`
    },
    {
      question: `Describe the practical applications and real-world relevance of the concepts in "${doc.title}".`,
      answer: `Connect theoretical concepts to practical scenarios. Discuss how the knowledge can be applied in professional or academic contexts.`
    }
  ]

  return genericQuestions.slice(0, count).map((q, idx) => ({
    id: `theory-${doc.id}-generic-${idx}`,
    question: q.question,
    suggestedAnswer: q.answer,
    points: 10,
    topic: doc.subject,
    documentId: doc.id,
    difficulty: 'medium'
  }))
}

/**
 * calculateResults - build CBTResult from session + answers
 * - session.timeLimit expected in minutes
 * - answers is a Record keyed by question.id
 */
export const calculateResults = (
  session: CBTSession,
  answers: Record<string, CBTAnswer>,
  timeRemainingSeconds: number,
  autoSubmitted: boolean = false
): CBTResult => {
  const questions = session.questions as Question[] // Type assertion for objective questions
  let earnedPoints = 0
  let correct = 0

  const detailedAnswers: CBTResultAnswer[] = questions.map((q) => {
    const ua = answers[q.id]
    const userAnswer = ua?.selectedAnswer ?? null
    const isCorrect = userAnswer !== null && userAnswer === q.correctAnswer
    if (isCorrect) {
      correct++
      earnedPoints += q.points ?? 1
    }

    return {
      questionId: q.id,
      question: q,
      userAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect,
      explanation: q.explanation,
      audioExplanation: q.audioExplanation,
      timeSpent: ua?.timeSpent ?? 0
    }
  })

  const totalQ = questions.length
  const answeredCount = Object.values(answers).filter((a) => a.answered).length
  const unanswered = totalQ - answeredCount
  const percentage = totalQ > 0 ? Math.round((correct / totalQ) * 100) : 0

  // timeUsed: convert session.timeLimit (minutes) to seconds and subtract remaining seconds
  const totalTimeSeconds = session.timeLimit * 60
  const timeUsed = Math.max(0, totalTimeSeconds - timeRemainingSeconds)

  return {
    sessionId: session.id,
    userId: session.userId,
    answers: detailedAnswers,
    score: earnedPoints,
    percentage,
    totalQuestions: totalQ,
    correctAnswers: correct,
    incorrectAnswers: totalQ - correct - unanswered,
    unanswered,
    timeSpent: timeUsed,
    completedAt: new Date().toISOString(),
    autoSubmitted
  }
}

/**
 * downloadExplanation - downloads document explanation as txt/pdf/docx (txt implemented)
 */
export const downloadExplanation = (
  doc: ImportedDocument,
  format: 'txt' | 'pdf' | 'docx'
): void => {
  const text = [
    `Title: ${doc.title}`,
    `Subject: ${doc.subject}`,
    `Uploaded: ${doc.uploadedAt}`,
    '',
    'Explanation:',
    doc.textExplanation ?? 'No explanation available.'
  ].join('\n\n')

  const blob = new Blob([text], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${doc.title.replace(/\s+/g, '_')}-explanation.${format}`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * downloadQuestionExplanation - downloads a question explanation
 */
export const downloadQuestionExplanation = (
  question: Question,
  userAnswer: 'A' | 'B' | 'C' | 'D' | null,
  index: number
): void => {
  const content = [
    `Question ${index + 1}: ${question.question}`,
    '',
    `Options:`,
    `A. ${question.options.A}`,
    `B. ${question.options.B}`,
    `C. ${question.options.C}`,
    `D. ${question.options.D}`,
    '',
    `Your Answer: ${userAnswer ?? 'Not answered'}`,
    `Correct Answer: ${question.correctAnswer}`,
    '',
    'Explanation:',
    question.explanation || 'No explanation available.'
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `question-${index + 1}-explanation.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * ✅ NEW FUNCTION: downloadTheoryAnswer
 * Download a theory question with user answer and suggested answer
 */
export const downloadTheoryAnswer = (
  question: TheoryQuestion,
  userAnswer: string,
  index: number
): void => {
  const content = [
    `Theory Question ${index + 1}`,
    `Topic: ${question.topic || 'N/A'}`,
    `Points: ${question.points}`,
    '',
    'Question:',
    question.question,
    '',
    '=' .repeat(60),
    '',
    'Your Answer:',
    userAnswer || 'No answer provided',
    '',
    '='.repeat(60),
    '',
    'Suggested Answer:',
    question.suggestedAnswer,
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `theory-question-${index + 1}.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}