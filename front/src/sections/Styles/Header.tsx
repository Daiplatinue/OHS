import { Search } from "lucide-react"

export default function Header() {

  return (
    <header className="mb-[-30px] mt-2 w-full py-3 px-20 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-2">
          <div className="w-3 h-3 bg-white"></div>
        </div>
        <h1 className="text-gray-700">HandyGo</h1>
      </div>
      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-400 flex items-center justify-center h-10 w-11 hover:text-white transition-colors
         bg-gray-300/70 rounded-full">
          <Search className="h-8 w-5" />
        </button>
        <button className="h-10 w-25 rounded-4xl text-gray-500 text-sm hover:text-white transition-colors bg-gray-300/70">
        Logout</button>
      </div>
    </header>
  )
}