import type { Discussion, StudyGroup, StudySession, CommunityStats } from "../store/useCommunityStore"

export const communityAPI = {
  async getDiscussions(filters?: Record<string, any>): Promise<Discussion[]> {
    console.log("Fetching discussions with filters:", filters)
    return [
      {
        id: "1",
        title: "How to stay productive while studying?",
        content: "Share your best tips!",
        category: "Productivity",
        tags: ["focus", "time-management"],
        likes: 12,
        replies: 5,
        createdAt: new Date().toISOString(),
        author: { id: "u1", name: "Jane Doe" },
      },
    ]
  },

  async getStudyGroups(): Promise<StudyGroup[]> {
    return [
      {
        id: "g1",
        name: "Frontend Devs",
        description: "Learn React, Next.js, and more",
        tags: ["react", "nextjs"],
        memberCount: 150,
        category: "Web Development",
        difficulty: "intermediate",
      },
    ]
  },

  async getStudySessions(_params?: { status: string }): Promise<StudySession[]> {
    // `_params` is unused for now (placeholder for API filtering)
    return [
      {
        id: "s1",
        topic: "React Hooks Deep Dive",
        description: "Hands-on session",
        startTime: new Date().toISOString(),
        host: { id: "u2", name: "John Smith" },
        tags: ["react", "hooks"],
      },
    ]
  },

  async getCommunityStats(): Promise<CommunityStats> {
    return {
      activeMembers: 1200,
      totalStudyGroups: 25,
      totalDiscussions: 340,
    }
  },

  async getTrendingTopics(limit: number): Promise<string[]> {
    return ["React", "Next.js", "TypeScript", "Zustand", "Tailwind"].slice(0, limit)
  },

  async likeDiscussion(id: string): Promise<void> {
    console.log("Liked discussion", id)
  },
  async unlikeDiscussion(id: string): Promise<void> {
    console.log("Unliked discussion", id)
  },
  async joinStudyGroup(id: string): Promise<void> {
    console.log("Joined group", id)
  },
  async leaveStudyGroup(id: string): Promise<void> {
    console.log("Left group", id)
  },
  async joinStudySession(id: string): Promise<void> {
    console.log("Joined session", id)
  },
  async leaveStudySession(id: string): Promise<void> {
    console.log("Left session", id)
  },
}
