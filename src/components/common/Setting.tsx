import { motion, AnimatePresence } from "framer-motion"
import { X, Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { useStore } from "../../store/useStore"

interface SettingProps {
  isOpen: boolean
  onClose: () => void
}

export default function Setting({ isOpen, onClose }: SettingProps) {
  const { user } = useStore()
  const [darkMode, setDarkMode] = useState(false)

  // 👉 Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  // 👉 Save theme to localStorage whenever it changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            key="settings-panel"
            className="w-96 rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-800"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                Settings
              </h3>
              <button onClick={onClose} aria-label="Close settings">
                <X className="h-5 w-5 text-slate-500 dark:text-slate-300" />
              </button>
            </div>

            {/* Content */}
            <div className="mt-4 space-y-4">
              {/* User Info */}
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name: {user?.name ?? "Guest"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Email: {user?.email ?? "Not available"}
                </p>
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Dark Mode
                </span>
                <button
                  className={`rounded-full p-2 transition ${
                    darkMode ? "bg-blue-500" : "bg-slate-200"
                  }`}
                  onClick={() => setDarkMode(!darkMode)}
                >
                  {darkMode ? (
                    <Moon className="h-4 w-4 text-white" />
                  ) : (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
