import { useEffect, useState } from "react";

function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [, setComplete] = useState(false);
  const [firstSpread, setFirstSpread] = useState(false);
  const [secondSpread, setSecondSpread] = useState(false);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setComplete(true);

          // Trigger spreads immediately after completion
          setFirstSpread(true);
          
          // Second spread shortly after
          setTimeout(() => {
            setSecondSpread(true);
          }, 500);

          // Hide loading screen
          setTimeout(() => {
            setLoading(false);
          }, 1500);

          return 100;
        }
        return prev + 0.5;
      });
    }, 30);

    return () => clearInterval(progressInterval);
  }, []);

  if (!loading) return null;

  return (
    <div 
      className="fixed inset-0 flex flex-col items-center justify-center bg-white text-gray-800 z-50 overflow-hidden"
    >
      {/* Centered black container with progress */}
      <div className="w-full">
        <div className="relative w-full">
          {/* Gray background container */}
          <div className=" w-full h-16 flex items-center justify-between px-8">
            <div className="text-gray-500 font-bold text-2xl">LOADING</div>
          </div>
          
          {/* Black overlay that grows with progress */}
          <div 
            className="absolute top-0 left-0 h-16 bg-sky-500 flex items-center justify-between px-8 transition-all duration-300 ease-out overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="text-white font-bold text-2xl whitespace-nowrap">LOADING</div>
            <div className="text-white font-bold text-2xl whitespace-nowrap">/{progress.toFixed(0)}</div>
          </div>
       
        </div>
      </div>

      {/* First spread (black) */}
      <div
        className={`fixed inset-0 bg-sky-500 transition-all duration-1000 ease-in-out ${
          firstSpread ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'center' }}
      />

      {/* Second spread (white) */}
      <div
        className={`fixed inset-0 bg-white transition-all duration-1000 ease-in-out ${
          secondSpread ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'center' }}
      />
    </div>
  );
}

export default LoadingScreen;