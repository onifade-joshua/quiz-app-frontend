import { create } from 'zustand'

export interface Author {
  id: string
  name: string
}

export interface Discussion {
  id: string
  title: string
  content: string
  category: string
  tags?: string[]
  likes: number
  replies: number
  createdAt: string
  isHot?: boolean
  isPinned?: boolean
  author: Author
}

export interface StudyGroup {
  id: string
  name: string
  description: string
  tags?: string[]
  memberCount: number
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface StudySession {
  id: string
  topic: string
  description: string
  startTime: string
  host: Author
  tags?: string[]
}

export interface CommunityStats {
  activeMembers: number
  totalStudyGroups: number
  totalDiscussions: number
}

interface CommunityState {
  discussions: Discussion[]
  studyGroups: StudyGroup[]
  studySessions: StudySession[]
  communityStats: CommunityStats | null
  trendingTopics: string[]
  likedDiscussions: Set<string>
  joinedGroups: Set<string>
  joinedSessions: Set<string>
  loading: Record<string, boolean>
  error: string | null
  searchFilters: Record<string, any>

  // setters
  setDiscussions: (d: Discussion[]) => void
  setStudyGroups: (g: StudyGroup[]) => void
  setStudySessions: (s: StudySession[]) => void
  setCommunityStats: (stats: CommunityStats) => void
  setTrendingTopics: (topics: string[]) => void
  toggleLikeDiscussion: (id: string) => void
  toggleJoinGroup: (id: string) => void
  toggleJoinSession: (id: string) => void
  setLoading: (key: string, value: boolean) => void
  setError: (err: string | null) => void

  // helpers
  isDiscussionLiked: (id: string) => boolean
  isGroupJoined: (id: string) => boolean
  isSessionJoined: (id: string) => boolean
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  discussions: [],
  studyGroups: [],
  studySessions: [],
  communityStats: null,
  trendingTopics: [],
  likedDiscussions: new Set(),
  joinedGroups: new Set(),
  joinedSessions: new Set(),
  loading: {},
  error: null,
  searchFilters: {},

  setDiscussions: (discussions) => set({ discussions }),
  setStudyGroups: (studyGroups) => set({ studyGroups }),
  setStudySessions: (studySessions) => set({ studySessions }),
  setCommunityStats: (stats) => set({ communityStats: stats }),
  setTrendingTopics: (topics) => set({ trendingTopics: topics }),

  toggleLikeDiscussion: (id) =>
    set((state) => {
      const newSet = new Set(state.likedDiscussions)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return { likedDiscussions: newSet }
    }),

  toggleJoinGroup: (id) =>
    set((state) => {
      const newSet = new Set(state.joinedGroups)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return { joinedGroups: newSet }
    }),

  toggleJoinSession: (id) =>
    set((state) => {
      const newSet = new Set(state.joinedSessions)
      newSet.has(id) ? newSet.delete(id) : newSet.add(id)
      return { joinedSessions: newSet }
    }),

  setLoading: (key, value) =>
    set((state) => ({ loading: { ...state.loading, [key]: value } })),

  setError: (error) => set({ error }),

  isDiscussionLiked: (id) => get().likedDiscussions.has(id),
  isGroupJoined: (id) => get().joinedGroups.has(id),
  isSessionJoined: (id) => get().joinedSessions.has(id),
}))
