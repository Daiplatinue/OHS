import { useEffect, useState } from "react"
import { Car } from "lucide-react"

function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [displayedLetters, setDisplayedLetters] = useState(0)
  const fullText = "HANDY GO"
  const [showProgressBar, setShowProgressBar] = useState(false)
  const [loadingTextIndex, setLoadingTextIndex] = useState(0)
  const [titleMoveUp, setTitleMoveUp] = useState(false)

  const loadingTexts = [
    "Getting things ready...",
    "Loading your services...",
    "Almost there...",
    "Preparing your experience...",
    "Just a moment...",
  ]

  useEffect(() => {
    const textInterval = setInterval(() => {
      setDisplayedLetters((prev) => {
        if (prev >= fullText.length) {
          clearInterval(textInterval)

          setTimeout(() => {
            setTitleMoveUp(true)
          }, 500)

          // Show progress bar after text animation completes and title moves up
          setTimeout(() => {
            setShowProgressBar(true)

            // Start progress bar animation - slower to make it last 10 seconds
            const progressInterval = setInterval(() => {
              setProgress((prev) => {
                if (prev >= 100) {
                  clearInterval(progressInterval)
                  setTimeout(() => setLoading(false), 500) // Delay hiding the loading screen
                  return 100
                }
                return prev + 0.5 // Slower increment for 10 second duration
              })
            }, 90) // Adjusted timing for 10 second total

            // Rotate through loading texts
            const loadingTextInterval = setInterval(() => {
              setLoadingTextIndex((prev) => (prev + 1) % loadingTexts.length)
            }, 3000)

            return () => {
              clearInterval(progressInterval)
              clearInterval(loadingTextInterval)
            }
          }, 1000)
          return prev
        }
        return prev + 1
      })
    }, 150) // Adjust timing for letter appearance

    return () => clearInterval(textInterval)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white text-gray-800 z-50">
        {/* Main content */}
        <div className="relative flex flex-col items-center">
          <div
            className={`flex items-center justify-center transition-all duration-700 ease-out mb-[-5rem] ${
              titleMoveUp ? "transform -translate-y-16 mb-[-6rem]" : ""
            }`}
          >
            <h1 className="text-6xl font-semibold relative text-sky-300 tracking-tight">
              {fullText.split("").map((letter, index) => (
                <span
                  key={index}
                  className="transition-all duration-300 inline-block"
                  style={{
                    opacity: index < displayedLetters ? 1 : 0,
                    transform: index < displayedLetters ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </h1>
          </div>

          <div
            className={`mt-12 w-full max-w-[300px] transition-all duration-1000 ease-out ${
              showProgressBar ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Car indicator */}
            <div className="relative h-8 mb-2">
              <div
                className="absolute transition-all duration-300"
                style={{
                  left: `${Math.min(Math.max(progress, 0), 100)}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <Car size={24} className="text-sky-300" />
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-gray-100 w-full rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-sky-300 to-sky-400 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Loading text */}
            <div className="mt-4 text-center text-sm font-light text-gray-600 h-5 overflow-hidden">
              {loadingTexts.map((text, index) => (
                <div
                  key={index}
                  className="transition-opacity duration-500"
                  style={{
                    opacity: loadingTextIndex === index ? 1 : 0,
                    display: loadingTextIndex === index ? "block" : "none",
                  }}
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default LoadingScreen