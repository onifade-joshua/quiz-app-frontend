import React from "react"
import { motion } from "framer-motion"
import { useStore } from "../../store/useStore"
import { Mail, Calendar, User as UserIcon } from "lucide-react"

const Profile: React.FC = () => {
  const { user } = useStore()

  return (
    <motion.div
      className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-white via-slate-50 to-slate-100 rounded-2xl shadow-xl border border-slate-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl shadow-md">
          {user?.name?.charAt(0) || "U"}
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-500">Manage your personal details</p>
        </div>
      </div>

      {user ? (
        <div className="space-y-6">
          {/* Name */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <UserIcon className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-gray-700 font-semibold">Full Name</h2>
              <p className="text-gray-600">{user.name}</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <Mail className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-gray-700 font-semibold">Email</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Joined */}
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <div>
              <h2 className="text-gray-700 font-semibold">Joined</h2>
              <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">No user information available.</p>
      )}
    </motion.div>
  )
}

export default Profile
