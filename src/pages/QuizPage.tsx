import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Navbar } from '../components/common/Navbar'
import { Button } from '../components/common/Button'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { QuizQuestion } from '../components/quiz/QuizQuestion'
import { QuizResults } from '../components/quiz/QuizResults'
import { Timer } from '../components/quiz/Timer'
import { useStore } from '../store/useStore'
import { quizAPI } from '../services/api'
import type { QuizResult } from '../types'
import toast from 'react-hot-toast'

export const QuizPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()
  const {
    currentQuiz,
    currentQuestionIndex,
    answers,
    startTime,
    isQuizActive,
    setCurrentQuiz,
    setCurrentQuestionIndex,
    setAnswer,
    resetQuiz,
    startQuiz,
    endQuiz,
    nextQuestion,
    previousQuestion
  } = useStore()

  useEffect(() => {
    if (currentQuiz.length === 0) {
      initializeQuiz()
    } else {
      setIsLoading(false)
    }
  }, [currentQuiz.length])

  const initializeQuiz = async () => {
    try {
      const questions = await quizAPI.start()
      if (questions.length === 0) {
        toast.error('No questions available. Please add some questions first.')
        navigate('/questions')
        return
      }
      setCurrentQuiz(questions)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to start quiz:', error)
      toast.error('Failed to load quiz questions')
      navigate('/questions')
    }
  }

  const handleStartQuiz = () => {
    startQuiz()
  }

  const handleAnswerSelect = (answer: number) => {
    const currentQuestion = currentQuiz[currentQuestionIndex]
    setAnswer(currentQuestion.id, answer)
  }

  const handleNext = () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      nextQuestion()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      previousQuestion()
    }
  }

  const handleSubmitQuiz = async () => {
    if (!startTime) return
    
    const unansweredQuestions = currentQuiz.filter(
      (question) => !answers.find((answer) => answer.questionId === question.id)
    )

    if (unansweredQuestions.length > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unansweredQuestions.length} unanswered question(s). Submit anyway?`
      )
      if (!confirmSubmit) return
    }

    setIsSubmitting(true)
    try {
      const timeElapsed = Math.floor((Date.now() - startTime) / 1000)
      const result = await quizAPI.submit({ answers, timeElapsed })
      setQuizResult(result)
      endQuiz()
      toast.success('Quiz submitted successfully!')
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      toast.error('Failed to submit quiz. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRetakeQuiz = () => {
    setQuizResult(null)
    resetQuiz()
    initializeQuiz()
  }

  const handleBackToQuestions = () => {
    resetQuiz()
    navigate('/questions')
  }

  const handleTimeUp = () => {
    toast("Time's up! Submitting quiz automatically.", {
      icon: "⚠️",
      style: {
        background: "#fef3c7",
        color: "#92400e",
      },
    })
    handleSubmitQuiz()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {quizResult ? (
          <QuizResults
            result={quizResult}
            onRetakeQuiz={handleRetakeQuiz}
            onBackToQuestions={handleBackToQuestions}
          />
        ) : !isQuizActive ? (
          <div className="card max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Take the Quiz?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Test your knowledge with {currentQuiz.length} questions. 
              Your timer will start once you begin.
            </p>
            <Button onClick={handleStartQuiz} size="lg">
              Start Quiz
            </Button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Quiz in Progress</h1>
              <Timer 
                startTime={startTime!} 
                isActive={isQuizActive} 
                duration={300} // 5 minutes
                onTimeUp={handleTimeUp}
              />
            </div>

            <QuizQuestion
              question={currentQuiz[currentQuestionIndex]}
              selectedAnswer={
                answers.find((a) => a.questionId === currentQuiz[currentQuestionIndex].id)
                  ?.selectedAnswer
              }
              onAnswerSelect={handleAnswerSelect}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentQuiz.length}
            />

            <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
              <Button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="secondary"
                className="flex items-center"
              >
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                Previous
              </Button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {currentQuiz.length}
                </span>
                <div className="flex space-x-1">
                  {currentQuiz.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index < currentQuestionIndex
                          ? 'bg-green-500'
                          : index === currentQuestionIndex
                          ? 'bg-blue-500'
                          : answers.find((a) => a.questionId === currentQuiz[index].id)
                          ? 'bg-yellow-500'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {currentQuestionIndex < currentQuiz.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="flex items-center"
                >
                  Next
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Quiz'
                  )}
                </Button>
              )}
            </div>

            {/* Progress indicator */}
            <div className="mt-6 max-w-4xl mx-auto">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + 1) / currentQuiz.length) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Quick navigation */}
            <div className="mt-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Navigation</h3>
                <div className="grid grid-cols-10 gap-2">
                  {currentQuiz.map((question, index) => {
                    const isAnswered = answers.find((a) => a.questionId === question.id)
                    const isCurrent = index === currentQuestionIndex
                    
                    return (
                      <button
                        key={question.id}
                        onClick={() => setCurrentQuestionIndex(index)}
                        className={`
                          w-8 h-8 rounded text-xs font-medium transition-colors
                          ${isCurrent
                            ? 'bg-blue-600 text-white'
                            : isAnswered
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }
                        `}
                      >
                        {index + 1}
                      </button>
                    )
                  })}
                </div>
                <div className="mt-3 flex items-center text-xs text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded mr-1" />
                    Current
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded mr-1" />
                    Answered
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded mr-1" />
                    Not answered
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
