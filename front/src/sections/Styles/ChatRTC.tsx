import type React from "react"
import { useState, useEffect, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import { format } from "date-fns"

interface Message {
  id: string
  text: string
  sender: string
  sender_id: string
  receiver_id?: string
  timestamp: Date
  isPrivate?: boolean
}

interface User {
  id: string
  username: string
  status?: "online" | "offline"
}

function ChatRTC() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [messageInput, setMessageInput] = useState("")
  const [onlineUsers, setOnlineUsers] = useState<User[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")

    if (storedUser && token) {
      try {
        const user = JSON.parse(storedUser)
        setCurrentUser({
          id: user.id,
          username: user.username,
          status: "online",
        })

        // Initialize socket with auth data
        initializeSocket(user)
      } catch (error) {
        console.error("Failed to parse stored user", error)
        setError("Authentication error. Please log in again.")
        setIsLoading(false)
      }
    } else {
      setError("You are not logged in. Please log in to continue.")
      setIsLoading(false)
    }
  }, [])

  // Initialize socket connection
  const initializeSocket = (user: any) => {
    console.log("Initializing socket with user:", user)

    const newSocket = io("http://localhost:3006", {
      transports: ["websocket"],
      auth: {
        username: user.username,
        userId: user.id,
        token: localStorage.getItem("token"),
      },
      autoConnect: true,
    })

    setSocket(newSocket)

    // Set up socket event handlers
    newSocket.on("connect", () => {
      console.log("Socket connected!")
      setIsConnected(true)
      setIsLoading(false)
    })

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err)
      setError(`Connection error: ${err.message}`)
      setIsLoading(false)
    })

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected")
      setIsConnected(false)
    })

    // Listen for all online users
    newSocket.on("users_update", (users: User[]) => {
      console.log("Online users updated:", users)
      // Filter out current user and ensure no duplicates
      const filteredUsers = users.filter((u) => u.id !== user.id)
      setOnlineUsers(filteredUsers)
    })

    // Listen for private messages
    newSocket.on("private_message", (message: Message) => {
      console.log("Received private message:", message)

      // Determine the conversation ID (either sender or receiver)
      const conversationId = message.sender_id === user.id ? message.receiver_id : message.sender_id

      if (conversationId) {
        setMessages((prev) => {
          // Check if message already exists to prevent duplicates
          const conversationMessages = prev[conversationId] || []
          if (!conversationMessages.some((m) => m.id === message.id)) {
            return {
              ...prev,
              [conversationId]: [...conversationMessages, message],
            }
          }
          return prev
        })
      }
    })

    return newSocket
  }

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedUser])

  // Clean up socket on unmount
  useEffect(() => {
    return () => {
      if (socket) {
        console.log("Disconnecting socket")
        socket.disconnect()
      }
    }
  }, [socket])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)

    // Request message history with this user
    if (socket && currentUser) {
      socket.emit(
        "get_private_message_history",
        {
          userId: user.id,
        },
        (response: { success: boolean; messages: Message[] }) => {
          if (response.success) {
            setMessages((prev) => ({
              ...prev,
              [user.id]: response.messages,
            }))
          }
        },
      )
    }
  }

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!messageInput.trim() || !socket || !isConnected || !selectedUser || !currentUser) {
      return
    }

    const messageData = {
      text: messageInput,
      sender_id: currentUser.id,
      receiver_id: selectedUser.id,
      isPrivate: true,
    }

    console.log("Sending private message:", messageData)
    socket.emit("send_private_message", messageData, (response: { success: boolean; message: Message }) => {
      if (response.success) {
        console.log("Message sent successfully")
        setMessageInput("")

        // Add message to the conversation immediately from the response
        setMessages((prev) => {
          const conversationMessages = prev[selectedUser.id] || []
          // Check if message already exists
          if (!conversationMessages.some((m) => m.id === response.message.id)) {
            return {
              ...prev,
              [selectedUser.id]: [...conversationMessages, response.message],
            }
          }
          return prev
        })
      } else {
        console.error("Failed to send message")
      }
    })
  }

  const handleLogout = () => {
    if (socket) {
      socket.disconnect()
    }

    localStorage.removeItem("user")
    localStorage.removeItem("token")
    window.location.href = "/login"
  }

  const formatMessageTime = (timestamp: Date) => {
    return format(new Date(timestamp), "h:mm a")
  }

  const formatMessageDate = (timestamp: Date) => {
    const messageDate = new Date(timestamp)
    const today = new Date()

    if (messageDate.toDateString() === today.toDateString()) {
      return "Today"
    }

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    }

    return format(messageDate, "MMM d, yyyy")
  }

  // Group messages by date
  const getGroupedMessages = () => {
    if (!selectedUser || !messages[selectedUser.id]) {
      return {}
    }

    const grouped: Record<string, Message[]> = {}

    messages[selectedUser.id].forEach((message) => {
      const date = formatMessageDate(message.timestamp)
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(message)
    })

    return grouped
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Connecting to chat...</p>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full text-red-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Connection Error</h3>
            <p className="mt-2 text-center text-gray-600">{error}</p>
            <button
              onClick={() => (window.location.href = "/login")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - User List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Current user info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                {currentUser?.username.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{currentUser?.username}</p>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Online users */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="px-4 pt-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Online Users ({onlineUsers.length})
          </h3>
          <div className="space-y-1 px-2">
            {onlineUsers.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No users online</p>
            ) : (
              onlineUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserSelect(user)}
                  className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                    selectedUser?.id === user.id ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="ml-3 text-left">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">Click to chat</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                {selectedUser.username.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{selectedUser.username}</p>
                <p className="text-xs text-green-500">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {Object.entries(getGroupedMessages()).map(([date, dateMessages]) => (
                <div key={date} className="mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">{date}</div>
                  </div>

                  {dateMessages.map((message, index) => {
                    const isCurrentUser = message.sender_id === currentUser?.id

                    return (
                      <div
                        key={message.id || index}
                        className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
                      >
                        {!isCurrentUser && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-2 flex-shrink-0">
                            {message.sender.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            isCurrentUser
                              ? "bg-blue-500 text-white rounded-br-none"
                              : "bg-white text-gray-800 rounded-bl-none"
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className={`text-xs mt-1 ${isCurrentUser ? "text-blue-100" : "text-gray-500"}`}>
                            {formatMessageTime(message.timestamp)}
                          </p>
                        </div>

                        {isCurrentUser && (
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium ml-2 flex-shrink-0">
                            {currentUser.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}

              {(!selectedUser || !messages[selectedUser.id] || messages[selectedUser.id].length === 0) && (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mb-4 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <p>No messages yet</p>
                  <p className="text-sm">Send a message to start the conversation</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={sendMessage} className="flex items-center">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <h3 className="text-xl font-medium mb-2">Your Messages</h3>
            <p className="text-center max-w-sm">Select a user from the list to start a conversation</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatRTC