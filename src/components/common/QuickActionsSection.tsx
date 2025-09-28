import React from "react"
import { motion } from "framer-motion"

export interface QuickAction {
  title: string
  description: string
  icon: React.ElementType
  gradient: string
  difficulty: string
  route: string
}

interface Props {
  quickActions: QuickAction[]
}

export default function QuickActionsSection({ quickActions }: Props) {
  return (
    <div className="mt-8">
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
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{action.title}</h4>
            <p className="text-slate-600 text-sm mb-3">{action.description}</p>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full">
              {action.difficulty}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
