import React from 'react'
import type { Question } from '../../types'
import { QuestionCard } from './QuestionCard'
import { LoadingSpinner } from '../common/LoadingSpinner'

interface QuestionsListProps {
  questions: Question[]
  onEdit: (question: Question) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h3>
        <p className="text-gray-600">Get started by adding your first question.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}