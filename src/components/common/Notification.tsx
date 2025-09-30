import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Trophy, MessageSquare, Award, Brain } from "lucide-react"
import React from "react"

interface Notification {
  id: number
  title: string
  message: string
  time: string
  type: "success" | "achievement" | "social" | "info"
  icon: React.ElementType
}

interface NotificationProps {
  isOpen: boolean
  onClose: () => void
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "New Document Added",
    message: "Your Physics Notes document has been processed",
    time: "2m ago",
    type: "info",
    icon: FileText,
  },
  {
    id: 2,
    title: "Weekly Streak Achieved!",
    message: "You’ve maintained your study streak for 7 days 🎉",
    time: "1h ago",
    type: "achievement",
    icon: Trophy,
  },
  {
    id: 3,
    title: "New Comment",
    message: "James replied to your question in the community",
    time: "3h ago",
    type: "social",
    icon: MessageSquare,
  },
  {
    id: 4,
    title: "AI Suggestion",
    message: "Review your weak topics in Calculus for better performance",
    time: "6h ago",
    type: "success",
    icon: Brain,
  },
  {
    id: 5,
    title: "Achievement Unlocked",
    message: "You earned the 'Consistency Award' badge",
    time: "1d ago",
    type: "achievement",
    icon: Award,
  },
]

export default function Notification({ isOpen, onClose }: NotificationProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="notification-panel"
          className="fixed right-4 top-16 z-50 w-80 rounded-xl bg-white shadow-lg dark:bg-slate-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <h3 className="font-semibold text-slate-800 dark:text-white">
              Notifications
            </h3>
            <button onClick={onClose} aria-label="Close notifications">
              <X className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          {/* List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 dark:border-slate-700"
              >
                <n.icon className="mt-1 h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {n.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {n.message}
                  </p>
                  <span className="text-xs text-slate-400">{n.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
