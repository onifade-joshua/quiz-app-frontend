import React from "react"
import { motion } from "framer-motion"
import { useStore } from "../../store/useStore"

export const Results: React.FC = () => {
  const { answers, currentQuiz } = useStore()

  const score = Math.round(
    (answers.length / (currentQuiz.length || 1)) * 100
  )

  return (
    <motion.div
      className="p-6 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🏆 Results</h1>

      {currentQuiz.length > 0 ? (
        <div className="bg-white shadow rounded-2xl p-6 border">
          <h2 className="text-xl font-semibold text-gray-700">Latest Quiz</h2>
          <p className="text-gray-600 mt-2">
            Score: <span className="font-bold text-primary-600">{score}%</span>
          </p>
          <p className="text-gray-600">
            Questions Answered: {answers.length} / {currentQuiz.length}
          </p>
        </div>
      ) : (
        <p className="text-gray-600">No quiz results available yet.</p>
      )}
    </motion.div>
  )
}
