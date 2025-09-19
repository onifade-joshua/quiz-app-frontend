<<<<<<< HEAD
=======
// For UI testing (current setup)
>>>>>>> 5703b96e5bb4fca5d58bd706b232e94c545200f4
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
