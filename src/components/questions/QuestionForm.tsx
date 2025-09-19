import React, { useState, useEffect } from 'react'
import type { Question, CreateQuestionData } from '../../types'
import { Input } from '../common/Input'
import { Button } from '../common/Button'

interface QuestionFormProps {
  question?: Question
  onSubmit: (data: CreateQuestionData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onSubmit,
  onCancel,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<CreateQuestionData>({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: 1
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (question) {
      setFormData({
        question: question.question,
        option1: question.option1,
        option2: question.option2,
        option3: question.option3,
        option4: question.option4,
        correctAnswer: question.correctAnswer
      })
    }
  }, [question])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required'
    } else if (formData.question.trim().length < 5) {
      newErrors.question = 'Question must be at least 5 characters'
    }

    if (!formData.option1.trim()) newErrors.option1 = 'Option 1 is required'
    if (!formData.option2.trim()) newErrors.option2 = 'Option 2 is required'
    if (!formData.option3.trim()) newErrors.option3 = 'Option 3 is required'
    if (!formData.option4.trim()) newErrors.option4 = 'Option 4 is required'

    if (formData.correctAnswer < 1 || formData.correctAnswer > 4) {
      newErrors.correctAnswer = 'Please select the correct answer'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'correctAnswer' ? parseInt(value) : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">
        {question ? 'Edit Question' : 'Add New Question'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
            Question
          </label>
          <textarea
            id="question"
            name="question"
            value={formData.question}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.question ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter your question here..."
          />
          {errors.question && (
            <p className="mt-1 text-sm text-red-600">{errors.question}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Option 1"
            name="option1"
            value={formData.option1}
            onChange={handleChange}
            error={errors.option1}
            placeholder="Enter option 1"
          />
          <Input
            label="Option 2"
            name="option2"
            value={formData.option2}
            onChange={handleChange}
            error={errors.option2}
            placeholder="Enter option 2"
          />
          <Input
            label="Option 3"
            name="option3"
            value={formData.option3}
            onChange={handleChange}
            error={errors.option3}
            placeholder="Enter option 3"
          />
          <Input
            label="Option 4"
            name="option4"
            value={formData.option4}
            onChange={handleChange}
            error={errors.option4}
            placeholder="Enter option 4"
          />
        </div>

        <div>
          <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700 mb-1">
            Correct Answer
          </label>
          <select
            id="correctAnswer"
            name="correctAnswer"
            value={formData.correctAnswer}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
              errors.correctAnswer ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </select>
          {errors.correctAnswer && (
            <p className="mt-1 text-sm text-red-600">{errors.correctAnswer}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {question ? 'Update Question' : 'Add Question'}
          </Button>
        </div>
      </form>
    </div>
  )
}