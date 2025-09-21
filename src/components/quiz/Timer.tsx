import React, { useState, useEffect } from 'react'
import { formatTime } from '../../utils/helpers'

interface TimerProps {
  startTime: number
  isActive: boolean
  duration?: number // in seconds (defaults to 5 minutes)
  onTimeUp?: () => void
}

export const Timer: React.FC<TimerProps> = ({
  startTime,
  isActive,
  duration = 300, // default = 5 minutes
  onTimeUp
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
          if (onTimeUp) onTimeUp()
        } else {
          setRemainingTime(timeLeft)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, startTime, duration, onTimeUp])

  return (
    <div className="flex items-center text-lg font-mono">
      <div className="bg-gray-100 px-3 py-2 rounded-lg">
        <span className="text-gray-600">Time Left: </span>
        <span className={`font-semibold ${remainingTime <= 30 ? 'text-red-600' : 'text-gray-900'}`}>
          {formatTime(remainingTime)}
        </span>
      </div>
    </div>
  )
}
