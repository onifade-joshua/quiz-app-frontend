import type {
  ImportedDocument,
  Question,
  CBTSession,
  CBTAnswer,
  CBTResult,
  CBTResultAnswer
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
 * generateQuestions - lightweight generator for demo/test use
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
  const questions = session.questions
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
    userId: session.userId, // ✅ now consistent with types
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
