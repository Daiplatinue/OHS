import { useRef, useState, useEffect } from "react"
import MyFloatingDockCeo from "../Styles/MyFloatingDock-Ceo"
import {
  Bell,
  FileText,
  RefreshCw,
  Plus,
  ArrowRight,
  Image,
  Video,
  MessageSquare,
  Heart,
  ThumbsUp,
  Laugh,
  MoreHorizontal,
  Share,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Footer from "../Styles/Footer"

// Add these type definitions at the top of the file
interface PostReaction {
  thumbsUp: number
  heart: number
  laugh: number
  angry: number
  sad: number
}

interface PostComment {
  id: number
  author: string
  content: string
  time: string
}

interface Post {
  id: number
  author: string
  avatar: string
  time: string
  content: string
  type: "text" | "image" | "video"
  mediaUrl?: string
  reactions: PostReaction
  comments: PostComment[]
}

interface Notification {
  id: number
  type: "like" | "comment" | "share" | "report" | "mention"
  postId: number
  user: string
  avatar: string
  time: string
  content: string
  read: boolean
}

interface NewPostData {
  content: string
  type: "text" | "image" | "video"
  mediaUrl?: string
}

interface PostProps {
  post: Post
  onReact: (postId: number, reactionType: keyof PostReaction, change: number) => void
  onComment: (postId: number, comment: string) => void
  onReport: (postId: number) => void
}

interface CreatePostDialogProps {
  onCreatePost: (data: NewPostData) => void
}

// Sample data for posts
const samplePosts: Post[] = [
  {
    id: 1,
    author: "Jane Cooper",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    content: "Our new product launch was a huge success! Thanks to everyone who participated.",
    type: "text",
    reactions: { thumbsUp: 24, heart: 18, laugh: 5, angry: 0, sad: 0 },
    comments: [
      { id: 1, author: "Alex Johnson", content: "Congratulations on the launch!", time: "1 hour ago" },
      { id: 2, author: "Sam Wilson", content: "The new features are amazing!", time: "30 minutes ago" },
    ],
  },
  {
    id: 2,
    author: "Robert Fox",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "Yesterday",
    content: "Check out our office renovation progress!",
    type: "image",
    mediaUrl: "https://cdn.pixabay.com/photo/2025/03/03/13/49/little-girl-9444205_1280.jpg",
    reactions: { thumbsUp: 45, heart: 32, laugh: 0, angry: 2, sad: 0 },
    comments: [{ id: 1, author: "Leslie Alexander", content: "Looking great!", time: "20 hours ago" }],
  },
  {
    id: 3,
    author: "Esther Howard",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "3 days ago",
    content: "Watch our CEO's interview about the future of our company",
    type: "video",
    mediaUrl: "https://cdn.pixabay.com/photo/2025/03/11/09/51/woman-9461840_1280.jpg",
    reactions: { thumbsUp: 87, heart: 56, laugh: 12, angry: 3, sad: 1 },
    comments: [
      { id: 1, author: "Cameron Williamson", content: "Very insightful interview!", time: "2 days ago" },
      { id: 2, author: "Brooklyn Simmons", content: "I'm excited about the new direction!", time: "1 day ago" },
    ],
  },
]

// Sample notifications
const sampleNotifications: Notification[] = [
  {
    id: 1,
    type: "like",
    postId: 1,
    user: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "10 minutes ago",
    content: "liked your post about the product launch",
    read: false,
  },
  {
    id: 2,
    type: "comment",
    postId: 1,
    user: "Sam Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "30 minutes ago",
    content: "commented on your post: 'The new features are amazing!'",
    read: false,
  },
  {
    id: 3,
    type: "report",
    postId: 2,
    user: "System",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    content: "Your post has received a report. Please review our community guidelines.",
    read: false,
  },
  {
    id: 4,
    type: "share",
    postId: 3,
    user: "Emily Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "1 day ago",
    content: "shared your post about the CEO interview",
    read: true,
  },
  {
    id: 5,
    type: "mention",
    postId: 3,
    user: "Michael Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 days ago",
    content: "mentioned you in a comment: 'Great job @CEO on the interview!'",
    read: true,
  },
]

// Post component
function Post({ post, onReact, onComment, onReport }: PostProps) {
  const [comment, setComment] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [showReactions, setShowReactions] = useState(false)
  const [longPressActive, setLongPressActive] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [userReaction, setUserReaction] = useState<keyof PostReaction | null>(null)
  const [menuLongPressActive, setMenuLongPressActive] = useState(false)
  const menuLongPressTimer = useRef<NodeJS.Timeout | null>(null)

  // Calculate total reactions
  const totalReactions = Object.values(post.reactions).reduce((sum, count) => sum + count, 0)

  // Get the dominant reaction type
  const dominantReaction = Object.entries(post.reactions).reduce(
    (max, [type, count]) => (count > max.count ? { type, count } : max),
    { type: "thumbsUp", count: 0 },
  ).type

  // Handle reaction selection
  const handleReact = (reaction: keyof PostReaction) => {
    if (userReaction === reaction) {
      // User is clicking the same reaction again, do nothing
      return
    }

    // If user already reacted with something else, remove the previous reaction
    if (userReaction) {
      onReact(post.id, userReaction, -1) // Decrease previous reaction count
    }

    onReact(post.id, reaction, 1) // Add new reaction
    setUserReaction(reaction) // Track what the user reacted with
    setShowReactions(false)
  }

  // Handle long press start
  const handleLongPressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setLongPressActive(true)
      setShowReactions(true)
    }, 500) // 500ms for long press
  }

  // Handle long press end
  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
    setLongPressActive(false)
  }

  // Handle comment submission
  const handleComment = () => {
    if (comment.trim()) {
      onComment(post.id, comment)
      setComment("")
    }
  }

  // Handle share
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy a link
    console.log(`Sharing post ${post.id}`)
    // You could implement actual sharing functionality here
  }

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current)
      }
      if (menuLongPressTimer.current) {
        clearTimeout(menuLongPressTimer.current)
      }
    }
  }, [])

  // Render reaction icon based on type
  const renderReactionIcon = (type: string) => {
    switch (type) {
      case "thumbsUp":
        return <ThumbsUp className="h-4 w-4 text-[#0A84FF]" />
      case "heart":
        return <Heart className="h-4 w-4 text-[#FF453A]" />
      case "laugh":
        return <Laugh className="h-4 w-4 text-[#FF9500]" />
      case "angry":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#FF453A"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <path d="M7.5 8 10 9" />
            <path d="m14 9 2.5-1" />
            <path d="M9 10h0" />
            <path d="M15 10h0" />
          </svg>
        )
      case "sad":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#5AC8FA"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
          </svg>
        )
      default:
        return <ThumbsUp className="h-4 w-4 text-[#0A84FF]" />
    }
  }

  // Handle menu long press start
  const handleMenuLongPressStart = () => {
    menuLongPressTimer.current = setTimeout(() => {
      setMenuLongPressActive(true)
    }, 500) // 500ms for long press
  }

  // Handle menu long press end
  const handleMenuLongPressEnd = () => {
    if (menuLongPressTimer.current) {
      clearTimeout(menuLongPressTimer.current)
      menuLongPressTimer.current = null
    }
    setMenuLongPressActive(false)
  }

  return (
    <div className="bg-[#F2F2F7]/50 rounded-xl p-4 mb-4 hover:bg-[#F2F2F7] transition-colors">
      <div className="flex items-center mb-3">
        <Avatar className="h-10 w-10 mr-3 border-2 border-white shadow-sm">
          <AvatarImage src={post.avatar} alt={post.author} />
          <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
            {post.author.charAt(0)}
            {post.author.split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{post.author}</p>
          <p className="text-sm text-gray-500 font-light">{post.time}</p>
        </div>
        <DropdownMenu open={menuLongPressActive} onOpenChange={setMenuLongPressActive}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto"
              onMouseDown={handleMenuLongPressStart}
              onMouseUp={handleMenuLongPressEnd}
              onMouseLeave={handleMenuLongPressEnd}
              onTouchStart={handleMenuLongPressStart}
              onTouchEnd={handleMenuLongPressEnd}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onReport(post.id)} className="text-[#FF453A]">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="mb-4 font-light">{post.content}</p>

      {post.type === "image" && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={post.mediaUrl || "/placeholder.svg"} alt="Post image" className="w-full h-180 object-cover" />
        </div>
      )}

      {post.type === "video" && (
        <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <Button variant="outline" className="bg-white/80 rounded-full h-12 w-12 p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-play"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </Button>
          </div>
          <img src={post.mediaUrl || "/placeholder.svg"} alt="Video thumbnail" className="w-full h-180 object-cover" />
        </div>
      )}

      <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
        {totalReactions > 0 ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-1 cursor-default">
                  <div className="flex -space-x-1">
                    {Object.entries(post.reactions).map(([type, count]) =>
                      count > 0 ? (
                        <div
                          key={type}
                          className={`h-5 w-5 rounded-full ${
                            type === "thumbsUp"
                              ? "bg-[#E9F6FF]"
                              : type === "heart"
                                ? "bg-[#FFE5E7]"
                                : type === "laugh"
                                  ? "bg-[#FFF8E6]"
                                  : type === "angry"
                                    ? "bg-[#FFE5E7]"
                                    : "bg-[#E9F6FF]"
                          } flex items-center justify-center`}
                        >
                          {renderReactionIcon(type)}
                        </div>
                      ) : null,
                    )}
                  </div>
                  <span>{totalReactions}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-white text-gray-500 shadow-lg rounded-lg p-2 border border-gray-100">
                <div className="space-y-1">
                  {post.reactions.thumbsUp > 0 && (
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="h-3 w-3 text-[#0A84FF]" />
                      <span className="text-xs">{post.reactions.thumbsUp} likes</span>
                    </div>
                  )}
                  {post.reactions.heart > 0 && (
                    <div className="flex items-center gap-2">
                      <Heart className="h-3 w-3 text-[#FF453A]" />
                      <span className="text-xs">{post.reactions.heart} loves</span>
                    </div>
                  )}
                  {post.reactions.laugh > 0 && (
                    <div className="flex items-center gap-2">
                      <Laugh className="h-3 w-3 text-[#FF9500]" />
                      <span className="text-xs">{post.reactions.laugh} haha</span>
                    </div>
                  )}
                  {post.reactions.angry > 0 && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="#FF453A"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                        <path d="M7.5 8 10 9" />
                        <path d="m14 9 2.5-1" />
                        <path d="M9 10h0" />
                        <path d="M15 10h0" />
                      </svg>
                      <span className="text-xs">{post.reactions.angry} angry</span>
                    </div>
                  )}
                  {post.reactions.sad > 0 && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="#5AC8FA"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                        <line x1="9" x2="9.01" y1="9" y2="9" />
                        <line x1="15" x2="15.01" y1="9" y2="9" />
                      </svg>
                      <span className="text-xs">{post.reactions.sad} sad</span>
                    </div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <div className="text-sm text-gray-400">Be the first to react</div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="text-gray-500 font-light"
        >
          {post.comments.length} comments
        </Button>
      </div>

      <div className="flex gap-2 border-t border-b border-gray-100 py-2 mb-3">
        <Popover open={showReactions} onOpenChange={setShowReactions}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-gray-600 hover:text-[#0A84FF]"
              onMouseDown={handleLongPressStart}
              onMouseUp={handleLongPressEnd}
              onMouseLeave={handleLongPressEnd}
              onTouchStart={handleLongPressStart}
              onTouchEnd={handleLongPressEnd}
              onClick={() => {
                // Only handle the click if not from a long press
                if (!longPressActive) {
                  handleReact("thumbsUp")
                }
              }}
            >
              {userReaction ? renderReactionIcon(userReaction) : renderReactionIcon(dominantReaction)}
              <span className="ml-2">
                {userReaction ? (
                  <>
                    You{" "}
                    {userReaction === "thumbsUp"
                      ? "liked"
                      : userReaction === "heart"
                        ? "loved"
                        : userReaction === "laugh"
                          ? "laughed at"
                          : userReaction === "angry"
                            ? "are angry with"
                            : "are sad about"}{" "}
                    this
                  </>
                ) : (
                  "React"
                )}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-1 w-auto" align="start">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 hover:bg-[#E9F6FF]"
                onClick={() => handleReact("thumbsUp")}
              >
                <ThumbsUp className="h-5 w-5 text-[#0A84FF]" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-[#FFE5E7]" onClick={() => handleReact("heart")}>
                <Heart className="h-5 w-5 text-[#FF453A]" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-[#FFF8E6]" onClick={() => handleReact("laugh")}>
                <Laugh className="h-5 w-5 text-[#FF9500]" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-[#FFE5E7]" onClick={() => handleReact("angry")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#FF453A"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                  <path d="M7.5 8 10 9" />
                  <path d="m14 9 2.5-1" />
                  <path d="M9 10h0" />
                  <path d="M15 10h0" />
                </svg>
              </Button>
              <Button variant="ghost" size="sm" className="p-2 hover:bg-[#E9F6FF]" onClick={() => handleReact("sad")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#5AC8FA"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" x2="9.01" y1="9" y2="9" />
                  <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="flex-1 text-gray-600 hover:text-[#0A84FF]"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Comment
        </Button>

        <Button variant="ghost" size="sm" onClick={handleShare} className="flex-1 text-gray-600 hover:text-[#0A84FF]">
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      {showComments && (
        <div className="mb-3">
          {post.comments.map((comment) => (
            <div key={comment.id} className="p-2 mb-2 bg-[#F2F2F7] rounded-lg">
              <div className="flex justify-between">
                <p className="font-medium text-sm">{comment.author}</p>
                <p className="text-xs text-gray-500 font-light">{comment.time}</p>
              </div>
              <p className="text-sm font-light">{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Textarea
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[40px] text-sm bg-[#F2F2F7] border-0"
        />
        <Button onClick={handleComment} size="sm" className="bg-[#0A84FF] hover:bg-[#0A84FF]/90">
          <MessageSquare className="h-4 w-4 mr-2" />
          Comment
        </Button>
      </div>
    </div>
  )
}

// Create Post Dialog
function CreatePostDialog({ onCreatePost }: CreatePostDialogProps) {
  const [content, setContent] = useState("")
  const [mediaType, setMediaType] = useState<"text" | "image" | "video">("text")
  const [mediaUrl, setMediaUrl] = useState("")
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost({
        content,
        type: mediaType,
        mediaUrl: mediaUrl || undefined,
      })

      // Reset form
      setContent("")
      setMediaType("text")
      setMediaUrl("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-[#0A84FF] hover:bg-white/90 border-0">
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-xl border-none shadow-lg">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] bg-[#F2F2F7] border-0"
          />

          <div className="flex gap-2">
            <Button
              variant={mediaType === "text" ? "default" : "outline"}
              size="sm"
              onClick={() => setMediaType("text")}
              className={mediaType === "text" ? "bg-[#0A84FF]" : ""}
            >
              <FileText className="h-4 w-4 mr-2" />
              Text
            </Button>
            <Button
              variant={mediaType === "image" ? "default" : "outline"}
              size="sm"
              onClick={() => setMediaType("image")}
              className={mediaType === "image" ? "bg-[#0A84FF]" : ""}
            >
              <Image className="h-4 w-4 mr-2" />
              Image
            </Button>
            <Button
              variant={mediaType === "video" ? "default" : "outline"}
              size="sm"
              onClick={() => setMediaType("video")}
              className={mediaType === "video" ? "bg-[#0A84FF]" : ""}
            >
              <Video className="h-4 w-4 mr-2" />
              Video
            </Button>
          </div>

          {mediaType !== "text" && (
            <div>
              <label className="text-sm font-medium">{mediaType === "image" ? "Image URL" : "Video URL"}</label>
              <input
                type="text"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                placeholder={mediaType === "image" ? "Enter image URL" : "Enter video URL"}
                className="w-full p-2 bg-[#F2F2F7] border-0 rounded-md mt-1"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#0A84FF]">
            Create Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Notification Item Component
function NotificationItem({
  notification,
  onMarkAsRead,
}: {
  notification: Notification
  onMarkAsRead: (id: number) => void
}) {
  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-[#FF453A]" />
      case "comment":
        return <MessageSquare className="h-4 w-4 text-[#0A84FF]" />
      case "share":
        return <Share className="h-4 w-4 text-[#5AC8FA]" />
      case "report":
        return <AlertTriangle className="h-4 w-4 text-[#FF9500]" />
      case "mention":
        return <FileText className="h-4 w-4 text-[#5E5CE6]" />
      default:
        return <Bell className="h-4 w-4 text-[#0A84FF]" />
    }
  }

  // Get background color based on notification type
  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case "like":
        return "bg-[#FFE5E7]"
      case "comment":
        return "bg-[#E9F6FF]"
      case "share":
        return "bg-[#E9F6FF]"
      case "report":
        return "bg-[#FFF8E6]"
      case "mention":
        return "bg-[#F2EBFF]"
      default:
        return "bg-[#E9F6FF]"
    }
  }

  return (
    <div
      className={`p-4 hover:bg-[#F2F2F7]/70 transition-colors rounded-xl mb-2 ${!notification.read ? "bg-[#F2F2F7]/30 border-l-4 border-[#0A84FF]" : ""}`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
          <AvatarImage src={notification.avatar} alt={notification.user} />
          <AvatarFallback className="bg-[#E9F6FF] text-[#0A84FF]">
            {notification.user.charAt(0)}
            {notification.user.split(" ")[1]?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <p className="font-medium">{notification.user}</p>
              <div className={`p-1 rounded-full ${getNotificationBgColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
            </div>
            <p className="text-xs text-gray-500 font-light">{notification.time}</p>
          </div>
          <p className="text-sm font-light mt-1">{notification.content}</p>
        </div>
      </div>
    </div>
  )
}

function NewsCeo() {
  const [activeTab, setActiveTab] = useState("posts")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
  const [unreadCount, setUnreadCount] = useState(
    sampleNotifications.filter((notification) => !notification.read).length,
  )

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearTimeout(timer)
  }, [])

  // Format current time
  const timeString = currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const dateString = currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })

  // Simplified metrics
  const newsfeedMetrics = {
    totalPosts: posts.length,
    totalEngagement: posts.reduce((sum, post) => {
      const reactions = Object.values(post.reactions).reduce((a, b) => a + b, 0)
      const comments = post.comments.length
      return sum + reactions + comments
    }, 0),
  }

  // Handle post reactions
  const handleReact = (postId: number, reactionType: keyof PostReaction, change: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            reactions: {
              ...post.reactions,
              [reactionType]: post.reactions[reactionType] + change,
            },
          }
        }
        return post
      }),
    )
  }

  // Handle post comments
  const handleComment = (postId: number, commentText: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: post.comments.length + 1,
                author: "Current User",
                content: commentText,
                time: "Just now",
              },
            ],
          }
        }
        return post
      }),
    )
  }

  // Handle post reports
  const handleReport = (postId: number) => {
    // In a real app, you would send this to your backend
    console.log(`Post ${postId} reported`)

    // Add a notification for the report
    const newNotification: Notification = {
      id: notifications.length + 1,
      type: "report",
      postId: postId,
      user: "System",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Just now",
      content: "Your post has received a report. Please review our community guidelines.",
      read: false,
    }

    setNotifications([newNotification, ...notifications])
    setUnreadCount(unreadCount + 1)
  }

  // Handle post creation
  const handleCreatePost = (postData: NewPostData) => {
    const newPost: Post = {
      id: posts.length + 1,
      author: "Current User",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "Just now",
      content: postData.content,
      type: postData.type,
      mediaUrl: postData.mediaUrl,
      reactions: { thumbsUp: 0, heart: 0, laugh: 0, angry: 0, sad: 0 },
      comments: [],
    }

    setPosts([newPost, ...posts])
  }

  // Handle marking notifications as read
  const handleMarkAsRead = (notificationId: number) => {
    setNotifications(
      notifications.map((notification) => {
        if (notification.id === notificationId && !notification.read) {
          setUnreadCount(unreadCount - 1)
          return { ...notification, read: true }
        }
        return notification
      }),
    )
  }

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
    setUnreadCount(0)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-20 font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Floating Dock */}
      <div className="sticky z-40 flex">
        <MyFloatingDockCeo />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-16">
        {/* Header with Time and Date */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Newsfeed</h1>
            <p className="text-gray-500 text-sm font-light">Stay updated with your company's social media</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-medium text-[#0A84FF]">{timeString}</div>
            <div className="text-sm text-gray-500 font-light">{dateString}</div>
          </div>
        </div>

        {/* Newsfeed Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#0A84FF] to-[#5AC8FA] rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Newsfeed Overview</h2>
                  <p className="text-white/90 font-light">View and manage your social media content</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-0">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <CreatePostDialog onCreatePost={handleCreatePost} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Total Posts</span>
                  </div>
                  <div className="text-3xl font-medium">{newsfeedMetrics.totalPosts}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+15% this month</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Engagement</span>
                  </div>
                  <div className="text-3xl font-medium">{newsfeedMetrics.totalEngagement}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+8% this week</span>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Notifications</span>
                  </div>
                  <div className="text-3xl font-medium">{unreadCount}</div>
                  <div className="text-white/90 text-sm mt-1 flex items-center font-light">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>Unread notifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Post List with Tabs - Left Side */}
          <div className="lg:col-span-2">
            <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
              {/* Post Tabs */}
              <div className="flex border-b border-gray-100 overflow-x-auto">
                <Tabs defaultValue="posts" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start bg-[#F2F2F7] p-0 h-auto">
                    <TabsTrigger
                      value="posts"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-lg data-[state=active]:border-sky-500"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Posts</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-lg data-[state=active]:border-sky-500"
                    >
                      <Bell className="h-4 w-4" />
                      <span>Notifications</span>
                      {unreadCount > 0 && (
                        <Badge className="ml-1 bg-[#0A84FF] text-white hover:bg-[#0A84FF]">{unreadCount}</Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>

                  <div className="p-6">
                    <TabsContent value="posts">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-800">Published Posts</h3>
                          <CreatePostDialog onCreatePost={handleCreatePost} />
                        </div>
                        <div className="bg-[#E9F6FF] text-[#0A84FF] p-4 rounded-lg">
                          <p className="text-sm font-light">
                            All posts are performing well. Engagement is up 12% this week.
                          </p>
                        </div>
                        <div className="space-y-4">
                          {posts.length > 0 ? (
                            posts.map((post) => (
                              <Post
                                key={post.id}
                                post={post}
                                onReact={handleReact}
                                onComment={handleComment}
                                onReport={handleReport}
                              />
                            ))
                          ) : (
                            <div className="p-8 text-center bg-[#F2F2F7] rounded-xl">
                              <div className="flex flex-col items-center justify-center py-6">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="48"
                                  height="48"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-gray-400 mb-4"
                                >
                                  <rect width="18" height="18" x="3" y="3" rx="2" />
                                  <path d="M7 7h10" />
                                  <path d="M7 12h10" />
                                  <path d="M7 17h10" />
                                </svg>
                                <p className="text-gray-600 font-medium text-lg">Stay tuned for more posts!</p>
                                <p className="text-sm text-gray-500 mt-2">New content is coming soon.</p>
                              </div>
                            </div>
                          )}
                          {posts.length > 0 && (
                            <div className="p-6 text-center bg-[#F2F2F7] rounded-xl mt-4">
                              <div className="flex flex-col items-center justify-center py-3">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="text-gray-400 mb-2"
                                >
                                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                  <path d="m9 12 2 2 4-4" />
                                </svg>
                                <p className="text-gray-600 font-medium">This is the end of all the posts</p>
                                <p className="text-sm text-gray-500 mt-1">Stay tuned for more updates!</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="notifications">
                      <div className="space-y-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-800">Notifications</h3>
                          {unreadCount > 0 && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#0A84FF]/20 text-[#0A84FF] hover:bg-[#E9F6FF]"
                              onClick={handleMarkAllAsRead}
                            >
                              Mark all as read
                            </Button>
                          )}
                        </div>

                        {unreadCount > 0 && (
                          <div className="bg-[#E9F6FF] text-[#0A84FF] p-4 rounded-lg">
                            <p className="text-sm font-light">
                              You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}.
                            </p>
                          </div>
                        )}

                        <div className="space-y-1">
                          {notifications.length > 0 ? (
                            notifications.map((notification) => (
                              <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={handleMarkAsRead}
                              />
                            ))
                          ) : (
                            <div className="p-8 text-center bg-[#F2F2F7] rounded-xl">
                              <div className="flex flex-col items-center justify-center py-6">
                                <Bell className="h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-600 font-medium text-lg">No notifications yet</p>
                                <p className="text-sm text-gray-500 mt-2">
                                  When you receive notifications, they'll appear here.
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </Card>
          </div>

          {/* Right Side - Post Analytics */}
          <div>
            <div className="space-y-6">
              {/* Post Engagement */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#E9F6FF] to-[#F2EBFF] p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Post Engagement</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#0A84FF]"
                    >
                      <path d="M3 3v18h18" />
                      <path d="m19 9-5 5-4-4-3 3" />
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-light text-gray-600">Likes</span>
                      <span className="font-medium text-gray-800">156</span>
                    </div>
                    <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                      <div className="h-full rounded-full bg-[#0A84FF]" style={{ width: "75%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-light text-gray-600">Comments</span>
                      <span className="font-medium text-gray-800">89</span>
                    </div>
                    <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                      <div className="h-full rounded-full bg-[#5E5CE6]" style={{ width: "45%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-light text-gray-600">Shares</span>
                      <span className="font-medium text-gray-800">32</span>
                    </div>
                    <div className="h-1.5 bg-[#F2F2F7] rounded-full">
                      <div className="h-full rounded-full bg-[#5AC8FA]" style={{ width: "25%" }}></div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-light text-gray-600">Total Engagement</span>
                      <span className="font-medium text-gray-800">277</span>
                    </div>
                    <div className="text-xs text-[#30D158] mt-1">+12% from last week</div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="border-none rounded-2xl shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#F2EBFF] to-[#FFE5E7]/30 p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-800">Recent Activity</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#5E5CE6]"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                </div>
                <div className="p-0">
                  <div className="divide-y divide-gray-100">
                    {[
                      {
                        type: "New post created",
                        user: "Jane Cooper",
                        time: "2 hours ago",
                        icon: <Plus className="h-4 w-4" />,
                        color: "green",
                      },
                      {
                        type: "New comment",
                        user: "Robert Fox",
                        time: "5 hours ago",
                        icon: <MessageSquare className="h-4 w-4" />,
                        color: "sky",
                      },
                      {
                        type: "Post liked",
                        user: "Esther Howard",
                        time: "1 day ago",
                        icon: <Heart className="h-4 w-4" />,
                        color: "red",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="p-4 hover:bg-[#F2F2F7]/50">
                        <div className="flex items-start gap-3">
                          <div
                            className={`rounded-full p-2 mt-1 ${
                              activity.color === "green"
                                ? "bg-[#E8F8EF] text-[#30D158]"
                                : activity.color === "red"
                                  ? "bg-[#FFE5E7] text-[#FF453A]"
                                  : "bg-[#E9F6FF] text-[#0A84FF]"
                            }`}
                          >
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                              <p className="text-sm font-medium text-gray-800">{activity.type}</p>
                              <span className="text-xs text-gray-500 font-light">{activity.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 font-light">
                              <span className="font-medium">{activity.user}</span> was active
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <Button variant="ghost" className="text-[#5E5CE6] text-xs w-full font-medium">
                      View All Activity
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="ml-1"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default NewsCeo