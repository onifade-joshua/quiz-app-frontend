import React, { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Navbar } from '../components/common/Navbar'
import { Button } from '../components/common/Button'
import { QuestionForm } from '../components/questions/QuestionForm'
import { QuestionsList } from '../components/questions/QuestionsList'
import { useStore } from '../store/useStore'
import { questionsAPI } from '../services/api'
import type { Question, CreateQuestionData } from '../types'
import toast from 'react-hot-toast'

export const QuestionsPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [isFormLoading, setIsFormLoading] = useState(false)
  
  const {
    questions,
    setQuestions,
    setQuestionsLoading,
    questionsLoading, // Updated property name
    addQuestion,
    updateQuestion,
    deleteQuestion
  } = useStore()

  useEffect(() => {
    fetchQuestions()
  }, [])

  const fetchQuestions = async () => {
  setQuestionsLoading(true)
  try {
    const data = await questionsAPI.getAll()
    setQuestions(Array.isArray(data) ? data : [])
  } catch (error) {
    console.error('Failed to fetch questions:', error)
    setQuestions([]) // fallback to empty array
    toast.error('Failed to load questions')
  } finally {
    setQuestionsLoading(false)
  }
}

  const handleCreateQuestion = async (data: CreateQuestionData) => {
    setIsFormLoading(true)
    try {
      const newQuestion = await questionsAPI.create(data)
      addQuestion(newQuestion)
      setShowForm(false)
      toast.success('Question created successfully!')
    } catch (error) {
      console.error('Failed to create question:', error)
      toast.error('Failed to create question')
    } finally {
      setIsFormLoading(false)
    }
  }

  const handleUpdateQuestion = async (data: CreateQuestionData) => {
    if (!editingQuestion) return
    
    setIsFormLoading(true)
    try {
      const updatedQuestion = await questionsAPI.update(editingQuestion.id, data)
      updateQuestion(editingQuestion.id, updatedQuestion)
      setEditingQuestion(null)
      setShowForm(false)
      toast.success('Question updated successfully!')
    } catch (error) {
      console.error('Failed to update question:', error)
      toast.error('Failed to update question')
    } finally {
      setIsFormLoading(false)
    }
  }

  const handleDeleteQuestion = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return
    
    try {
      await questionsAPI.delete(id)
      deleteQuestion(id)
      toast.success('Question deleted successfully!')
    } catch (error) {
      console.error('Failed to delete question:', error)
      toast.error('Failed to delete question')
    }
  }

  const handleEdit = (question: Question) => {
    setEditingQuestion(question)
    setShowForm(true)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingQuestion(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Questions</h1>
            <p className="text-gray-600 mt-1">
              Manage your quiz questions ({questions.length} total)
            </p>
          </div>
          
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="flex items-center">
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Question
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8">
            <QuestionForm
              question={editingQuestion || undefined}
              onSubmit={editingQuestion ? handleUpdateQuestion : handleCreateQuestion}
              onCancel={handleCancelForm}
              isLoading={isFormLoading}
            />
          </div>
        )}

        <QuestionsList
          questions={questions}
          onEdit={handleEdit}
          onDelete={handleDeleteQuestion}
          isLoading={questionsLoading} // Updated property name
        />
      </div>
    </div>
  )
}
