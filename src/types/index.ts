// src/types/index.ts

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
  streak?: number
}

// Auth form DTO
export interface AuthFormData {
  email: string
  password: string
  name?: string
}

// Imported documents
export interface ImportedDocument {
  id: string
  title: string
  type: "pdf" | "docx" | "txt" | "image" | "screenshot" | "audio"
  content?: string
  imageUrl?: string
  audioUrl?: string
  textExplanation?: string
  audioExplanation?: string
  subject: string
  uploadedAt: string
  processed: boolean
  tags?: string[]
  rawFile?: File
}

// --- Generic Question (CBT) ---
export interface Question {
  id: string
  question: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswer: "A" | "B" | "C" | "D"
  difficulty: "easy" | "medium" | "hard"
  subject: string
  explanation?: string
  audioExplanation?: string
  points?: number
  timeAllotted?: number // in seconds
}

// CreateQuestionData used by API client if you post questions
export interface CreateQuestionData {
  question: string
  options: { A: string; B: string; C: string; D: string }
  correctAnswer: "A" | "B" | "C" | "D"
  difficulty?: "easy" | "medium" | "hard"
  subject?: string
  explanation?: string
  audioExplanation?: string
  points?: number
  timeAllotted?: number
}

// QuizAnswer used in store older code + compatibility
export interface QuizAnswer {
  questionId: string
  selectedAnswer: number | "A" | "B" | "C" | "D"
}

// ----------------------
// CBT-specific types
// ----------------------
export interface CBTSession {
  id: string
  title: string
  documentIds: string[]
  questions: Question[] | TheoryQuestion[]  // ✅ UPDATED: Can be either type
  difficulty: "easy" | "hard" | "mixed"
  timeLimit: number // in minutes
  totalQuestions: number
  status: "not_started" | "in_progress" | "completed" | "auto_submitted"
  startedAt?: string
  completedAt?: string
  userId: string
  questionType?: 'objective' | 'theory'  // ✅ NEW: Track question type
}

// ==================== CBT Answer ====================
export interface CBTAnswer {
  questionId: string
  selectedAnswer: "A" | "B" | "C" | "D" | null
  timeSpent: number // in seconds
  answered: boolean
  flagged: boolean
}

// ==================== CBT Result Answer ====================
export interface CBTResultAnswer {
  questionId: string
  question: Question
  userAnswer: "A" | "B" | "C" | "D" | null
  correctAnswer: "A" | "B" | "C" | "D"
  isCorrect: boolean
  explanation?: string
  audioExplanation?: string
  timeSpent: number
}

// ==================== CBT Result ====================
export interface CBTResult {
  sessionId: string
  userId: string
  answers: CBTResultAnswer[]
  score: number
  percentage: number
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  unanswered: number
  timeSpent: number
  completedAt: string
  autoSubmitted: boolean
}

// ==================== THEORY QUESTION TYPES (NEW) ====================

// Theory Question - for essay-style questions
export interface TheoryQuestion {
  id: string
  question: string
  suggestedAnswer: string
  points: number
  topic?: string
  documentId?: string
  difficulty?: "easy" | "medium" | "hard"
}

// Theory Result - for reviewing theory answers
export interface TheoryResult {
  questionId: string
  question: string
  userAnswer: string
  suggestedAnswer: string
  points: number
  topic?: string
}

// -----------------------------------
// Community / Discussion Types
// -----------------------------------

export interface Discussion {
  id: string
  authorId: string
  author: User
  title: string
  content: string
  category: string
  likes: number
  replies: number
  createdAt: string
  updatedAt: string
  isHot: boolean
  isPinned: boolean
  tags?: string[]
}

export interface StudyGroup {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  members: string[] // user IDs
  createdBy: string
  createdAt: string
  isActive: boolean
  difficulty: "beginner" | "intermediate" | "advanced"
  isPrivate: boolean
  maxMembers?: number
  tags?: string[]
}

export interface StudySession {
  id: string
  title: string
  description: string
  hostId: string
  host: User
  scheduledTime: string
  duration: number // in minutes
  participants: string[] // user IDs
  maxParticipants: number
  type: "practice_session" | "live_session"
  status: "upcoming" | "ongoing" | "completed"
}

export interface CommunityStats {
  totalMembers: number
  activeMembers: number
  totalDiscussions: number
  totalStudyGroups: number
  totalSessions: number
  completedSessions: number
  trendingTopics: string[]
}