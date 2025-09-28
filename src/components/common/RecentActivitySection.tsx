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
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {activity.title}
              </p>
              <p className="text-xs text-slate-500">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
