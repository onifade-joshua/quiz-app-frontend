import React, { useState, useEffect } from 'react'
import { formatTime } from '../../utils/helpers'
import { motion, AnimatePresence } from 'framer-motion'

interface TimerProps {
  startTime: number
  isActive: boolean
  duration?: number // seconds (default 5 minutes)
  onTimeUp?: () => void
}

export const Timer: React.FC<TimerProps> = ({
  startTime,
  isActive,
  duration = 300,
  onTimeUp,
}) => {
  const [remainingTime, setRemainingTime] = useState(duration)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive && startTime) {
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000)
        const timeLeft = duration - elapsed

        if (timeLeft <= 0) {
          clearInterval(interval)
          setRemainingTime(0)
          onTimeUp?.()
        } else {
          setRemainingTime(timeLeft)
        }
      }, 1000)
    }
    return () => interval && clearInterval(interval)
  }, [isActive, startTime, duration, onTimeUp])

  const isCritical = remainingTime <= 30

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center text-lg font-mono"
    >
      <div
        className={`px-4 py-2 rounded-xl shadow-md border ${
          isCritical ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-200'
        }`}
      >
        <span className="text-gray-600 mr-2">⏳ Time Left:</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={remainingTime}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`font-bold ${
              isCritical ? 'text-red-600' : 'text-gray-900'
            }`}
          >
            {formatTime(remainingTime)}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
