import type { User, Question } from '../types'

export const DEMO_USER: User = {
  id: '1',
  email: 'demo@example.com',
  name: 'Demo User',
  createdAt: new Date().toISOString()
}

export const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    option1: 'London',
    option2: 'Berlin',
    option3: 'Paris',
    option4: 'Madrid',
    correctAnswer: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    question: 'Which planet is known as the Red Planet?',
    option1: 'Venus',
    option2: 'Mars',
    option3: 'Jupiter',
    option4: 'Saturn',
    correctAnswer: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    question: 'What is 2 + 2?',
    option1: '3',
    option2: '4',
    option3: '5',
    option4: '6',
    correctAnswer: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    question: 'Who painted the Mona Lisa?',
    option1: 'Vincent van Gogh',
    option2: 'Pablo Picasso',
    option3: 'Leonardo da Vinci',
    option4: 'Michelangelo',
    correctAnswer: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    question: 'What is the largest ocean on Earth?',
    option1: 'Atlantic Ocean',
    option2: 'Indian Ocean',
    option3: 'Arctic Ocean',
    option4: 'Pacific Ocean',
    correctAnswer: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
