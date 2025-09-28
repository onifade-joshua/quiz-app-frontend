import React, { useEffect, useState } from "react"
import { useCommunityStore, type Discussion, type StudyGroup, type StudySession } from "../store/useCommunityStore"
import { communityAPI } from "../services/communityAPI"
import { motion } from "framer-motion"
import { Search, Heart, Users, BookOpen, TrendingUp, PlusCircle } from "lucide-react"

const StudyCommunity: React.FC = () => {
  const {
    discussions,
    studyGroups,
    studySessions,
    communityStats,
    trendingTopics,
    isDiscussionLiked,
    isGroupJoined,
    isSessionJoined,
    toggleLikeDiscussion,
    toggleJoinGroup,
    toggleJoinSession,
    setDiscussions,
    setStudyGroups,
    setStudySessions,
    setCommunityStats,
    setTrendingTopics,
  } = useCommunityStore()

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discussionsData, groupsData, sessionsData, statsData, trendingData] =
          await Promise.all([
            communityAPI.getDiscussions(),
            communityAPI.getStudyGroups(),
            communityAPI.getStudySessions({ status: "upcoming" }),
            communityAPI.getCommunityStats(),
            communityAPI.getTrendingTopics(5),
          ])

        setDiscussions(discussionsData)
        setStudyGroups(groupsData)
        setStudySessions(sessionsData)
        setCommunityStats(statsData)
        setTrendingTopics(trendingData)
      } catch (error) {
        console.error("Error loading community data:", error)
      }
    }

    fetchData()
  }, [setDiscussions, setStudyGroups, setStudySessions, setCommunityStats, setTrendingTopics])

  // Filter discussions by search query
  const filteredDiscussions = discussions.filter((discussion: Discussion) =>
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    discussion.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Study Community</h1>
          <p className="text-gray-600">Connect, learn, and grow with peers</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search discussions..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      {communityStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <Users className="h-5 w-5 text-indigo-500 mb-2" />
            <p className="text-sm text-gray-600">Active Members</p>
            <p className="text-xl font-bold">{communityStats.activeMembers}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <BookOpen className="h-5 w-5 text-indigo-500 mb-2" />
            <p className="text-sm text-gray-600">Study Groups</p>
            <p className="text-xl font-bold">{communityStats.totalStudyGroups}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <TrendingUp className="h-5 w-5 text-indigo-500 mb-2" />
            <p className="text-sm text-gray-600">Discussions</p>
            <p className="text-xl font-bold">{communityStats.totalDiscussions}</p>
          </div>
        </div>
      )}

      {/* Trending Topics */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Trending Topics</h2>
        <div className="flex flex-wrap gap-2">
          {trendingTopics.map((topic: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
            >
              #{topic}
            </span>
          ))}
        </div>
      </div>

      {/* Discussions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Latest Discussions</h2>
        <div className="grid gap-4">
          {filteredDiscussions.map((discussion: Discussion) => (
            <motion.div
              key={discussion.id}
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-white rounded-lg shadow-sm border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">{discussion.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{discussion.content}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded">{discussion.category}</span>
                    {discussion.tags?.map((tag: string, index: number) => (
                      <span key={index} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => toggleLikeDiscussion(discussion.id)}
                  className={`flex items-center gap-1 ${
                    isDiscussionLiked(discussion.id) ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">{discussion.likes}</span>
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                <span>{discussion.replies} replies</span>
                <span>•</span>
                <span>{discussion.author.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Study Groups */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Study Groups</h2>
          <button className="flex items-center gap-1 text-indigo-600 text-sm font-medium">
            <PlusCircle className="h-4 w-4" />
            Create Group
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {studyGroups.map((group: StudyGroup) => (
            <motion.div
              key={group.id}
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-white rounded-lg shadow-sm border"
            >
              <h3 className="font-semibold text-gray-900">{group.name}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{group.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {group.tags?.map((tag: string, index: number) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex justify-between items-center text-sm">
                <span className="text-gray-500">{group.memberCount} members</span>
                <button
                  onClick={() => toggleJoinGroup(group.id)}
                  className={`px-3 py-1 rounded ${
                    isGroupJoined(group.id)
                      ? "bg-gray-100 text-gray-600"
                      : "bg-indigo-500 text-white"
                  }`}
                >
                  {isGroupJoined(group.id) ? "Joined" : "Join"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Study Sessions */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Upcoming Study Sessions</h2>
          <button className="flex items-center gap-1 text-indigo-600 text-sm font-medium">
            <PlusCircle className="h-4 w-4" />
            Create Session
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {studySessions.map((session: StudySession) => (
            <motion.div
              key={session.id}
              whileHover={{ scale: 1.01 }}
              className="p-4 bg-white rounded-lg shadow-sm border"
            >
              <h3 className="font-semibold text-gray-900">{session.topic}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{session.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {session.tags?.map((tag: string, index: number) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex justify-between items-center text-sm">
                <span className="text-gray-500">
                  {new Date(session.startTime).toLocaleString()}
                </span>
                <button
                  onClick={() => toggleJoinSession(session.id)}
                  className={`px-3 py-1 rounded ${
                    isSessionJoined(session.id)
                      ? "bg-gray-100 text-gray-600"
                      : "bg-indigo-500 text-white"
                  }`}
                >
                  {isSessionJoined(session.id) ? "Joined" : "Join"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudyCommunity
