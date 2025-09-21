import React from "react"
import { motion } from "framer-motion"
import { useStore } from "../../store/useStore"

export const Dashboard: React.FC = () => {
  const { user, questions, answers } = useStore()

  const totalQuizzes = questions.length
  const completed = answers.length > 0 ? 1 : 0 // simplistic for demo
  const pending = totalQuizzes - completed

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-6">📊 Dashboard</h1>
      <p className="text-gray-600 mb-4">
        Welcome back, <span className="font-semibold">{user?.name ?? "Guest"}</span>
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white shadow rounded-2xl p-4 border">
          <h2 className="text-lg font-semibold text-gray-700">Total Quizzes</h2>
          <p className="mt-2 text-2xl font-bold text-primary-600">{totalQuizzes}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 border">
          <h2 className="text-lg font-semibold text-gray-700">Completed</h2>
          <p className="mt-2 text-2xl font-bold text-green-600">{completed}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 border">
          <h2 className="text-lg font-semibold text-gray-700">Pending</h2>
          <p className="mt-2 text-2xl font-bold text-red-600">{pending}</p>
        </div>
      </div>
    </motion.div>
  )
}
