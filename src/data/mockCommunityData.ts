import type {
  User,
  Discussion,
  StudyGroup,
  StudySession,
  CommunityStats,
} from "../types/index"

// ----------------------
// Mock Users
// ----------------------
export const mockUsers: User[] = [
  { id: "1", email: "sarah@example.com", name: "Sarah Chen", createdAt: "2024-01-01", streak: 15 },
  { id: "2", email: "mike@example.com", name: "Mike Rodriguez", createdAt: "2024-01-15", streak: 8 },
  { id: "3", email: "emma@example.com", name: "Emma Johnson", createdAt: "2024-01-20", streak: 22 },
  { id: "4", email: "alex@example.com", name: "Alex Kumar", createdAt: "2024-02-01", streak: 12 },
  { id: "5", email: "jennifer@example.com", name: "Jennifer Liu", createdAt: "2024-02-10", streak: 18 },
]

// ----------------------
// Mock Discussions
// ----------------------
export const mockDiscussions: Discussion[] = [
  {
    id: "1",
    authorId: "1",
    author: mockUsers[0],
    title: "How to approach dynamic programming problems?",
    content:
      "I'm struggling with DP problems in my algorithm practice. Any tips on recognizing patterns and building intuition?",
    category: "Algorithms",
    likes: 23,
    replies: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isHot: true,
    isPinned: false,
    tags: ["algorithms", "dynamic-programming", "interview-prep"],
  },
  {
    id: "2",
    authorId: "2",
    author: mockUsers[1],
    title: "Best resources for learning React hooks?",
    content: "Looking for comprehensive resources to master React hooks. Any recommendations?",
    category: "React",
    likes: 15,
    replies: 12,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    isHot: false,
    isPinned: false,
    tags: ["react", "hooks", "frontend"],
  },
  {
    id: "3",
    authorId: "3",
    author: mockUsers[2],
    title: "Study group for system design interviews",
    content: "Anyone interested in forming a study group for system design? Weekly practice sessions for FAANG prep.",
    category: "Career",
    likes: 31,
    replies: 6,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isHot: true,
    isPinned: true,
    tags: ["system-design", "interviews", "career"],
  },
]

// ----------------------
// Mock Study Groups
// ----------------------
export const mockStudyGroups: StudyGroup[] = [
  {
    id: "1",
    name: "Advanced JavaScript Masters",
    description: "Deep dive into ES6+, async programming, closures, and modern frameworks.",
    category: "Programming",
    memberCount: 234,
    members: ["1", "2", "3", "4"],
    createdBy: "1",
    createdAt: "2024-01-01",
    isActive: true,
    difficulty: "advanced",
    isPrivate: false,
    maxMembers: 500,
    tags: ["javascript", "es6", "async"],
  },
]

// ----------------------
// Mock Study Sessions
// ----------------------
export const mockStudySessions: StudySession[] = [
  {
    id: "1",
    title: "Graph Algorithms Deep Dive",
    description: "Explore BFS, DFS, Dijkstra, and graph traversal strategies.",
    hostId: "1",
    host: mockUsers[0],
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    duration: 90,
    participants: ["1", "2"],
    maxParticipants: 50,
    type: "practice_session",
    status: "upcoming",
  },
  {
    id: "2",
    title: "React Hooks in Practice",
    description: "Hands-on coding session with custom hooks and advanced use cases.",
    hostId: "2",
    host: mockUsers[1],
    scheduledTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    duration: 120,
    participants: ["2", "4"],
    maxParticipants: 100,
    type: "live_session",
    status: "upcoming",
  },
]

// ----------------------
// Mock Community Stats
// ----------------------
export const mockCommunityStats: CommunityStats = {
  totalMembers: mockUsers.length,
  activeMembers: 42,
  totalDiscussions: mockDiscussions.length,
  totalStudyGroups: mockStudyGroups.length,
  totalSessions: mockStudySessions.length,
  completedSessions: 5,
  trendingTopics: ["algorithms", "react", "system-design"],
}
