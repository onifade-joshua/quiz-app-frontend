import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, ArrowLeft, ListChecks, FileText } from 'lucide-react'

interface QuizSetupProps {
  selectedCount: number
  onStart: (
    difficulty: 'mixed' | 'easy' | 'hard', 
    duration: number, 
    questionCount: number,
    questionType: 'objective' | 'theory'  // NEW
  ) => void
  onBack: () => void
}

export default function QuizSetup({ selectedCount, onStart, onBack }: QuizSetupProps) {
  const [duration, setDuration] = useState(30)
  const [questionCount, setQuestionCount] = useState(10)
  const [difficulty, setDifficulty] = useState<'mixed' | 'easy' | 'hard'>('mixed')
  const [questionType, setQuestionType] = useState<'objective' | 'theory'>('objective') // NEW

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100">
        <div className="text-center mb-6 sm:mb-8">
          <Target className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Configure Your Practice Test</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Set up your practice session based on {selectedCount} selected document{selectedCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* NEW: Question Type Selection */}
          <div>
            <label className="block font-semibold text-slate-900 mb-3 text-sm sm:text-base">
              Question Type
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                onClick={() => setQuestionType('objective')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  questionType === 'objective'
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <ListChecks className={`w-8 h-8 mx-auto mb-2 ${
                  questionType === 'objective' ? 'text-blue-600' : 'text-slate-600'
                }`} />
                <div className={`font-semibold mb-1 text-sm sm:text-base ${
                  questionType === 'objective' ? 'text-blue-700' : 'text-slate-700'
                }`}>
                  CBT Objective
                </div>
                <div className="text-xs text-slate-600">
                  Multiple choice questions
                </div>
              </button>

              <button
                onClick={() => setQuestionType('theory')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  questionType === 'theory'
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <FileText className={`w-8 h-8 mx-auto mb-2 ${
                  questionType === 'theory' ? 'text-blue-600' : 'text-slate-600'
                }`} />
                <div className={`font-semibold mb-1 text-sm sm:text-base ${
                  questionType === 'theory' ? 'text-blue-700' : 'text-slate-700'
                }`}>
                  Theory Questions
                </div>
                <div className="text-xs text-slate-600">
                  Essay-style answers
                </div>
              </button>
            </div>
          </div>

          {/* Difficulty Selection - Only for Objective */}
          {questionType === 'objective' && (
            <div>
              <label className="block font-semibold text-slate-900 mb-2 sm:mb-3 text-sm sm:text-base">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {(['easy', 'mixed', 'hard'] as const).map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`p-3 sm:p-4 rounded-xl border-2 text-center transition-all ${
                      difficulty === diff
                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="font-semibold capitalize mb-0.5 sm:mb-1 text-sm sm:text-base">
                      {diff}
                    </div>
                    <div className="text-xs">
                      {diff === 'easy' && 'Basic questions'}
                      {diff === 'mixed' && 'All levels'}
                      {diff === 'hard' && 'Advanced'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Duration Slider - Only for Objective */}
          {questionType === 'objective' && (
            <div>
              <label className="block font-semibold text-slate-900 mb-2 sm:mb-3 text-sm sm:text-base">
                Test Duration: <span className="text-blue-600">{duration} minutes</span>
              </label>
              <input
                type="range"
                min="10"
                max="120"
                step="5"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>10 min</span>
                <span>120 min</span>
              </div>
            </div>
          )}

          {/* Question Count Slider */}
          <div>
            <label className="block font-semibold text-slate-900 mb-2 sm:mb-3 text-sm sm:text-base">
              Number of Questions: <span className="text-blue-600">{questionCount}</span>
            </label>
            <input
              type="range"
              min="5"
              max={questionType === 'theory' ? 20 : 50}
              step="5"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>5 questions</span>
              <span>{questionType === 'theory' ? '20' : '50'} questions</span>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Test Summary</h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-600">Type:</span>
                <span className="ml-2 font-medium capitalize text-slate-900">
                  {questionType === 'objective' ? 'CBT' : 'Theory'}
                </span>
              </div>
              {questionType === 'objective' && (
                <>
                  <div>
                    <span className="text-slate-600">Difficulty:</span>
                    <span className="ml-2 font-medium capitalize text-slate-900">{difficulty}</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Duration:</span>
                    <span className="ml-2 font-medium text-slate-900">{duration} min</span>
                  </div>
                  <div>
                    <span className="text-slate-600">Time per Q:</span>
                    <span className="ml-2 font-medium text-slate-900">
                      {Math.floor((duration * 60) / questionCount)}s
                    </span>
                  </div>
                </>
              )}
              <div>
                <span className="text-slate-600">Questions:</span>
                <span className="ml-2 font-medium text-slate-900">{questionCount}</span>
              </div>
              {questionType === 'theory' && (
                <div className="col-span-2">
                  <span className="text-slate-600">Mode:</span>
                  <span className="ml-2 font-medium text-slate-900">Untimed Practice</span>
                </div>
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className={`rounded-xl p-3 sm:p-4 border ${
            questionType === 'objective' 
              ? 'bg-blue-50 border-blue-200' 
              : 'bg-purple-50 border-purple-200'
          }`}>
            <p className={`text-xs sm:text-sm ${
              questionType === 'objective' ? 'text-blue-800' : 'text-purple-800'
            }`}>
              {questionType === 'objective' ? (
                <>
                  <strong>CBT Mode:</strong> Answer multiple-choice questions with automatic grading and timed assessment.
                </>
              ) : (
                <>
                  <strong>Theory Mode:</strong> Write detailed essay answers. Review suggested answers after submission. No time limit.
                </>
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              onClick={onBack}
              className="flex-1 py-2.5 sm:py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Back
            </button>
            <button
              onClick={() => onStart(difficulty, duration, questionCount, questionType)}
              className="flex-1 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm text-sm sm:text-base"
            >
              Start {questionType === 'objective' ? 'Test' : 'Practice'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}