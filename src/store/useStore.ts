import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Question, QuizAnswer } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

interface QuestionsState {
  questions: Question[]
  questionsLoading: boolean 
  setQuestions: (questions: Question[]) => void
  setQuestionsLoading: (loading: boolean) => void
  addQuestion: (question: Question) => void
  updateQuestion: (id: string, question: Partial<Question>) => void
  deleteQuestion: (id: string) => void
}

interface QuizState {
  currentQuiz: Question[]
  currentQuestionIndex: number
  answers: QuizAnswer[]
  startTime: number | null
  isQuizActive: boolean
  setCurrentQuiz: (questions: Question[]) => void
  setCurrentQuestionIndex: (index: number) => void
  setAnswer: (questionId: string, answer: number) => void
  resetQuiz: () => void
  startQuiz: () => void
  endQuiz: () => void
  nextQuestion: () => void
  previousQuestion: () => void
}

type Store = AuthState & QuestionsState & QuizState

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Auth state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => {
        console.log('Store - setUser called with:', user)
        set({ user, isAuthenticated: !!user })
      },
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => {
        console.log('Store - logout called')
        set({ user: null, isAuthenticated: false })
      },

      // Questions state
      questions: [],
      questionsLoading: false, // Separate loading state for questions
      setQuestions: (questions) => set({ questions }),
      setQuestionsLoading: (questionsLoading) => set({ questionsLoading }),
      addQuestion: (question) => 
        set((state) => ({ questions: [...state.questions, question] })),
      updateQuestion: (id, updatedQuestion) =>
        set((state) => ({
          questions: state.questions.map((q) =>
            q.id === id ? { ...q, ...updatedQuestion } : q
          ),
        })),
      deleteQuestion: (id) =>
        set((state) => ({
          questions: state.questions.filter((q) => q.id !== id),
        })),

      // Quiz state
      currentQuiz: [],
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      isQuizActive: false,
      setCurrentQuiz: (questions) => set({ currentQuiz: questions, currentQuestionIndex: 0 }),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      setAnswer: (questionId, answer) => {
        const state = get()
        const existingAnswerIndex = state.answers.findIndex((a) => a.questionId === questionId)
        
        let newAnswers: QuizAnswer[]
        if (existingAnswerIndex >= 0) {
          newAnswers = [...state.answers]
          newAnswers[existingAnswerIndex] = { questionId, selectedAnswer: answer }
        } else {
          newAnswers = [...state.answers, { questionId, selectedAnswer: answer }]
        }
        
        set({ answers: newAnswers })
      },
      resetQuiz: () => set({
        currentQuiz: [],
        currentQuestionIndex: 0,
        answers: [],
        startTime: null,
        isQuizActive: false,
      }),
      startQuiz: () => set({ startTime: Date.now(), isQuizActive: true }),
      endQuiz: () => set({ isQuizActive: false }),
      nextQuestion: () => {
        const state = get()
        if (state.currentQuestionIndex < state.currentQuiz.length - 1) {
          set({ currentQuestionIndex: state.currentQuestionIndex + 1 })
        }
      },
      previousQuestion: () => {
        const state = get()
        if (state.currentQuestionIndex > 0) {
          set({ currentQuestionIndex: state.currentQuestionIndex - 1 })
        }
      },
    }),
    {
      name: 'quiz-app-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
