import type React from "react"

import { useState, useEffect } from "react"
import MyFloatingDock from "../Styles/MyFloatingDock"
import {
  Search,
  ArrowRight,
  RefreshCw,
  ChevronRight,
  BarChart3,
  Trash2,
  Heart,
  MessageSquare,
  Share2,
  Settings,
  Users,
  TrendingUp,
  ImageIcon,
  Video,
  FileText,
  Plus,
  Filter,
  MoreHorizontal,
  Globe,
  Lock,
  UserPlus,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Ban,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type PostStatus = "pending" | "published" | "scheduled" | "draft" | "archived" | "rejected"
type PostVisibility = "public" | "friends" | "private"
type PostType = "text" | "image" | "video" | "reel" | "article" | "link"
type PostEngagement = "high" | "medium" | "low"
type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry"

interface PostReaction {
  type: ReactionType
  count: number
}

interface PostAuthor {
  id: string
  name: string
  username: string
  avatar: string
  initials: string
  verified: boolean
  followers: number
  suspended?: boolean
  suspensionDays?: number
  suspensionReason?: string
}

interface PostComment {
  id: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  content: string
  timestamp: string
  timeAgo: string
  likes: number
}

interface Post {
  id: string
  author: PostAuthor
  content: string
  preview?: string
  mediaUrl?: string
  mediaType?: "image" | "video" | "reel"
  timestamp: string
  timeAgo: string
  status: PostStatus
  visibility: PostVisibility
  type: PostType
  engagement: PostEngagement
  reactions: PostReaction[]
  commentCount: number
  shares: number
  views: number
  saved: boolean
  trending: boolean
  tags?: string[]
  location?: string
  comments?: PostComment[]
  moderationNotes?: string
  reportCount?: number
  reports?: {
    userId: string
    reason: string
    timestamp: string
  }[]
}

interface TrendingTopic {
  id: string
  name: string
  count: number
  trend: "up" | "down" | "stable"
  percentage: number
}

interface ContentCategory {
  id: string
  name: string
  postCount: number
  engagement: number
}

function NewsAdmin() {
  // State variables
  const [activeTab, setActiveTab] = useState("pending")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [newPostContent, setNewPostContent] = useState("")
  const [showComments, setShowComments] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editPostContent, setEditPostContent] = useState("")
  const [editPostVisibility, setEditPostVisibility] = useState<PostVisibility>("public")
  const [moderationNote, setModerationNote] = useState("")
  const [isModerateDialogOpen, setIsModerateDialogOpen] = useState(false)
  const [moderationAction, setModerationAction] = useState<"approve" | "reject">("approve")
  const [isPendingModalOpen, setIsPendingModalOpen] = useState(false)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [suspensionDays, setSuspensionDays] = useState("7")
  const [suspensionReason, setSuspensionReason] = useState("")
  const [isSuspendUserDialogOpen, setIsSuspendUserDialogOpen] = useState(false)

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

  // Sample authors
  const authors = {
    user1: {
      id: "user1",
      name: "Alex Johnson",
      username: "@alexjohnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
      verified: true,
      followers: 12450,
    },
    user2: {
      id: "user2",
      name: "Sarah Williams",
      username: "@sarahwilliams",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SW",
      verified: false,
      followers: 8320,
    },
    user3: {
      id: "user3",
      name: "Tech Insights",
      username: "@techinsights",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TI",
      verified: true,
      followers: 45600,
    },
    user4: {
      id: "user4",
      name: "Global News",
      username: "@globalnews",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "GN",
      verified: true,
      followers: 128900,
    },
    user5: {
      id: "user5",
      name: "Design Studio",
      username: "@designstudio",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DS",
      verified: false,
      followers: 22340,
    },
    user6: {
      id: "user6",
      name: "John Smith",
      username: "@johnsmith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      verified: false,
      followers: 5670,
      suspended: true,
      suspensionDays: 30,
      suspensionReason: "Repeated violation of community guidelines - hate speech",
    },
    user7: {
      id: "user7",
      name: "Emma Davis",
      username: "@emmadavis",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
      verified: false,
      followers: 3450,
      suspended: true,
      suspensionDays: 7,
      suspensionReason: "Posting misleading information",
    },
    user8: {
      id: "user8",
      name: "Michael Brown",
      username: "@michaelbrown",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      verified: true,
      followers: 18900,
      suspended: true,
      suspensionDays: 14,
      suspensionReason: "Spam and excessive self-promotion",
    },
  }

  // Sample pending posts
  const pendingPosts: Post[] = [
    {
      id: "p1",
      author: authors.user2,
      content:
        "Just tried the new restaurant downtown - amazing food and atmosphere! Highly recommend the seafood pasta. #FoodReview #LocalBusiness",
      mediaUrl: "/placeholder.svg?height=400&width=600",
      mediaType: "image",
      timestamp: "2025-03-17T11:45:00",
      timeAgo: "45 minutes ago",
      status: "pending",
      visibility: "public",
      type: "image",
      engagement: "medium",
      reactions: [
        { type: "like", count: 0 },
        { type: "love", count: 0 },
        { type: "haha", count: 0 },
        { type: "wow", count: 0 },
        { type: "sad", count: 0 },
        { type: "angry", count: 0 },
      ],
      commentCount: 0,
      shares: 0,
      views: 12,
      saved: false,
      trending: false,
      tags: ["FoodReview", "LocalBusiness"],
      reportCount: 0,
    },
    {
      id: "p2",
      author: authors.user5,
      content:
        "Our latest design project for EcoTech is ready for review! We created a minimalist, user-friendly interface that makes sustainable living accessible to everyone. #Design #UX #Sustainability",
      mediaUrl: "/placeholder.svg?height=400&width=600",
      mediaType: "image",
      timestamp: "2025-03-17T10:30:00",
      timeAgo: "2 hours ago",
      status: "pending",
      visibility: "public",
      type: "image",
      engagement: "medium",
      reactions: [
        { type: "like", count: 0 },
        { type: "love", count: 0 },
        { type: "haha", count: 0 },
        { type: "wow", count: 0 },
        { type: "sad", count: 0 },
        { type: "angry", count: 0 },
      ],
      commentCount: 0,
      shares: 0,
      views: 8,
      saved: false,
      trending: false,
      tags: ["Design", "UX", "Sustainability"],
      reportCount: 0,
    },
    {
      id: "p3",
      author: authors.user1,
      content:
        "Looking for recommendations on the best productivity apps for remote work. What's working for you? #RemoteWork #Productivity #TechTools",
      timestamp: "2025-03-17T09:15:00",
      timeAgo: "3 hours ago",
      status: "pending",
      visibility: "public",
      type: "text",
      engagement: "low",
      reactions: [
        { type: "like", count: 0 },
        { type: "love", count: 0 },
        { type: "haha", count: 0 },
        { type: "wow", count: 0 },
        { type: "sad", count: 0 },
        { type: "angry", count: 0 },
      ],
      commentCount: 0,
      shares: 0,
      views: 5,
      saved: false,
      trending: false,
      tags: ["RemoteWork", "Productivity", "TechTools"],
      reportCount: 0,
    },
  ]

  // Sample regular posts
  const regularPosts: Post[] = [
    {
      id: "1",
      author: authors.user3,
      content:
        "Breaking: The latest AI model has shown remarkable capabilities in understanding complex human emotions and generating creative content. This breakthrough could revolutionize how we interact with technology in our daily lives. #AI #Technology #Innovation",
      mediaUrl: "/placeholder.svg?height=400&width=600",
      mediaType: "image",
      timestamp: "2025-03-17T10:30:00",
      timeAgo: "2 hours ago",
      status: "published",
      visibility: "public",
      type: "image",
      engagement: "high",
      reactions: [
        { type: "like", count: 845 },
        { type: "love", count: 320 },
        { type: "wow", count: 156 },
        { type: "haha", count: 42 },
        { type: "sad", count: 12 },
        { type: "angry", count: 5 },
      ],
      commentCount: 328,
      shares: 512,
      views: 15420,
      saved: true,
      trending: true,
      tags: ["AI", "Technology", "Innovation"],
      location: "San Francisco, CA",
      comments: [
        {
          id: "c1",
          author: {
            name: "Michael Chen",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "MC",
          },
          content: "This is incredible! Can't wait to see how this technology evolves in the next few years.",
          timestamp: "2025-03-17T11:15:00",
          timeAgo: "1 hour ago",
          likes: 45,
        },
        {
          id: "c2",
          author: {
            name: "Emma Watson",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "EW",
          },
          content: "I'm curious about the ethical implications. How is this being regulated?",
          timestamp: "2025-03-17T11:45:00",
          timeAgo: "45 minutes ago",
          likes: 32,
        },
      ],
      reportCount: 0,
    },
    {
      id: "2",
      author: authors.user1,
      content:
        "Just finished my morning run - 5 miles in 40 minutes! Starting the day with energy and focus. What are your morning routines? #Fitness #MorningRoutine #Wellness",
      timestamp: "2025-03-17T08:15:00",
      timeAgo: "4 hours ago",
      status: "published",
      visibility: "friends",
      type: "text",
      engagement: "medium",
      reactions: [
        { type: "like", count: 65 },
        { type: "love", count: 12 },
        { type: "wow", count: 5 },
        { type: "haha", count: 3 },
        { type: "sad", count: 0 },
        { type: "angry", count: 0 },
      ],
      commentCount: 23,
      shares: 5,
      views: 342,
      saved: false,
      trending: false,
      tags: ["Fitness", "MorningRoutine", "Wellness"],
      location: "Central Park, NY",
      reportCount: 0,
    },
    {
      id: "3",
      author: authors.user4,
      content:
        "BREAKING NEWS: Global leaders have reached a historic climate agreement, pledging to reduce carbon emissions by 50% by 2030. This landmark deal includes major commitments from the world's largest economies and a $100 billion fund to help developing nations transition to clean energy. #ClimateAction #GlobalNews",
      mediaUrl: "/placeholder.svg?height=400&width=600",
      mediaType: "image",
      timestamp: "2025-03-17T07:00:00",
      timeAgo: "5 hours ago",
      status: "published",
      visibility: "public",
      type: "article",
      engagement: "high",
      reactions: [
        { type: "like", count: 1245 },
        { type: "love", count: 876 },
        { type: "wow", count: 543 },
        { type: "haha", count: 32 },
        { type: "sad", count: 124 },
        { type: "angry", count: 78 },
      ],
      commentCount: 782,
      shares: 1524,
      views: 45230,
      saved: true,
      trending: true,
      tags: ["ClimateAction", "GlobalNews", "Environment"],
      reportCount: 0,
    },
  ]

  // Sample reels
  const reelsPosts: Post[] = [
    {
      id: "reel1",
      author: authors.user2,
      content: "Check out my new dance routine! #ReelItFeelIt #Dance",
      mediaUrl: "/placeholder.svg?height=600&width=400",
      mediaType: "reel",
      timestamp: "2025-03-17T12:30:00",
      timeAgo: "30 minutes ago",
      status: "published",
      visibility: "public",
      type: "reel",
      engagement: "high",
      reactions: [
        { type: "like", count: 1245 },
        { type: "love", count: 876 },
        { type: "haha", count: 43 },
        { type: "wow", count: 156 },
        { type: "sad", count: 0 },
        { type: "angry", count: 0 },
      ],
      commentCount: 87,
      shares: 245,
      views: 12450,
      saved: true,
      trending: true,
      tags: ["Dance", "ReelItFeelIt", "Trending"],
      reportCount: 0,
    },
    {
      id: "reel2",
      author: authors.user1,
      content: "Morning coffee vibes ☕ #MorningRoutine #Coffee",
      mediaUrl: "/placeholder.svg?height=600&width=400",
      mediaType: "reel",
      timestamp: "2025-03-17T08:45:00",
      timeAgo: "4 hours ago",
      status: "published",
      visibility: "public",
      type: "reel",
      engagement: "medium",
      reactions: [
        { type: "like", count: 345 },
        { type: "love", count: 123 },
        { type: "haha", count: 5 },
        { type: "wow", count: 12 },
        { type: "sad", count: 0 },
        { type: "angry", count: 0 },
      ],
      commentCount: 23,
      shares: 45,
      views: 3450,
      saved: false,
      trending: false,
      tags: ["Coffee", "MorningRoutine"],
      reportCount: 0,
    },
    {
      id: "reel3",
      author: authors.user5,
      content: "Quick design tip: Use contrast to make your UI elements stand out! #DesignTips #UX",
      mediaUrl: "/placeholder.svg?height=600&width=400",
      mediaType: "reel",
      timestamp: "2025-03-17T07:15:00",
      timeAgo: "5 hours ago",
      status: "published",
      visibility: "public",
      type: "reel",
      engagement: "high",
      reactions: [
        { type: "like", count: 567 },
        { type: "love", count: 234 },
        { type: "haha", count: 12 },
        { type: "wow", count: 45 },
        { type: "sad", count: 0 },
        { type: "angry", count: 0 },
      ],
      commentCount: 56,
      shares: 123,
      views: 7890,
      saved: true,
      trending: false,
      tags: ["DesignTips", "UX"],
      reportCount: 0,
    },
  ]

  // Sample videos
  const videosPosts: Post[] = [
    {
      id: "video1",
      author: authors.user3,
      content: "Full tutorial: How to build a responsive website in 2025 #WebDev #Tutorial",
      mediaUrl: "/placeholder.svg?height=400&width=600",
      mediaType: "video",
      timestamp: "2025-03-16T15:30:00",
      timeAgo: "1 day ago",
      status: "published",
      visibility: "public",
      type: "video",
      engagement: "high",
      reactions: [
        { type: "like", count: 876 },
        { type: "love", count: 234 },
        { type: "haha", count: 12 },
        { type: "wow", count: 98 },
        { type: "sad", count: 0 },
        { type: "angry", count: 0 },
      ],
      commentCount: 156,
      shares: 324,
      views: 8765,
      saved: true,
      trending: false,
      tags: ["WebDev", "Tutorial", "Coding"],
      reportCount: 0,
    },
    {
      id: "video2",
      author: authors.user4,
      content: "Breaking: Exclusive footage of the new city development project #LocalNews #Development",
      mediaUrl: "/placeholder.svg?height=400&width=600",
      mediaType: "video",
      timestamp: "2025-03-15T14:20:00",
      timeAgo: "2 days ago",
      status: "published",
      visibility: "public",
      type: "video",
      engagement: "high",
      reactions: [
        { type: "like", count: 1245 },
        { type: "love", count: 345 },
        { type: "haha", count: 23 },
        { type: "wow", count: 456 },
        { type: "sad", count: 34 },
        { type: "angry", count: 12 },
      ],
      commentCount: 234,
      shares: 567,
      views: 23456,
      saved: true,
      trending: true,
      tags: ["LocalNews", "Development", "CityPlanning"],
      reportCount: 0,
    },
    {
      id: "video3",
      author: authors.user1,
      content: "My full workout routine for building muscle and staying lean #Fitness #Workout",
      mediaUrl: "/placeholder.svg?height=400&width=600",
      mediaType: "video",
      timestamp: "2025-03-14T09:45:00",
      timeAgo: "3 days ago",
      status: "published",
      visibility: "public",
      type: "video",
      engagement: "medium",
      reactions: [
        { type: "like", count: 567 },
        { type: "love", count: 123 },
        { type: "haha", count: 8 },
        { type: "wow", count: 45 },
        { type: "sad", count: 2 },
        { type: "angry", count: 0 },
      ],
      commentCount: 89,
      shares: 134,
      views: 5678,
      saved: false,
      trending: false,
      tags: ["Fitness", "Workout", "Health"],
      reportCount: 0,
    },
  ]

  // Sample reported posts
  const reportedPosts: Post[] = [
    {
      id: "report1",
      author: authors.user2,
      content:
        "This product will cure all your health problems in just 3 days! Click the link in my bio to purchase! #Health #Miracle",
      timestamp: "2025-03-16T13:20:00",
      timeAgo: "1 day ago",
      status: "published",
      visibility: "public",
      type: "text",
      engagement: "medium",
      reactions: [
        { type: "like", count: 45 },
        { type: "love", count: 12 },
        { type: "haha", count: 3 },
        { type: "wow", count: 8 },
        { type: "sad", count: 2 },
        { type: "angry", count: 15 },
      ],
      commentCount: 23,
      shares: 5,
      views: 1245,
      saved: false,
      trending: false,
      tags: ["Health", "Miracle"],
      reportCount: 12,
      reports: [
        {
          userId: "user123",
          reason: "False health claims",
          timestamp: "2025-03-16T14:30:00",
        },
        {
          userId: "user456",
          reason: "Spam",
          timestamp: "2025-03-16T15:45:00",
        },
        {
          userId: "user789",
          reason: "Misleading content",
          timestamp: "2025-03-16T16:20:00",
        },
      ],
    },
    {
      id: "report2",
      author: authors.user5,
      content: "I can't believe what happened at the concert last night! This video shows everything! #Shocking #Viral",
      mediaUrl: "/placeholder.svg?height=400&width=600",
      mediaType: "video",
      timestamp: "2025-03-15T19:45:00",
      timeAgo: "2 days ago",
      status: "published",
      visibility: "public",
      type: "video",
      engagement: "high",
      reactions: [
        { type: "like", count: 234 },
        { type: "love", count: 56 },
        { type: "haha", count: 12 },
        { type: "wow", count: 345 },
        { type: "sad", count: 67 },
        { type: "angry", count: 89 },
      ],
      commentCount: 156,
      shares: 234,
      views: 12345,
      saved: true,
      trending: true,
      tags: ["Shocking", "Viral"],
      reportCount: 8,
      reports: [
        {
          userId: "user234",
          reason: "Violent content",
          timestamp: "2025-03-15T20:15:00",
        },
        {
          userId: "user567",
          reason: "Disturbing imagery",
          timestamp: "2025-03-15T21:30:00",
        },
      ],
    },
    {
      id: "report3",
      author: authors.user1,
      content:
        "This political party is destroying our country! They're all corrupt and should be removed immediately! #Politics #Truth",
      timestamp: "2025-03-14T12:30:00",
      timeAgo: "3 days ago",
      status: "published",
      visibility: "public",
      type: "text",
      engagement: "high",
      reactions: [
        { type: "like", count: 567 },
        { type: "love", count: 123 },
        { type: "haha", count: 45 },
        { type: "wow", count: 67 },
        { type: "sad", count: 89 },
        { type: "angry", count: 234 },
      ],
      commentCount: 345,
      shares: 123,
      views: 8765,
      saved: false,
      trending: true,
      tags: ["Politics", "Truth"],
      reportCount: 15,
      reports: [
        {
          userId: "user345",
          reason: "Political misinformation",
          timestamp: "2025-03-14T13:45:00",
        },
        {
          userId: "user678",
          reason: "Hate speech",
          timestamp: "2025-03-14T14:30:00",
        },
        {
          userId: "user901",
          reason: "Inflammatory content",
          timestamp: "2025-03-14T15:20:00",
        },
      ],
    },
  ]

  // Suspended users
  const suspendedUsers = [authors.user6, authors.user7, authors.user8]

  // Combine all posts
  const allPosts = [...pendingPosts, ...regularPosts, ...reelsPosts, ...videosPosts, ...reportedPosts]

  // Newsfeed metrics
  const newsfeedMetrics = {
    totalPosts: allPosts.length,
    pendingPosts: pendingPosts.length,
    publishedPosts: regularPosts.length,
    reelsPosts: reelsPosts.length,
    videosPosts: videosPosts.length,
    reportedPosts: reportedPosts.length,
    suspendedUsers: suspendedUsers.length,
  }

  // Trending topics
  const trendingTopics: TrendingTopic[] = [
    { id: "t1", name: "AI", count: 12450, trend: "up", percentage: 12 },
    { id: "t2", name: "ClimateAction", count: 9870, trend: "stable", percentage: 0 },
    { id: "t3", name: "WebDev", count: 7650, trend: "down", percentage: -5 },
    { id: "t4", name: "UXDesign", count: 6540, trend: "up", percentage: 8 },
    { id: "t5", name: "RemoteWork", count: 5430, trend: "stable", percentage: 0 },
  ]

  // Content categories
  const contentCategories: ContentCategory[] = [
    { id: "c1", name: "Technology", postCount: 3450, engagement: 78 },
    { id: "c2", name: "Politics", postCount: 2890, engagement: 65 },
    { id: "c3", name: "Sports", postCount: 2340, engagement: 82 },
    { id: "c4", name: "Entertainment", postCount: 1980, engagement: 90 },
    { id: "c5", name: "Health", postCount: 1560, engagement: 70 },
  ]

  // Get filtered posts based on active tab
  const getFilteredPosts = () => {
    switch (activeTab) {
      case "pending":
        return pendingPosts
      case "posts":
        return regularPosts
      case "reels":
        return reelsPosts
      case "videos":
        return videosPosts
      case "reported":
        return reportedPosts
      case "suspended":
        return []
      default:
        return allPosts
    }
  }

  const filteredPosts = getFilteredPosts().filter((post) => {
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        post.content.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.author.username.toLowerCase().includes(query) ||
        (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(query)))
      )
    }

    // Filter by type
    if (filterType !== "all") {
      return post.type === filterType
    }

    return true
  })

  // Handle post selection
  const handlePostSelect = (post: Post) => {
    setSelectedPost(post)
    if (activeTab === "pending") {
      setIsPendingModalOpen(true)
    } else if (activeTab === "reported" && post.reportCount && post.reportCount > 0) {
      setIsReportModalOpen(true)
    } else {
      setShowComments(false)
    }
  }

  // Handle checkbox selection
  const handleCheckboxChange = (postId: string) => {
    setSelectedPosts((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId)
      } else {
        return [...prev, postId]
      }
    })
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredPosts.map((post) => post.id))
    }
  }

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Performing ${action} on posts:`, selectedPosts)
    // In a real app, you would update the posts here
    setSelectedPosts([])
  }

  // Handle post action
  const handlePostAction = (action: string, postId: string) => {
    console.log(`Performing action: ${action} on post: ${postId}`)

    if (action === "edit" && selectedPost) {
      setEditPostContent(selectedPost.content)
      setEditPostVisibility(selectedPost.visibility)
      setIsEditDialogOpen(true)
    } else if (action === "moderate" || action === "approve" || action === "reject") {
      if (selectedPost) {
        setModerationNote("")
        setModerationAction(action === "reject" ? "reject" : "approve")
        setIsModerateDialogOpen(true)
      }
    } else if (action === "suspend" && selectedPost) {
      setSuspensionDays("7")
      setSuspensionReason("")
      setIsSuspendUserDialogOpen(true)
    }
  }

  // Handle new post submission
  const handleNewPostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New post content:", newPostContent)
    // In a real app, you would add the new post to the posts array
    setNewPostContent("")
  }

  // Handle edit post submission
  const handleEditPostSubmit = () => {
    console.log("Edited post content:", editPostContent)
    console.log("Edited post visibility:", editPostVisibility)
    // In a real app, you would update the post in the posts array
    setIsEditDialogOpen(false)
  }

  // Handle moderation submission
  const handleModerationSubmit = () => {
    console.log("Moderation action:", moderationAction)
    console.log("Moderation note:", moderationNote)
    // In a real app, you would update the post status and add the moderation note
    setIsModerateDialogOpen(false)
    setIsPendingModalOpen(false)
  }

  // Handle suspension submission
  const handleSuspensionSubmit = () => {
    console.log("Suspension days:", suspensionDays)
    console.log("Suspension reason:", suspensionReason)
    // In a real app, you would update the user's suspension status
    setIsSuspendUserDialogOpen(false)
    setIsReportModalOpen(false)
  }

  // Toggle comments visibility
  const toggleComments = () => {
    setShowComments(!showComments)
  }

  // Get total reactions count
  const getTotalReactions = (reactions: PostReaction[]) => {
    return reactions.reduce((total, reaction) => total + reaction.count, 0)
  }

  // Get status badge color
  const getStatusBadgeColor = (status: PostStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
      case "published":
        return "bg-green-100 text-green-700 hover:bg-green-100"
      case "rejected":
        return "bg-red-100 text-red-700 hover:bg-red-100"
      case "scheduled":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100"
      case "draft":
        return "bg-gray-100 text-gray-700 hover:bg-gray-100"
      default:
        return "bg-gray-100 text-gray-700 hover:bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      {/* Floating Dock */}
      <div className="sticky z-40 flex">
        <MyFloatingDock />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Time and Date */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Newsfeed Management</h1>
            <p className="text-gray-500 text-sm">Moderate and manage all social media content</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-2xl font-bold text-[#1877F2]">{timeString}</div>
            <div className="text-sm text-gray-500">{dateString}</div>
          </div>
        </div>

        {/* Newsfeed Overview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#1877F2] to-[#0C63D4] rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 text-white">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">Newsfeed Overview</h2>
                  <p className="text-blue-100">Monitor and moderate all social media content</p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-2">
                  <Button className="bg-white text-[#1877F2] hover:bg-blue-50">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                  <Button className="bg-[#0C63D4] text-white hover:bg-[#0A57BE]">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Post
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Total Posts</span>
                  </div>
                  <div className="text-3xl font-bold">{newsfeedMetrics.totalPosts}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+15% this month</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <div className="text-3xl font-bold">{newsfeedMetrics.pendingPosts}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>Needs review</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Posts</span>
                  </div>
                  <div className="text-3xl font-bold">{newsfeedMetrics.publishedPosts}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+8% this week</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Video className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Reels</span>
                  </div>
                  <div className="text-3xl font-bold">{newsfeedMetrics.reelsPosts}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>+25% this week</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Reported</span>
                  </div>
                  <div className="text-3xl font-bold">{newsfeedMetrics.reportedPosts}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>Needs review</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 rounded-full p-2">
                      <Ban className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Suspended</span>
                  </div>
                  <div className="text-3xl font-bold">{newsfeedMetrics.suspendedUsers}</div>
                  <div className="text-blue-100 text-sm mt-1 flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                    <span>Active bans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Post List and Detail - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Create New Post */}
              <div className="p-4 border-b">
                <form onSubmit={handleNewPostSubmit}>
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={authors.user1.avatar} />
                      <AvatarFallback>{authors.user1.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Create a post..."
                        className="min-h-[80px] resize-none rounded-xl"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button type="button" variant="outline" size="sm" className="flex items-center gap-1 rounded-lg">
                        <ImageIcon className="h-4 w-4" />
                        <span>Photo</span>
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="flex items-center gap-1 rounded-lg">
                        <Video className="h-4 w-4" />
                        <span>Video</span>
                      </Button>
                      <Button type="button" variant="outline" size="sm" className="flex items-center gap-1 rounded-lg">
                        <Globe className="h-4 w-4" />
                        <span>Public</span>
                      </Button>
                    </div>
                    <Button type="submit" className="bg-[#1877F2] hover:bg-[#166FE5] rounded-lg">
                      Post
                    </Button>
                  </div>
                </form>
              </div>

              {/* Post Filters */}
              <div className="p-4 border-b">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center">
                    <Checkbox
                      id="select-all"
                      className="mr-2"
                      checked={selectedPosts.length > 0 && selectedPosts.length === filteredPosts.length}
                      onCheckedChange={handleSelectAll}
                    />
                    <div className="flex gap-1">
                      {selectedPosts.length > 0 ? (
                        <>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleBulkAction("approve")}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Approve selected</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleBulkAction("reject")}
                                >
                                  <XCircle className="h-4 w-4 text-red-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Reject selected</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 px-2"
                                  onClick={() => handleBulkAction("delete")}
                                >
                                  <Trash2 className="h-4 w-4 text-gray-600" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete selected</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </>
                      ) : (
                        <Select defaultValue="all" onValueChange={setFilterType}>
                          <SelectTrigger className="w-[180px] h-8 text-xs rounded-lg">
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                            <SelectItem value="reel">Reel</SelectItem>
                            <SelectItem value="article">Article</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search posts..."
                      className="pl-9 bg-gray-50 border-0 rounded-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Post Tabs */}
              <div className="flex border-b overflow-x-auto">
                <Tabs defaultValue="pending" onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full justify-start bg-gray-50 p-0 h-auto">
                    <TabsTrigger
                      value="pending"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#1877F2]"
                    >
                      <Clock className="h-4 w-4" />
                      <span>Pending</span>
                      {pendingPosts.length > 0 && (
                        <Badge className="ml-1 bg-yellow-100 text-yellow-600 hover:bg-yellow-100">
                          {pendingPosts.length}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="posts"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#1877F2]"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Posts</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="reels"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#1877F2]"
                    >
                      <Video className="h-4 w-4" />
                      <span>Reels</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="videos"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#1877F2]"
                    >
                      <Video className="h-4 w-4" />
                      <span>Videos</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="reported"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#1877F2]"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>Reported</span>
                      {reportedPosts.length > 0 && (
                        <Badge className="ml-1 bg-red-100 text-red-600 hover:bg-red-100">{reportedPosts.length}</Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger
                      value="suspended"
                      className="flex items-center gap-2 py-3 px-4 data-[state=active]:bg-white rounded-none border-b-2 border-transparent data-[state=active]:border-[#1877F2]"
                    >
                      <Ban className="h-4 w-4" />
                      <span>Suspended</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Posts List */}
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {activeTab === "suspended" ? (
                  // Suspended users list
                  suspendedUsers.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                        <Ban className="h-6 w-6 text-gray-500" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No suspended users</h3>
                      <p className="text-gray-500">There are currently no suspended users</p>
                    </div>
                  ) : (
                    suspendedUsers.map((user) => (
                      <div key={user.id} className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 mr-2 border">
                                  <AvatarImage src={user.avatar} />
                                  <AvatarFallback>{user.initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="flex items-center">
                                    <span className="font-medium text-gray-900">{user.name}</span>
                                    {user.verified && (
                                      <Badge className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-100">✓</Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <span>{user.username}</span>
                                    <span className="mx-1">•</span>
                                    <span>{user.followers.toLocaleString()} followers</span>
                                  </div>
                                </div>
                              </div>
                              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                Suspended for {user.suspensionDays} days
                              </Badge>
                            </div>
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                              <div className="font-medium mb-1">Suspension Reason:</div>
                              {user.suspensionReason}
                            </div>
                            <div className="flex justify-end mt-3">
                              <Button variant="outline" size="sm" className="mr-2">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit Suspension
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Lift Suspension
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                ) : filteredPosts.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
                      <FileText className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No posts found</h3>
                    <p className="text-gray-500">
                      {searchQuery ? "Try a different search term" : "Your selected category is empty"}
                    </p>
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedPost?.id === post.id ? "bg-blue-50" : ""}`}
                      onClick={() => handlePostSelect(post)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex items-center pt-1">
                          <Checkbox
                            id={`post-${post.id}`}
                            className="mr-2"
                            checked={selectedPosts.includes(post.id)}
                            onCheckedChange={() => handleCheckboxChange(post.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-2 border">
                                <AvatarImage src={post.author.avatar} />
                                <AvatarFallback>{post.author.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center">
                                  <span className="font-medium text-gray-900">{post.author.name}</span>
                                  {post.author.verified && (
                                    <Badge className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-100">✓</Badge>
                                  )}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span>{post.timeAgo}</span>
                                  <span className="mx-1">•</span>
                                  <Badge className={getStatusBadgeColor(post.status)}>
                                    {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                                  </Badge>
                                  {post.visibility === "friends" && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <UserPlus className="h-3 w-3" />
                                    </>
                                  )}
                                  {post.visibility === "private" && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <Lock className="h-3 w-3" />
                                    </>
                                  )}
                                  {post.reportCount && post.reportCount > 0 && (
                                    <>
                                      <span className="mx-1">•</span>
                                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                                        {post.reportCount} {post.reportCount === 1 ? "report" : "reports"}
                                      </Badge>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                {post.status === "pending" && (
                                  <>
                                    <DropdownMenuItem
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handlePostAction("moderate", post.id)
                                      }}
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                      Review
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                  </>
                                )}
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handlePostAction("edit", post.id)
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handlePostAction("delete", post.id)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                                {post.reportCount && post.reportCount > 0 && (
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      handlePostAction("suspend", post.id)
                                    }}
                                  >
                                    <Ban className="h-4 w-4 mr-2 text-red-600" />
                                    Suspend User
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <p className="text-sm text-gray-700 mb-3 line-clamp-3">{post.content}</p>

                          {post.mediaUrl && (
                            <div className="mb-3 rounded-lg overflow-hidden">
                              {post.mediaType === "image" ? (
                                <img
                                  src={post.mediaUrl || "/placeholder.svg"}
                                  alt="Post media"
                                  className="w-full h-auto max-h-[300px] object-cover rounded-lg"
                                />
                              ) : post.mediaType === "reel" ? (
                                <div className="relative bg-gray-100 w-full h-[400px] flex items-center justify-center rounded-lg">
                                  <Video className="h-12 w-12 text-gray-400" />
                                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    Reel
                                  </div>
                                </div>
                              ) : (
                                <div className="relative bg-gray-100 w-full h-[200px] flex items-center justify-center rounded-lg">
                                  <Video className="h-12 w-12 text-gray-400" />
                                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    Video
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Heart className="h-4 w-4 mr-1 text-red-500" />
                                <span>{getTotalReactions(post.reactions).toLocaleString()}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-4 w-4 mr-1 text-blue-500" />
                                <span>{post.commentCount.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center">
                                <Share2 className="h-4 w-4 mr-1 text-green-500" />
                                <span>{post.shares.toLocaleString()}</span>
                              </div>
                              {post.views > 0 && (
                                <div className="flex items-center">
                                  <Eye className="h-4 w-4 mr-1 text-purple-500" />
                                  <span>{post.views.toLocaleString()}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-1">
                              {post.tags?.map((tag, index) => (
                                <Badge key={index} className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Social Media Analytics - Right Side */}
          <div>
            <div className="space-y-6">
              {/* Moderation Stats */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Moderation Stats</h3>
                    <BarChart3 className="h-4 w-4 text-[#1877F2]" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-full h-16">
                      {/* Mini line chart */}
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between h-12 px-2">
                        {[35, 42, 27, 35, 20, 46, 30, 28, 32, 45, 55, 68].map((height, i) => (
                          <div
                            key={i}
                            className="w-[6%] bg-[#1877F2] rounded-t-sm"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500">Approval Rate</div>
                      <div className="text-xl font-bold text-gray-800">86%</div>
                      <div className="text-xs text-green-600">+4%</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500">Avg. Response Time</div>
                      <div className="text-xl font-bold text-gray-800">2.4h</div>
                      <div className="text-xs text-green-600">-15min</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Approved</span>
                      </div>
                      <span className="font-medium">86%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Rejected</span>
                      </div>
                      <span className="font-medium">14%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>Pending</span>
                      </div>
                      <span className="font-medium">{pendingPosts.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trending Topics */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Trending Topics</h3>
                    <TrendingUp className="h-4 w-4 text-[#1877F2]" />
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {trendingTopics.map((topic) => (
                      <div key={topic.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium text-gray-800">#{topic.name}</h4>
                          <Badge
                            className={`${topic.trend === "up" ? "bg-green-100 text-green-700" : topic.trend === "down" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}
                          >
                            {topic.trend === "up" ? "+" : topic.trend === "down" ? "-" : ""}
                            {topic.percentage}%
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">{topic.count.toLocaleString()} posts</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t">
                    <Button variant="ghost" className="text-[#1877F2] text-xs w-full">
                      View All Trends
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Content Categories */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Content Categories</h3>
                    <Filter className="h-4 w-4 text-[#1877F2]" />
                  </div>
                </div>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {contentCategories.map((category) => (
                      <div key={category.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-gray-800">{category.name}</h4>
                          <span className="text-sm text-gray-500">{category.postCount} posts</span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-[#1877F2] h-2.5 rounded-full"
                            style={{ width: `${category.engagement}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{category.engagement}% engagement rate</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Quick Actions</h3>
                    <Settings className="h-4 w-4 text-[#1877F2]" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-[#1877F2] hover:bg-[#166FE5] h-auto py-3 flex flex-col items-center">
                      <Plus className="h-5 w-5 mb-1" />
                      <span>New Post</span>
                    </Button>
                    <Button className="bg-[#1877F2] hover:bg-[#166FE5] h-auto py-3 flex flex-col items-center">
                      <CheckCircle className="h-5 w-5 mb-1" />
                      <span>Review All</span>
                    </Button>
                    <Button className="bg-[#1877F2] hover:bg-[#166FE5] h-auto py-3 flex flex-col items-center">
                      <Users className="h-5 w-5 mb-1" />
                      <span>User Reports</span>
                    </Button>
                    <Button className="bg-[#1877F2] hover:bg-[#166FE5] h-auto py-3 flex flex-col items-center">
                      <BarChart3 className="h-5 w-5 mb-1" />
                      <span>Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Pending Post Modal */}
      <Dialog open={isPendingModalOpen} onOpenChange={setIsPendingModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Review Pending Post</DialogTitle>
            <DialogDescription>Review and approve or reject this post for publication.</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="py-4">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-3 border">
                  <AvatarImage src={selectedPost.author.avatar} />
                  <AvatarFallback>{selectedPost.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{selectedPost.author.name}</span>
                    {selectedPost.author.verified && (
                      <Badge className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-100">✓</Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{selectedPost.timeAgo}</span>
                    <span className="mx-1">•</span>
                    <Badge className={getStatusBadgeColor(selectedPost.status)}>
                      {selectedPost.status.charAt(0).toUpperCase() + selectedPost.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 whitespace-pre-line">{selectedPost.content}</p>
              </div>

              {selectedPost.mediaUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  {selectedPost.mediaType === "image" ? (
                    <img
                      src={selectedPost.mediaUrl || "/placeholder.svg"}
                      alt="Post media"
                      className="w-full h-auto max-h-[400px] object-cover rounded-lg"
                    />
                  ) : selectedPost.mediaType === "reel" ? (
                    <div className="relative bg-gray-100 w-full h-[400px] flex items-center justify-center rounded-lg">
                      <Video className="h-16 w-16 text-gray-400" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Reel
                      </div>
                    </div>
                  ) : (
                    <div className="relative bg-gray-100 w-full h-[300px] flex items-center justify-center rounded-lg">
                      <Video className="h-16 w-16 text-gray-400" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Video
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="grid gap-4 mt-4">
                <div className="grid gap-2">
                  <Label>Moderation Action</Label>
                  <RadioGroup
                    value={moderationAction}
                    onValueChange={(value) => setModerationAction(value as "approve" | "reject")}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="approve" id="approve-modal" />
                      <Label htmlFor="approve-modal" className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Approve
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="reject" id="reject-modal" />
                      <Label htmlFor="reject-modal" className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        Reject
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="moderation-note-modal">Moderation Note</Label>
                  <Textarea
                    id="moderation-note-modal"
                    value={moderationNote}
                    onChange={(e) => setModerationNote(e.target.value)}
                    placeholder="Add a note explaining your decision (optional)"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notify-user-modal" />
                  <Label htmlFor="notify-user-modal">Notify user of decision</Label>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPendingModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleModerationSubmit}
              className={
                moderationAction === "approve" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
              }
            >
              {moderationAction === "approve" ? "Approve Post" : "Reject Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reported Post Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Review Reported Post</DialogTitle>
            <DialogDescription>Review reports and take action on this post.</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <div className="py-4">
              <div className="flex items-center mb-4">
                <Avatar className="h-12 w-12 mr-3 border">
                  <AvatarImage src={selectedPost.author.avatar} />
                  <AvatarFallback>{selectedPost.author.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{selectedPost.author.name}</span>
                    {selectedPost.author.verified && (
                      <Badge className="ml-1 bg-blue-100 text-blue-700 hover:bg-blue-100">✓</Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{selectedPost.timeAgo}</span>
                    <span className="mx-1">•</span>
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                      {selectedPost.reportCount} {selectedPost.reportCount === 1 ? "report" : "reports"}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 whitespace-pre-line">{selectedPost.content}</p>
              </div>

              {selectedPost.mediaUrl && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  {selectedPost.mediaType === "image" ? (
                    <img
                      src={selectedPost.mediaUrl || "/placeholder.svg"}
                      alt="Post media"
                      className="w-full h-auto max-h-[400px] object-cover rounded-lg"
                    />
                  ) : (
                    <div className="relative bg-gray-100 w-full h-[300px] flex items-center justify-center rounded-lg">
                      <Video className="h-16 w-16 text-gray-400" />
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        Video
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Report Details</h4>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="space-y-3">
                    {selectedPost.reports?.map((report, index) => (
                      <div key={index} className="pb-3 border-b border-red-200 last:border-0 last:pb-0">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-red-800">Report #{index + 1}</span>
                          <span className="text-gray-600">User ID: {report.userId}</span>
                        </div>
                        <div className="mt-1 text-sm text-red-700">Reason: {report.reason}</div>
                        <div className="mt-1 text-xs text-gray-500">Reported: {report.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setIsReportModalOpen(false)}>
                    Dismiss Reports
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Post
                  </Button>
                </div>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handlePostAction("suspend", selectedPost.id)}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend User
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Suspend User Dialog */}
      <Dialog open={isSuspendUserDialogOpen} onOpenChange={setIsSuspendUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription>
              {selectedPost &&
                `Suspend ${selectedPost.author.name} (${selectedPost.author.username}) from the platform.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="suspension-days">Suspension Duration (days)</Label>
              <Select value={suspensionDays} onValueChange={setSuspensionDays}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="suspension-reason">Suspension Reason</Label>
              <Textarea
                id="suspension-reason"
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                placeholder="Explain why this user is being suspended"
                className="min-h-[100px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notify-suspension" defaultChecked />
              <Label htmlFor="notify-suspension">Notify user of suspension</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuspendUserDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700" onClick={handleSuspensionSubmit}>
              Suspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>Make changes to the post content and settings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                value={editPostContent}
                onChange={(e) => setEditPostContent(e.target.value)}
                className="min-h-[150px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="visibility">Visibility</Label>
              <RadioGroup
                value={editPostVisibility}
                onValueChange={(value) => setEditPostVisibility(value as PostVisibility)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Public
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="friends" id="friends" />
                  <Label htmlFor="friends" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Friends
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Only me
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPostSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default NewsAdmin