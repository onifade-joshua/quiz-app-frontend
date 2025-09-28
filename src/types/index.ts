export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  streak?: number
}

export interface Question {
  id: string
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  correctAnswer: number
  createdAt: string
  updatedAt: string
}

export interface CreateQuestionData {
  question: string
  option1: string
  option2: string
  option3: string
  option4: string
  correctAnswer: number
}

export interface QuizAnswer {
  questionId: string
  selectedAnswer: number
}

export interface QuizResult {
  correctAnswers: number
  totalQuestions: number
  timeElapsed: number
  percentage: number
  answers: Array<{
    questionId: string
    selectedAnswer: number
    correctAnswer: number
    isCorrect: boolean
  }>
}

export interface AuthFormData {
  email: string
  password: string
  name?: string
}
