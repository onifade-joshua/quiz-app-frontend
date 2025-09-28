import React from "react"
import { motion } from "framer-motion"

export interface Activity {
  title: string
  time: string
  icon: React.ElementType
  color: string
}

interface Props {
  recentActivity: Activity[]
}

export default function RecentActivitySection({ recentActivity }: Props) {
  return (
    <div
      className="
        bg-white 
        rounded-2xl 
        shadow-sm 
        border border-slate-100 
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-slate-100">
        <h3 className="font-bold text-slate-900 text-base sm:text-lg md:text-xl">
          Recent Activity
        </h3>
      </div>

      {/* Activities */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        {recentActivity.map((activity, index) => (
          <motion.div
            key={index}
            className="flex items-start space-x-3 sm:space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            {/* Icon */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
              <activity.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${activity.color}`} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium text-slate-900 truncate">
                {activity.title}
              </p>
              <p className="text-xs sm:text-sm text-slate-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
