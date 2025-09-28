import { useState } from 'react'
import {
  UserCircleIcon,
  PencilIcon,
  TrophyIcon,
  CalendarDaysIcon,
  ChartBarIcon,
//   FireIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
//   CogIcon,
//   EnvelopeIcon,
  MapPinIcon,
  LinkIcon,
  BookOpenIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { TrophyIcon as TrophySolidIcon } from '@heroicons/react/24/solid'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

const ProfilePage = () => {
  const { user } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    bio: "Passionate about learning new technologies and solving complex problems. Currently focusing on full-stack development and data structures.",
    location: "Lagos, Nigeria",
    website: "https://github.com/username",
    expertise: ['React', 'TypeScript', 'Node.js', 'Algorithms'],
    joinDate: "January 2024"
  })

  // Mock stats - in real app, these would come from API
  const [stats] = useState({
    quizzesCompleted: 47,
    averageScore: 82,
    currentStreak: user?.streak || 0,
    longestStreak: 25,
    totalPoints: 2340,
    level: 8,
    discussionsCreated: 12,
    groupsJoined: 5,
    sessionsAttended: 8,
    helpfulVotes: 34,
    badges: [
      { id: 1, name: "Quiz Master", description: "Completed 50+ quizzes", icon: "🏆", earned: false },
      { id: 2, name: "Streak Champion", description: "Maintained 30-day streak", icon: "🔥", earned: false },
      { id: 3, name: "Community Helper", description: "Received 25+ helpful votes", icon: "🤝", earned: true },
      { id: 4, name: "Early Adopter", description: "One of the first 100 users", icon: "🌟", earned: true },
      { id: 5, name: "Discussion Starter", description: "Created 10+ discussions", icon: "💬", earned: true },
      { id: 6, name: "Algorithm Expert", description: "Perfect score on algorithms quiz", icon: "🧮", earned: false }
    ]
  })

  const [recentActivity] = useState([
    {
      id: 1,
      type: 'quiz_completed',
      title: 'JavaScript Fundamentals Quiz',
      score: 95,
      timestamp: '2 hours ago',
      icon: BookOpenIcon
    },
    {
      id: 2,
      type: 'discussion_created',
      title: 'Best practices for React hooks',
      timestamp: '1 day ago',
      icon: ChatBubbleLeftRightIcon
    },
    {
      id: 3,
      type: 'group_joined',
      title: 'Advanced JavaScript Masters',
      timestamp: '2 days ago',
      icon: UserGroupIcon
    },
    {
      id: 4,
      type: 'session_attended',
      title: 'Mock Technical Interview',
      timestamp: '3 days ago',
      icon: AcademicCapIcon
    }
  ])

  const handleSaveProfile = () => {
    // In real app, this would make API call
    toast.success('Profile updated successfully!')
    setIsEditing(false)
  }

  const handleExpertiseAdd = (expertise: string) => {
    if (profileData.expertise.length < 10 && !profileData.expertise.includes(expertise)) {
      setProfileData({
        ...profileData,
        expertise: [...profileData.expertise, expertise]
      })
    }
  }

  const handleExpertiseRemove = (expertise: string) => {
    setProfileData({
      ...profileData,
      expertise: profileData.expertise.filter(e => e !== expertise)
    })
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <UserCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Please log in to view your profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="bg-blue-600 text-white w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg border hover:bg-gray-50">
                    <PencilIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-2">{user.email}</p>
                
                {/* Level and Points */}
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <TrophySolidIcon className="h-5 w-5 text-yellow-500" />
                      <span className="font-semibold text-lg">Level {stats.level}</span>
                    </div>
                    <p className="text-sm text-gray-500">{stats.totalPoints} points</p>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {/* Profile Details */}
              <div className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm"
                      />
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{profileData.bio}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        {profileData.location}
                      </div>
                      <div className="flex items-center text-gray-600">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        <a href={profileData.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          Portfolio
                        </a>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <CalendarDaysIcon className="h-4 w-4 mr-2" />
                        Joined {profileData.joinDate}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{stats.quizzesCompleted}</div>
                  <div className="text-sm text-gray-600">Quizzes</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{stats.averageScore}%</div>
                  <div className="text-sm text-gray-600">Avg Score</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Current Streak</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{stats.groupsJoined}</div>
                  <div className="text-sm text-gray-600">Groups</div>
                </div>
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => handleExpertiseRemove(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      const skill = prompt('Add a skill:')
                      if (skill) handleExpertiseAdd(skill)
                    }}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
                  >
                    + Add Skill
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Performance Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Performance Overview</h3>
                <ChartBarIcon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Performance chart will be displayed here</p>
              </div>
            </div>

            {/* Badges & Achievements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <TrophyIcon className="h-5 w-5 text-yellow-500 mr-2" />
                Badges & Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className={`p-4 rounded-lg border-2 ${
                      badge.earned
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{badge.icon}</div>
                      <div>
                        <h4 className="font-medium text-gray-900">{badge.name}</h4>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                    {badge.earned && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                          <CheckBadgeIcon className="h-3 w-3 mr-1" />
                          Earned
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const IconComponent = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <IconComponent className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <ClockIcon className="h-3 w-3" />
                          <span>{activity.timestamp}</span>
                          {activity.score && (
                            <>
                              <span>•</span>
                              <span className="text-green-600 font-medium">Score: {activity.score}%</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Community Contributions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Community Contributions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{stats.discussionsCreated}</div>
                  <div className="text-sm text-gray-600">Discussions Created</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <AcademicCapIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{stats.sessionsAttended}</div>
                  <div className="text-sm text-gray-600">Sessions Attended</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <TrophyIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{stats.helpfulVotes}</div>
                  <div className="text-sm text-gray-600">Helpful Votes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage