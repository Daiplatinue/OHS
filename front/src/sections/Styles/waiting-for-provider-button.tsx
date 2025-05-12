import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"

interface WaitingForProviderButtonProps {
  onComplete: () => void
  duration?: number // in seconds
}

export default function WaitingForProviderButton({ onComplete, duration = 10 }: WaitingForProviderButtonProps) {
  const [isWaiting, setIsWaiting] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let timer: NodeJS.Timeout
    let progressTimer: NodeJS.Timeout

    if (isWaiting) {
      // Update progress every second
      const increment = 100 / duration
      progressTimer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + increment
          return newProgress <= 100 ? newProgress : 100
        })
      }, 1000)

      // Complete after duration seconds
      timer = setTimeout(() => {
        setIsWaiting(false)
      }, duration * 1000)
    }

    return () => {
      clearTimeout(timer)
      clearInterval(progressTimer)
    }
  }, [isWaiting, duration])

  return (
    <div className="w-full flex flex-col items-center" style={{ animation: "fadeIn 0.5s ease-out 0.3s both" }}>
      {isWaiting ? (
        <>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 overflow-hidden">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-center gap-2 px-8 py-3 bg-gray-200 text-gray-700 rounded-full font-medium">
            <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            Waiting for provider...
          </div>
        </>
      ) : (
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-blue-500 text-white rounded-full font-medium shadow-sm hover:bg-blue-600 active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          <MapPin className="h-5 w-5" />
          Track Service
        </button>
      )}
    </div>
  )
}