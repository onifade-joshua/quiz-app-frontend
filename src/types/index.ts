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
// Community Profile
// ----------------------
export interface CommunityProfile {
  userId: string
  joinedGroups: string[]
  likedDiscussions: string[]
  participantSessions: string[]
  totalPosts: number
  reputation: number
  badges: string[]
  bio?: string
  expertise: string[]
  isOnline: boolean
  lastActive: string
}

// ----------------------
// Discussions
// ----------------------
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
  isHot?: boolean
  isPinned?: boolean
  tags: string[]
}

export interface Reply {
  id: string
  discussionId: string
  authorId: string
  author: User
  content: string
  likes: number
  createdAt: string
  parentReplyId?: string
}

// ----------------------
// Study Groups
// ----------------------
export interface StudyGroup {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  members: string[]
  createdBy: string
  createdAt: string
  isActive: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isPrivate: boolean
  maxMembers?: number
  tags: string[]
}

// ----------------------
// Study Sessions
// ----------------------
export interface StudySession {
  id: string
  title: string
  description: string
  hostId: string
  host: User
  scheduledTime: string
  duration: number
  participants: string[]
  maxParticipants: number
  type: 'live_session' | 'practice_session' | 'mock_interview' | 'quiz_battle'
  status: 'upcoming' | 'live' | 'completed' | 'cancelled'
  relatedQuestions?: string[]
  studyGroupId?: string
  meetingLink?: string
  requirements?: string[]
}

// ----------------------
// Community Stats
// ----------------------
export interface CommunityStats {
  totalMembers: number
  activeMembers: number
  totalDiscussions: number
  totalStudyGroups: number
  totalSessions: number
  completedSessions: number
  trendingTopics: string[]
}

// ----------------------
// Community Activity Feed
// ----------------------
export interface CommunityActivity {
  id: string
  type:
    | 'new_discussion'
    | 'new_reply'
    | 'session_started'
    | 'session_completed'
    | 'group_joined'
    | 'group_created'
    | 'achievement_earned'
  userId: string
  user: User
  entityId: string
  entityType: 'discussion' | 'study_session' | 'study_group' | 'quiz' | 'achievement'
  createdAt: string
  metadata?: {
    title?: string
    category?: string
    score?: number
    [key: string]: any
  }
}

// ----------------------
// Creation DTOs
// ----------------------
export interface CreateDiscussionData {
  title: string
  content: string
  category: string
  tags: string[]
}

export interface CreateStudyGroupData {
  name: string
  description: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isPrivate: boolean
  maxMembers?: number
  tags: string[]
}

export interface CreateStudySessionData {
  title: string
  description: string
  scheduledTime: string
  duration: number
  maxParticipants: number
  type: 'live_session' | 'practice_session' | 'mock_interview' | 'quiz_battle'
  studyGroupId?: string
  relatedQuestionIds?: string[]
  requirements?: string[]
}

export interface CreateReplyData {
  discussionId: string
  content: string
  parentReplyId?: string
}

// ----------------------
// Search & Filtering
// ----------------------
export interface CommunitySearchFilters {
  query?: string
  category?: string
  tags?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  dateRange?: { start: string; end: string }
  sortBy?: 'newest' | 'oldest' | 'popular' | 'trending'
}