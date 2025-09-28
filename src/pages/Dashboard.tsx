import { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Camera,
  Mic,
  Upload,
  Users,
  Trophy,
  Target,
  TrendingUp,
  Brain,
  MessageSquare,
  Award,
  Search,
  Headphones,
  FileImage,
  Type,
  Edit3,
  Settings,
  BarChart3,
  Bell,
} from "lucide-react"

import DocumentImportSection, { type DocumentType } from "../components/common/DocumentImportSection"
import QuickActionsSection, { type QuickAction } from "../components/common/QuickActionsSection"
import DashboardSidebar from "../components/common/DashboardSidebar"
import { Navbar } from "../components/common/Navbar"
import { useStore } from "../store/useStore"

export default function Dashboard() {
  // ✅ get logged in user from store
  const { user } = useStore()

  // fallback if no user is available
  const displayName = user?.name || "Guest"
  const firstName = displayName.split(" ")[0]

  // you can compute streak from user data if available, else default to 0
  const streak = user?.streak ?? 0

  const stats = [
    { title: "Documents Analyzed", value: "247", change: "+23%", icon: FileText, gradient: "from-blue-500 to-blue-600" },
    { title: "Practice Questions", value: "1,432", change: "+18%", icon: Brain, gradient: "from-purple-500 to-purple-600" },
    { title: "Study Streak", value: `${streak} days`, change: "🔥", icon: Target, gradient: "from-orange-500 to-orange-600" },
    { title: "Community Rank", value: "#47", change: "↑12", icon: Trophy, gradient: "from-green-500 to-green-600" },
  ]

  const documentTypes: DocumentType[] = [
    { title: "Text Import", description: "Import and analyze text documents", icon: Type, color: "bg-blue-100 text-blue-600", borderColor: "border-blue-200", hoverColor: "hover:bg-blue-50" },
    { title: "Screenshot Analysis", description: "Capture and process screenshots", icon: Camera, color: "bg-green-100 text-green-600", borderColor: "border-green-200", hoverColor: "hover:bg-green-50" },
    { title: "Image Upload", description: "Upload images for text extraction", icon: FileImage, color: "bg-purple-100 text-purple-600", borderColor: "border-purple-200", hoverColor: "hover:bg-purple-50" },
    { title: "Audio Recording", description: "Record and transcribe audio notes", icon: Mic, color: "bg-red-100 text-red-600", borderColor: "border-red-200", hoverColor: "hover:bg-red-50" },
    { title: "Handwritten Notes", description: "Convert handwritten text to digital", icon: Edit3, color: "bg-yellow-100 text-yellow-600", borderColor: "border-yellow-200", hoverColor: "hover:bg-yellow-50" },
    { title: "File Upload", description: "Import PDF, Word, and other files", icon: Upload, color: "bg-indigo-100 text-indigo-600", borderColor: "border-indigo-200", hoverColor: "hover:bg-indigo-50" },
  ]

  const recentActivity = [
    { title: "Organic Chemistry Chapter 12 analyzed", time: "2 hours ago", icon: FileText, color: "text-blue-500" },
    { title: "Completed Advanced Mathematics Quiz", time: "4 hours ago", icon: Brain, color: "text-purple-500" },
    { title: "New reply in Physics Discussion", time: "6 hours ago", icon: MessageSquare, color: "text-green-500" },
    { title: "Earned 'Study Streak Champion' badge", time: "1 day ago", icon: Award, color: "text-orange-500" },
  ]

  const quickActions: QuickAction[] = [
    { title: "CBT Practice", description: "Nigerian university standard questions", icon: Target, gradient: "from-blue-500 to-blue-600", difficulty: "Mixed Difficulty", route: "/cbt-practice" },
    { title: "Study Community", description: "Connect with students nationwide", icon: Users, gradient: "from-green-500 to-green-600", difficulty: "Join Discussion", route: "/study-community" },
    { title: "Audio Explanations", description: "Listen to detailed explanations", icon: Headphones, gradient: "from-purple-500 to-purple-600", difficulty: "New Content", route: "/audio" },
  ]

  const [activeSection, setActiveSection] = useState("overview")

  const dashboardTabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "practice", label: "Practice", icon: Brain },
    { id: "community", label: "Community", icon: Users },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      {/* Header */}
      <motion.div
        className="bg-white border-b border-slate-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="py-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-3xl font-bold text-slate-900">
                  Welcome back, {firstName}! 👋
                </h1>
                <p className="text-slate-600 mt-2 text-sm sm:text-base">
                  Ready to continue your learning journey? You have 3 new
                  document analyses and 12 practice questions waiting.
                </p>
              </div>

              {/* Search & Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search everything..."
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center justify-end sm:justify-start gap-3">
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
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto flex-nowrap space-x-4 sm:space-x-8 py-4 scrollbar-hide">
            {dashboardTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeSection === tab.id
                    ? "bg-blue-100 text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {activeSection === "overview" && (
          <>
            {/* Stats */}
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
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-slate-600 text-sm">{stat.title}</p>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <DocumentImportSection documentTypes={documentTypes} />
                <QuickActionsSection quickActions={quickActions} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <DashboardSidebar recentActivity={recentActivity} />
              </motion.div>
            </div>
          </>
        )}

        {/* Placeholder for other sections */}
        {activeSection !== "overview" && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex flex-col items-center">
              {activeSection === "documents" && (
                <FileText className="w-20 h-20 text-slate-300 mb-4" />
              )}
              {activeSection === "practice" && (
                <Brain className="w-20 h-20 text-slate-300 mb-4" />
              )}
              {activeSection === "community" && (
                <Users className="w-20 h-20 text-slate-300 mb-4" />
              )}
              {activeSection === "analytics" && (
                <TrendingUp className="w-20 h-20 text-slate-300 mb-4" />
              )}
              <h3 className="text-2xl font-bold text-slate-900 mb-2 capitalize">
                {activeSection}
              </h3>
              <p className="text-slate-600">
                Content for {activeSection} will appear here.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
