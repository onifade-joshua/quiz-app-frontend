import { mockAuthAPI } from './mockAuthAPI'
import { mockQuestionsAPI } from './mockQuestionsAPI'
import { mockQuizAPI } from './mockQuizAPI'

// Mock axios instance for compatibility
export const api = {
  interceptors: {
    response: {
      use: () => {}
    }
  }
}

export const authAPI = mockAuthAPI
export const questionsAPI = mockQuestionsAPI
export const quizAPI = mockQuizAPI
