import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react'
interface TheoryQuestion {
  id: string
  question: string
  suggestedAnswer: string
  points: number
  topic?: string
}

interface TheoryQuizViewProps {
  questions: TheoryQuestion[]
  onComplete: (answers: Record<string, string>) => void
}

export default function TheoryQuizView({ questions, onComplete }: TheoryQuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showWarning, setShowWarning] = useState(false)

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const hasAnswer = answers[currentQuestion?.id]?.trim().length > 0
  const answeredCount = Object.values(answers).filter(a => a.trim().length > 0).length

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }))
  }

  const handleNext = () => {
    if (!hasAnswer) {
      setShowWarning(true)
      return
    }
    setShowWarning(false)
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrevious = () => {
    setShowWarning(false)
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleSubmit = () => {
    const unanswered = questions.length - answeredCount
    
    if (unanswered > 0) {
      const confirmed = window.confirm(
        `You have ${unanswered} unanswered question${unanswered !== 1 ? 's' : ''}. Submit anyway?`
      )
      if (!confirmed) return
    }

    onComplete(answers)
  }

  const handleQuickNav = (index: number) => {
    setCurrentIndex(index)
    setShowWarning(false)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 mb-6"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="text-sm text-slate-600">
            Question <span className="font-semibold text-slate-900">{currentIndex + 1}</span> of{' '}
            <span className="font-semibold text-slate-900">{questions.length}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-slate-600">
              {answeredCount}/{questions.length} answered
            </span>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 mb-6"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                THEORY
              </span>
              {currentQuestion.topic && (
                <span className="text-xs text-slate-500">{currentQuestion.topic}</span>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed">
              {currentQuestion.question}
            </h3>
            <div className="mt-2 text-sm text-blue-600 font-medium">
              {currentQuestion.points} marks
            </div>
          </div>
        </div>

        {/* Answer Textarea */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Your Answer:
          </label>
          <textarea
            value={answers[currentQuestion.id] || ''}
            onChange={(e) => handleAnswerChange(e.target.value)}
            placeholder="Type your detailed answer here. Include key points, explanations, and examples where relevant..."
            rows={14}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-slate-900 placeholder-slate-400 transition-colors"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-slate-500">
              {answers[currentQuestion.id]?.length || 0} characters
              {answers[currentQuestion.id]?.length > 0 && (
                <span className="ml-2">
                  • ~{Math.ceil((answers[currentQuestion.id]?.length || 0) / 5)} words
                </span>
              )}
            </div>
            {hasAnswer && (
              <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Saved</span>
              </div>
            )}
          </div>
        </div>

        {/* Warning */}
        {showWarning && !hasAnswer && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Please provide an answer before proceeding to the next question.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Question Navigator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 mb-6"
      >
        <div className="text-sm font-semibold text-slate-900 mb-3">Quick Navigation:</div>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id]?.trim().length > 0
            const isCurrent = idx === currentIndex
            
            return (
              <button
                key={q.id}
                onClick={() => handleQuickNav(idx)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all text-sm ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md scale-110'
                    : isAnswered
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}`}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3"
      >
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all font-semibold shadow-sm"
          >
            Submit All Answers
            <CheckCircle className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-medium shadow-sm"
          >
            Next Question
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </motion.div>
    </div>
  )
}