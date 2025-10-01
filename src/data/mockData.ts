import type { Question, CBTSession, User, ImportedDocument } from "../types"


export const DEMO_USER: User = {
  id: "1",
  email: "demo@example.com",
  name: "Demo User",
  createdAt: new Date().toISOString(),
  streak: 5
}
// Sample Users
export const mockUsers: User[] = [
  {
    id: "u1",
    email: "john@example.com",
    name: "John Doe",
    createdAt: new Date().toISOString(),
    streak: 5,
  },
  {
    id: "u2",
    email: "jane@example.com",
    name: "Jane Smith",
    createdAt: new Date().toISOString(),
    streak: 3,
  },
]

// Sample Documents
export const mockDocuments: ImportedDocument[] = [
  {
    id: "d1",
    title: "Introduction to Physics",
    type: "pdf",
    subject: "Physics",
    uploadedAt: new Date().toISOString(),
    processed: true,
    tags: ["motion", "force"],
  },
  {
    id: "d2",
    title: "Organic Chemistry Basics",
    type: "docx",
    subject: "Chemistry",
    uploadedAt: new Date().toISOString(),
    processed: true,
    tags: ["carbon", "bonds"],
  },
]

// Sample Questions
export const mockQuestions: Question[] = [
  {
    id: "q1",
    question: "What is 2 + 2?",
    options: { A: "3", B: "4", C: "5", D: "6" },
    correctAnswer: "B", // ✅ now string
    difficulty: "easy",
    subject: "Mathematics",
    explanation: "2 + 2 equals 4.",
  },
  {
    id: "q2",
    question: "What is the capital of France?",
    options: { A: "Paris", B: "London", C: "Berlin", D: "Rome" },
    correctAnswer: "A", // ✅ now string
    difficulty: "easy",
    subject: "Geography",
    explanation: "The capital of France is Paris.",
  },
  {
    id: "q3",
    question: "Which gas do plants absorb for photosynthesis?",
    options: { A: "Oxygen", B: "Carbon Dioxide", C: "Nitrogen", D: "Hydrogen" },
    correctAnswer: "B", // ✅ now string
    difficulty: "medium",
    subject: "Biology",
    explanation: "Plants absorb carbon dioxide during photosynthesis.",
  },
]

// Sample CBT Session
export const mockSession: CBTSession = {
  id: "s1",
  title: "Math & Science Practice Test",
  documentIds: ["d1", "d2"],
  questions: mockQuestions,
  difficulty: "mixed",
  timeLimit: 30,
  totalQuestions: mockQuestions.length,
  status: "not_started",
  userId: "u1", // ✅ updated: matches index.ts (no hostId)
}
