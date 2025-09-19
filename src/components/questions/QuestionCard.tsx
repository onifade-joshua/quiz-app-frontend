import React from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { Question } from '../../types'
import { Button } from '../common/Button'

interface QuestionCardProps {
  question: Question
  onEdit: (question: Question) => void
  onDelete: (id: string) => void
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onEdit, onDelete }) => {
  const getCorrectAnswerText = (correctAnswer: number) => {
    switch (correctAnswer) {
      case 1: return question.option1
      case 2: return question.option2
      case 3: return question.option3
      case 4: return question.option4
      default: return 'Unknown'
    }
  }

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex-1 mr-4">
          {question.question}
        </h3>
        <div className="flex space-x-2">
          <Button
            onClick={() => onEdit(question)}
            variant="secondary"
            size="sm"
            className="p-2"
          >
            <PencilIcon className="w-4 h-4" />
          </Button>
          <Button
            onClick={() => onDelete(question.id)}
            variant="danger"
            size="sm"
            className="p-2"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Options list */}
      <div className="space-y-2 mb-4">
        {[1, 2, 3, 4].map((num) => (
          <div key={num} className="flex items-center">
            <span
              className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium mr-3 ${
                num === question.correctAnswer
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {num}
            </span>
            <span
              className={
                num === question.correctAnswer
                  ? 'font-medium text-green-800'
                  : 'text-gray-700'
              }
            >
              {question[`option${num}` as keyof Question]}
            </span>
          </div>
        ))}
      </div>
      
      {/* Footer with styled correct answer text */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Correct Answer:{' '}
          <span className="font-semibold text-green-700">
            {getCorrectAnswerText(question.correctAnswer)}
          </span>
        </span>
        <span>
          {new Date(question.createdAt || '').toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
