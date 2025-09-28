import { useState } from "react"
import { motion } from "framer-motion"
import { 
  // BookOpen, 
  FileText, 
  Camera, 
  Mic, 
  Upload, 
  Users, 
  Trophy, 
  Target,
  TrendingUp,
  Brain,
  Star,
  MessageSquare,
  Award,
  Bell,
  Search,
  Plus,
  ChevronRight,
  Headphones,
  FileImage,
  Type,
  Edit3,
  Settings,
  BarChart3,
  // Zap,
  // Calendar,
  // PlayCircle
} from "lucide-react"

export const Dashboard = () => {
  // Mock user data - you can replace this with your actual user from useStore
  const user = {
    name: "Alex Johnson",
    level: "Final Year",
    university: "University of Lagos",
    avatar: "AJ",
    streak: 12,
    totalPoints: 2847
  }

  // Enhanced stats
  const stats = [
    { 
      title: "Documents Analyzed", 
      value: "247", 
      change: "+23%", 
      icon: FileText, 
      gradient: "from-blue-500 to-blue-600"
    },
    { 
      title: "Practice Questions", 
      value: "1,432", 
      change: "+18%", 
      icon: Brain, 
      gradient: "from-purple-500 to-purple-600"
    },
    { 
      title: "Study Streak", 
      value: `${user.streak} days`, 
      change: "🔥", 
      icon: Target, 
      gradient: "from-orange-500 to-orange-600"
    },
    { 
      title: "Community Rank", 
      value: "#47", 
      change: "↑12", 
      icon: Trophy, 
      gradient: "from-green-500 to-green-600"
    }
  ]

  const documentTypes = [
    {
      title: "Text Import",
      description: "Import and analyze text documents",
      icon: Type,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-blue-200",
      hoverColor: "hover:bg-blue-50"
    },
    {
      title: "Screenshot Analysis",
      description: "Capture and process screenshots",
      icon: Camera,
      color: "bg-green-100 text-green-600",
      borderColor: "border-green-200",
      hoverColor: "hover:bg-green-50"
    },
    {
      title: "Image Upload",
      description: "Upload images for text extraction",
      icon: FileImage,
      color: "bg-purple-100 text-purple-600",
      borderColor: "border-purple-200",
      hoverColor: "hover:bg-purple-50"
    },
    {
      title: "Audio Recording",
      description: "Record and transcribe audio notes",
      icon: Mic,
      color: "bg-red-100 text-red-600",
      borderColor: "border-red-200",
      hoverColor: "hover:bg-red-50"
    },
    {
      title: "Handwritten Notes",
      description: "Convert handwritten text to digital",
      icon: Edit3,
      color: "bg-yellow-100 text-yellow-600",
      borderColor: "border-yellow-200",
      hoverColor: "hover:bg-yellow-50"
    },
    {
      title: "File Upload",
      description: "Import PDF, Word, and other files",
      icon: Upload,
      color: "bg-indigo-100 text-indigo-600",
      borderColor: "border-indigo-200",
      hoverColor: "hover:bg-indigo-50"
    }
  ]

  const recentActivity = [
    {
      type: "document",
      title: "Organic Chemistry Chapter 12 analyzed",
      time: "2 hours ago",
      icon: FileText,
      color: "text-blue-500"
    },
    {
      type: "quiz",
      title: "Completed Advanced Mathematics Quiz",
      time: "4 hours ago",
      icon: Brain,
      color: "text-purple-500"
    },
    {
      type: "community",
      title: "New reply in Physics Discussion",
      time: "6 hours ago",
      icon: MessageSquare,
      color: "text-green-500"
    },
    {
      type: "achievement",
      title: "Earned 'Study Streak Champion' badge",
      time: "1 day ago",
      icon: Award,
      color: "text-orange-500"
    }
  ]

  const quickActions = [
    {
      title: "CBT Practice",
      description: "Nigerian university standard questions",
      icon: Target,
      gradient: "from-blue-500 to-blue-600",
      difficulty: "Mixed Difficulty",
      route: "/quiz"
    },
    {
      title: "Study Community",
      description: "Connect with students nationwide",
      icon: Users,
      gradient: "from-green-500 to-green-600",
      difficulty: "Join Discussion",
      route: "/community"
    },
    {
      title: "Audio Explanations",
      description: "Listen to detailed explanations",
      icon: Headphones,
      gradient: "from-purple-500 to-purple-600",
      difficulty: "New Content",
      route: "/audio"
    }
  ]

  // Navigation tabs for dashboard sections
  const [activeSection, setActiveSection] = useState("overview")
  
  const dashboardTabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "practice", label: "Practice", icon: Brain },
    { id: "community", label: "Community", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Dashboard Header with Tabs */}
      <motion.div 
        className="bg-white border-b border-slate-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Dashboard Title Section */}
          <div className="py-6 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Welcome back, {user.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-slate-600 mt-2">
                  Ready to continue your learning journey? You have 3 new document analyses and 12 practice questions waiting.
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search everything..."
                    className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                  />
                </div>
                
                <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Navigation Tabs */}
          <div className="flex space-x-8 py-4">
            {dashboardTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeSection === tab.id
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeSection === "overview" && (
          <>
            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">{stat.change}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
                  <p className="text-slate-600 text-sm">{stat.title}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Document Import Section */}
              <motion.div 
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-slate-900">Import & Analyze Documents</h3>
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold">
                        <Plus className="w-4 h-4" />
                        <span>Add New</span>
                      </button>
                    </div>
                    <p className="text-slate-600 mt-1">Choose your preferred method to import study materials</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {documentTypes.map((type, index) => (
                        <motion.button
                          key={type.title}
                          className={`p-4 border-2 ${type.borderColor} rounded-xl text-left transition-all duration-300 ${type.hoverColor} group`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-10 h-10 rounded-lg ${type.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <type.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-slate-900 mb-1">{type.title}</h4>
                              <p className="text-sm text-slate-600">{type.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={action.title}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-left hover:shadow-lg transition-all duration-300 group"
                        whileHover={{ y: -4 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-bold text-slate-900 mb-2">{action.title}</h4>
                        <p className="text-slate-600 text-sm mb-3">{action.description}</p>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">{action.difficulty}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Sidebar */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-900">Recent Activity</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div className={`w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center`}>
                          <activity.icon className={`w-4 h-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{activity.title}</p>
                          <p className="text-xs text-slate-500">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Performance Insight */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Performance Insight</h3>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <p className="text-sm opacity-90 mb-4">
                    Your practice accuracy has improved by 23% this week. Keep up the great work!
                  </p>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">87% Average Score</span>
                  </div>
                </div>

                {/* Study Goals */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Today's Goals</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">Practice Questions</span>
                      <span className="text-sm font-semibold text-blue-600">8/10</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-slate-700">Study Time</span>
                      <span className="text-sm font-semibold text-green-600">2.5/3 hrs</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '83%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Other sections content */}
        {activeSection === "documents" && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FileText className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Documents Management</h3>
            <p className="text-slate-600">Your document analysis and management tools will appear here.</p>
          </motion.div>
        )}

        {activeSection === "practice" && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Brain className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Practice Arena</h3>
            <p className="text-slate-600">Your CBT practice questions and assessments will appear here.</p>
          </motion.div>
        )}

        {activeSection === "community" && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Users className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Study Community</h3>
            <p className="text-slate-600">Connect with students from different universities across Nigeria.</p>
          </motion.div>
        )}

        {activeSection === "analytics" && (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <TrendingUp className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Learning Analytics</h3>
            <p className="text-slate-600">Detailed insights into your learning progress and performance.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}