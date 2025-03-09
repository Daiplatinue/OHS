import headphones from "../../assets/1-removebg-preview.png"
import grooming from "../../assets/1-removebg-preview.png"
import gameboy from "../../assets/1-removebg-preview.png"

export default function ProductShowcase() {
  return (
    <div className="flex flex-col md:flex-row gap-4 max-w-6xl mx-auto p-4">
      {/* Wireless Headphones Card */}
      <div className="flex-1 rounded-lg overflow-hidden bg-gray-100 p-6 relative min-h-[300px]">
        <div className="z-10 relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Wireless
            <br />
            headphones
          </h2>
          <p className="text-gray-600 mb-2">Starting at $49</p>
          <a href="#" className="text-blue-500 font-medium no-underline hover:underline">
            Shop now
          </a>
        </div>
        <div className="absolute -right-4 -bottom-4 w-[220px]">
          <img
            src={headphones || "/placeholder.svg?height=220&width=220"}
            alt="White wireless headphones"
            className="w-full h-[200px]"
          />
        </div>
      </div>

      {/* Grooming Card */}
      <div className="flex-1 rounded-lg overflow-hidden bg-gray-100 p-6 relative min-h-[280px]">
        <div className="z-10 relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Grooming</h2>
          <p className="text-gray-600 mb-2">Starting at $49</p>
          <a href="#" className="text-blue-500 font-medium no-underline hover:underline">
            Shop now
          </a>
        </div>
        <div className="absolute -right-4 -bottom-4 w-[220px]">
          <img
            src={grooming || "/placeholder.svg?height=220&width=220"}
            alt="Electric trimmer"
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Video Games Card */}
      <div className="flex-1 rounded-lg overflow-hidden bg-amber-50 p-6 relative min-h-[280px]">
        <div className="z-10 relative">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            Video
            <br />
            games
          </h2>
          <p className="text-gray-600 mb-2">Starting at $49</p>
          <a href="#" className="text-blue-500 font-medium no-underline hover:underline">
            Shop now
          </a>
        </div>
        <div className="absolute -right-4 -bottom-4 w-[220px]">
          <img
            src={gameboy || "/placeholder.svg?height=220&width=220"}
            alt="Yellow handheld game console"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}