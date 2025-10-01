import { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, ArrowLeft } from 'lucide-react'

interface QuizSetupProps {
  selectedCount: number
  onStart: (difficulty: 'mixed' | 'easy' | 'hard', duration: number, questionCount: number) => void
  onBack: () => void
}

export default function QuizSetup({ selectedCount, onStart, onBack }: QuizSetupProps) {
  const [duration, setDuration] = useState(30)
  const [questionCount, setQuestionCount] = useState(10)
  const [difficulty, setDifficulty] = useState<'mixed' | 'easy' | 'hard'>('mixed')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-sm border border-slate-100">
        <div className="text-center mb-6 sm:mb-8">
          <Target className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-3 sm:mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Configure Your CBT Test</h2>
          <p className="text-slate-600 text-sm sm:text-base">Set up your practice session based on {selectedCount} selected document{selectedCount !== 1 ? 's' : ''}</p>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {/* Difficulty Selection */}
          <div>
            <label className="block font-semibold text-slate-900 mb-2 sm:mb-3 text-sm sm:text-base">Difficulty Level</label>
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
                  <div className="font-semibold capitalize mb-0.5 sm:mb-1 text-sm sm:text-base">{diff}</div>
                  <div className="text-xs">
                    {diff === 'easy' && 'Basic questions'}
                    {diff === 'mixed' && 'All levels'}
                    {diff === 'hard' && 'Advanced'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Slider */}
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

          {/* Question Count Slider */}
          <div>
            <label className="block font-semibold text-slate-900 mb-2 sm:mb-3 text-sm sm:text-base">
              Number of Questions: <span className="text-blue-600">{questionCount}</span>
            </label>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>5 questions</span>
              <span>50 questions</span>
            </div>
          </div>

          {/* Summary Card */}
          <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Test Summary</h4>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-slate-600">Difficulty:</span>
                <span className="ml-2 font-medium capitalize text-slate-900">{difficulty}</span>
              </div>
              <div>
                <span className="text-slate-600">Duration:</span>
                <span className="ml-2 font-medium text-slate-900">{duration} min</span>
              </div>
              <div>
                <span className="text-slate-600">Questions:</span>
                <span className="ml-2 font-medium text-slate-900">{questionCount}</span>
              </div>
              <div>
                <span className="text-slate-600">Time per Q:</span>
                <span className="ml-2 font-medium text-slate-900">{Math.floor((duration * 60) / questionCount)}s</span>
              </div>
            </div>
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
              onClick={() => onStart(difficulty, duration, questionCount)}
              className="flex-1 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-sm text-sm sm:text-base"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}