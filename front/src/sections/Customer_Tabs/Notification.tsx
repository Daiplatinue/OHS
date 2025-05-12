import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, X, Check, Download, ChevronRight } from "lucide-react"

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ")
}

export interface NotificationItem {
  id: string
  user: {
    name: string
    avatar: string
  }
  action: string
  content?: string
  time: string
  date: string
  read: boolean
  type: "comment" | "follow" | "upload" | "like" | "mention"
  attachments?: Array<{
    name: string
    size: string
    type: string
  }>
}

interface NotificationPopupProps {
  onClose: () => void
  updateBadge?: (notifications: NotificationItem[]) => void
}

export default function NotificationPopup({ onClose, updateBadge }: NotificationPopupProps) {
  const [activeTab] = useState<"all" | "mentions">("all")
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      user: {
        name: "Frankie Sullivan",
        avatar: "https://cdn.pixabay.com/photo/2025/03/11/09/51/woman-9461838_1280.jpg",
      },
      action: "commented on your post",
      content: "This is looking great! Let's get started on it.",
      time: "2:20pm",
      date: "Sep 20, 2024",
      read: false,
      type: "comment",
    },
    {
      id: "2",
      user: {
        name: "Amélie Laurent",
        avatar: "https://cdn.pixabay.com/photo/2025/05/02/15/58/flower-girl-9574211_1280.jpg",
      },
      action: "followed you",
      time: "10:04am",
      date: "Sep 20, 2024",
      read: false,
      type: "follow",
    },
    {
      id: "3",
      user: {
        name: "Jogeet Singh",
        avatar: "https://cdn.pixabay.com/photo/2025/03/28/13/06/lamps-9498872_1280.jpg",
      },
      action: "Liked on your post",
      time: "2:20pm",
      date: "Sep 20, 2024",
      read: true,
      type: "like",
    },
    {
      id: "4",
      user: {
        name: "Mike Smith",
        avatar: "https://cdn.pixabay.com/photo/2025/04/30/13/27/red-baron-squadron-9569430_960_720.jpg",
      },
      action: "followed you",
      time: "10:04am",
      date: "Sep 20, 2024",
      read: true,
      type: "follow",
    },
    {
      id: "5",
      user: {
        name: "Sarah Johnson",
        avatar: "https://cdn.pixabay.com/photo/2025/03/11/09/51/woman-9461838_1280.jpg",
      },
      action: "mentioned you in a comment",
      content: "Hey @user, what do you think about this design?",
      time: "11:45am",
      date: "Sep 19, 2024",
      read: true,
      type: "mention",
    },
    {
      id: "6",
      user: {
        name: "Emma Wilson",
        avatar: "https://cdn.pixabay.com/photo/2025/05/02/15/58/flower-girl-9574211_1280.jpg",
      },
      action: "liked your comment",
      time: "Yesterday",
      date: "Sep 18, 2024",
      read: true,
      type: "like",
    },
    {
      id: "7",
      user: {
        name: "James Brown",
        avatar: "https://cdn.pixabay.com/photo/2025/03/28/13/06/lamps-9498872_1280.jpg",
      },
      action: "replied to your comment",
      content: "I completely agree with your point. Let's discuss this further.",
      time: "Yesterday",
      date: "Sep 18, 2024",
      read: true,
      type: "comment",
    },
  ])

  const [isLoading, setIsLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(4)
  const [hasMore, setHasMore] = useState(false)

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    return notification.type === "mention" || notification.type === "comment"
  })

  useEffect(() => {
    // Simulate loading state
    setIsLoading(true)

    // Use a small timeout to ensure smooth transition when data is ready
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Check if there are more notifications to load
  useEffect(() => {
    setHasMore(filteredNotifications.length > visibleCount)
  }, [filteredNotifications.length, visibleCount])

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }))

    setNotifications(updatedNotifications)

    // Update badge count
    if (updateBadge) {
      updateBadge(updatedNotifications)
    }
  }

  const handleMarkAsRead = (id: string) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? {
            ...notification,
            read: true,
          }
        : notification,
    )

    setNotifications(updatedNotifications)

    // Update badge count
    if (updateBadge) {
      updateBadge(updatedNotifications)
    }
  }

  // Update badge count when component mounts
  useEffect(() => {
    if (updateBadge) {
      updateBadge(notifications)
    }
  }, [updateBadge, notifications])

  useEffect(() => {}, [isLoading, notifications, updateBadge])

  return (
    <div className="max-h-[85vh] flex flex-col bg-white/95 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h3 className="text-xl font-semibold text-gray-900">Notifications</h3>
        <button
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Notification List */}
      <div className="overflow-y-auto flex-1 px-4">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-8 h-[300px]"
            >
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-gray-500 text-sm">Loading notifications...</p>
            </motion.div>
          ) : filteredNotifications.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-8 text-gray-500"
            >
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">No notifications</p>
              <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
            </motion.div>
          ) : (
            <motion.div
              key="notifications"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3 py-3"
            >
              <AnimatePresence>
                {filteredNotifications.slice(0, visibleCount).map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.05 },
                    }}
                    exit={{ opacity: 0, y: -10 }}
                    className={cn(
                      "p-3 rounded-xl transition-all",
                      !notification.read ? "bg-blue-50 border border-blue-100" : "bg-gray-50 border border-gray-100",
                    )}
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <img
                          src={notification.user.avatar || "/placeholder.svg"}
                          alt={notification.user.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              <span>{notification.user.name}</span>{" "}
                              <span className="font-normal text-gray-700">{notification.action}</span>
                            </p>
                            {notification.content && (
                              <p className="text-sm text-gray-600 mt-1 leading-snug">{notification.content}</p>
                            )}
                          </div>
                          {!notification.read && (
                            <span className="px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full flex-shrink-0">
                              New
                            </span>
                          )}
                        </div>

                        {notification.attachments && notification.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {notification.attachments.map((attachment, index) => (
                              <div
                                key={index}
                                className="flex items-center p-2 rounded-lg bg-white border border-gray-200 shadow-sm"
                              >
                                <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                                  <img
                                    src="/placeholder.svg?height=36&width=36"
                                    alt="File thumbnail"
                                    className="w-9 h-9 rounded-md"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate text-gray-900">{attachment.name}</p>
                                  <p className="text-xs text-gray-500">{attachment.size}</p>
                                </div>
                                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                                  <Download className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <p className="text-xs text-gray-500">{notification.time}</p>
                            <span className="text-gray-300">•</span>
                            <p className="text-xs text-gray-500">{notification.date}</p>
                          </div>
                          <button className="text-xs text-blue-600 font-medium flex items-center">
                            View
                            <ChevronRight className="w-3 h-3 ml-0.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {hasMore && (
                <div className="flex justify-center py-2">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View more
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-center bg-gray-50">
        <button
          onClick={handleMarkAllAsRead}
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Check className="w-4 h-4 mr-1" />
          Mark all as read
        </button>
      </div>
    </div>
  )
}