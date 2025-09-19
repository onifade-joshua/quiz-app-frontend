import type { Question, CreateQuestionData } from '../types'
import { MOCK_QUESTIONS } from '../data/mockData'
import { delay, generateId } from '../utils/mockUtils'

export class MockQuestionsAPI {
  private questions: Question[] = [...MOCK_QUESTIONS]

  /**
   * Get all questions
   */
  async getAll(): Promise<Question[]> {
    await delay(800)
    return [...this.questions]
  }

  /**
   * Create a new question
   */
  async create(data: CreateQuestionData): Promise<Question> {
    await delay(800)
    
    const newQuestion: Question = {
      id: generateId(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    this.questions.push(newQuestion)
    return newQuestion
  }

  /**
   * Update an existing question
   */
  async update(id: string, data: Partial<CreateQuestionData>): Promise<Question> {
    await delay(800)
    
    const questionIndex = this.questions.findIndex(q => q.id === id)
    if (questionIndex === -1) {
      throw new Error('Question not found')
    }
    
    this.questions[questionIndex] = {
      ...this.questions[questionIndex],
      ...data,
      updatedAt: new Date().toISOString()
    }
    
    return this.questions[questionIndex]
  }

  /**
   * Delete a question
   */
  async delete(id: string): Promise<void> {
    await delay(500)
    
    const questionIndex = this.questions.findIndex(q => q.id === id)
    if (questionIndex === -1) {
      throw new Error('Question not found')
    }
    
    this.questions.splice(questionIndex, 1)
  }

  /**
   * Get questions for quiz (used internally by MockQuizAPI)
   */
  getQuestionsForQuiz(): Question[] {
    return [...this.questions]
  }
}

<<<<<<< HEAD
export const mockQuestionsAPI = new MockQuestionsAPI()
=======
// Export singleton instance
export const mockQuestionsAPI = new MockQuestionsAPI()
>>>>>>> 5703b96e5bb4fca5d58bd706b232e94c545200f4
