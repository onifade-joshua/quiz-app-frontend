import { useState, useRef } from 'react'

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({})
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const playAudio = (audioUrl: string, id: string) => {
    if (isPlaying[id]) {
      audioRef.current?.pause()
      setIsPlaying(prev => ({ ...prev, [id]: false }))
    } else {
      if (audioRef.current) {
        audioRef.current.src = audioUrl
        audioRef.current.play()
        setIsPlaying(prev => ({ ...prev, [id]: true }))
      }
    }
  }

  const stopAllAudio = () => {
    audioRef.current?.pause()
    setIsPlaying({})
  }

  return { isPlaying, playAudio, stopAllAudio, audioRef }
}