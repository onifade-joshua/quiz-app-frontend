import { create } from "zustand"
import type { CBTSession, CBTAnswer, CBTResult } from "../types"
import { calculateResults, generateQuestions } from "../utils/cbtHelpers"

interface CBTState {
  session: CBTSession | null
  answers: Record<string, CBTAnswer>
  timeRemaining: number
  result: CBTResult | null
  loading: boolean
  error: string | null

  // actions
  startSession: (title: string, documentIds: string[], difficulty: "easy" | "hard" | "mixed", totalQuestions: number, timeLimit: number, userId: string) => void
  answerQuestion: (questionId: string, answer: "A" | "B" | "C" | "D") => void
  flagQuestion: (questionId: string) => void
  updateTime: (secondsPassed: number) => void
  submitSession: (auto?: boolean) => void
  resetSession: () => void
}

export const useCBTStore = create<CBTState>((set, get) => ({
  session: null,
  answers: {},
  timeRemaining: 0,
  result: null,
  loading: false,
  error: null,

  /**
   * Start a new session
   */
  startSession: (title, documentIds, difficulty, totalQuestions, timeLimit, userId) => {
    const questions = generateQuestions(documentIds, difficulty, totalQuestions)

    const session: CBTSession = {
      id: `session-${Date.now()}`,
      title,
      documentIds,
      questions,
      difficulty,
      timeLimit,
      totalQuestions,
      status: "in_progress",
      startedAt: new Date().toISOString(),
      userId
    }

    const initialAnswers: Record<string, CBTAnswer> = {}
    questions.forEach((q) => {
      initialAnswers[q.id] = {
        questionId: q.id,
        selectedAnswer: null,
        timeSpent: 0,
        answered: false,
        flagged: false
      }
    })

    set({
      session,
      answers: initialAnswers,
      timeRemaining: timeLimit * 60,
      result: null,
      error: null
    })
  },

  /**
   * Answer a question
   */
  answerQuestion: (questionId, answer) => {
    const { answers } = get()
    const prev = answers[questionId]
    if (!prev) return

    set({
      answers: {
        ...answers,
        [questionId]: {
          ...prev,
          selectedAnswer: answer,
          answered: true
        }
      }
    })
  },

  /**
   * Toggle flagging of a question
   */
  flagQuestion: (questionId) => {
    const { answers } = get()
    const prev = answers[questionId]
    if (!prev) return

    set({
      answers: {
        ...answers,
        [questionId]: {
          ...prev,
          flagged: !prev.flagged
        }
      }
    })
  },

  /**
   * Decrease timer (call in interval)
   */
  updateTime: (secondsPassed) => {
    const { timeRemaining } = get()
    set({ timeRemaining: Math.max(0, timeRemaining - secondsPassed) })
  },

  /**
   * Submit the session & calculate results
   */
  submitSession: (auto = false) => {
    const { session, answers, timeRemaining } = get()
    if (!session) return

    const result = calculateResults(session, answers, timeRemaining, auto)

    set({
      session: { ...session, status: "completed", completedAt: new Date().toISOString() },
      result
    })
  },

  /**
   * Reset everything (clear session)
   */
  resetSession: () => {
    set({
      session: null,
      answers: {},
      timeRemaining: 0,
      result: null,
      error: null
    })
  }
}))
