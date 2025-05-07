import type React from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Home,
  PowerOff,
  ChevronUp,
  Coffee,
  User,
  Bell,
  Newspaper,
  MessageCircleMore,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DockItemProps {
  icon: React.ReactNode
  label: string
  to: string
  isActive: boolean
}

const DockItem: React.FC<DockItemProps> = ({ icon, label, to, isActive }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    navigate(to)
  }

  return (
    <div
      className={`relative flex items-center justify-center w-10 h-10 cursor-pointer transition-all duration-200 ease-in-out ${isHovered ? "scale-110" : "scale-100"
        }`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center justify-center transition-all duration-200 ${isActive ? "text-white" : isHovered ? "text-white" : "text-gray-400"
          }`}
      >
        {icon}
      </div>

      {/* Label with animation */}
      <div
        className={`absolute -top-8 bg-sky-400 text-white text-xs px-2 py-1 rounded-md opacity-0 transition-all duration-200 ${isHovered ? "opacity-100 transform translate-y-0" : "transform translate-y-2"
          }`}
      >
        {label}
      </div>
    </div>
  )
}

const FloatingDock: React.FC = () => {
  const location = useLocation()
  const [showDock, setShowDock] = useState(true)

  return (
    <AnimatePresence>
      {/* Toggle Button - Only visible when dock is hidden */}
      {!showDock && (
        <motion.button
          onClick={() => setShowDock(true)}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white text-gray-500 border rounded-full p-3 shadow-md hover:bg-gray-100 cursor-pointer transition-all duration-200 z-50"
          aria-label="Show dock"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
          >
            <Coffee className="w-5 h-5" />
          </motion.div>
        </motion.button>
      )}

      {/* Floating Dock */}
      {showDock && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-200/40 backdrop-blur-lg rounded-full shadow-lg px-2 py-1 flex items-center transition-all duration-200 hover:shadow-xl z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <DockItem
            icon={<Home size={20} strokeWidth={1.5} color="gray" />}
            label="Home"
            to="/provider"
            isActive={location.pathname === "/ceo"}
          />
          <DockItem
            icon={<MessageCircleMore size={20} strokeWidth={1.5} color="gray" />}
            label="Chats"
            to="/provider"
            isActive={location.pathname === "/settings"}
          />
          <DockItem
            icon={<Bell size={20} strokeWidth={1.5} color="gray" />}
            label="Notifications"
            to="/provider/notifications"
            isActive={location.pathname === "/settings"}
          />
          <DockItem
            icon={<Newspaper size={20} strokeWidth={1.5} color="gray" />}
            label="News"
            to="/provider/news"
            isActive={location.pathname === "/settings"}
          />
          <DockItem
            icon={<User size={20} strokeWidth={1.5} color="gray" />}
            label="Profile"
            to="/provider/profile"
            isActive={location.pathname === "/ceo/my-balance"}
          />
          <DockItem
            icon={<PowerOff size={20} strokeWidth={1.5} color="gray" />}
            label="Logout"
            to="/login-alt"
            isActive={location.pathname === "/logout"}
          />

          {/* Hide Dock Button as a dock item */}
          <div
            className="relative flex items-center justify-center w-10 h-10 cursor-pointer transition-all duration-200 ease-in-out hover:scale-110"
            onClick={() => setShowDock(false)}
            onMouseEnter={(e) => e.currentTarget.classList.add("scale-110")}
            onMouseLeave={(e) => e.currentTarget.classList.remove("scale-110")}
          >
            <div className="flex items-center justify-center transition-all duration-200 text-gray-400 hover:text-white">
              <ChevronUp size={20} strokeWidth={1.5} color="gray" />
            </div>
            <div className="absolute -top-8 bg-sky-400 text-white text-xs px-2 py-1 rounded-md opacity-0 transition-all duration-200 hover:opacity-100 hover:transform hover:translate-y-0 transform translate-y-2">
              Hide
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FloatingDock