import type { Question, QuizAnswer, QuizResult } from '../types'
import { mockQuestionsAPI } from './mockQuestionsAPI'
import { delay, shuffleArray } from '../utils/mockUtils'

export class MockQuizAPI {
  /**
   * Start a quiz by returning shuffled questions
   */
  async start(): Promise<Question[]> {
    await delay(800)
    
    const questions = mockQuestionsAPI.getQuestionsForQuiz()
    return shuffleArray(questions)
  }

  /**
   * Submit quiz answers and calculate results
   */
  async submit(data: { answers: QuizAnswer[]; timeElapsed: number }): Promise<QuizResult> {
    await delay(1000)
    
    const allQuestions = mockQuestionsAPI.getQuestionsForQuiz()
    let correctAnswers = 0
    
    const detailedAnswers = data.answers.map(userAnswer => {
      const question = allQuestions.find(q => q.id === userAnswer.questionId)
      
      if (!question) {
        return {
          questionId: userAnswer.questionId,
          selectedAnswer: userAnswer.selectedAnswer,
          correctAnswer: 1,
          isCorrect: false
        }
      }
      
      const isCorrect = userAnswer.selectedAnswer === question.correctAnswer
      if (isCorrect) correctAnswers++
      
      return {
        questionId: userAnswer.questionId,
        selectedAnswer: userAnswer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect
      }
    })
    
    const totalQuestions = allQuestions.length
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    
    return {
      correctAnswers,
      totalQuestions,
      timeElapsed: data.timeElapsed,
      percentage,
      answers: detailedAnswers
    }
  }
}

export const mockQuizAPI = new MockQuizAPI()
