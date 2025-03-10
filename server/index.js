import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import authRouter from "./routes/authRoutes.js"
import { connectDB } from "./lib/db.js"
import { saveMessage, getPrivateMessages } from "./models/MessageModel.js"
import dotenv from "dotenv"
import { v4 as uuidv4 } from "uuid"
import jwt from "jsonwebtoken"

dotenv.config()

const app = express()
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  }),
)
app.use(express.json())
app.use("/auth", authRouter)

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

connectDB()

const users = {}

io.use((socket, next) => {
  const { token, username, userId } = socket.handshake.auth

  console.log("Socket auth:", { username, userId })

  if (!username) {
    return next(new Error("Username is required"))
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY)
      socket.user = { id: decoded.id, username }
      console.log("Authenticated socket user:", socket.user)
    } catch (err) {
      console.error("Token verification failed:", err)
    }
  }

  next()
})

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`)

  const { username, userId } = socket.handshake.auth
  const existingUserSocket = Object.values(users).find((user) => user.id === userId)
  if (existingUserSocket) {
    delete users[existingUserSocket.socketId]
  }

  users[socket.id] = {
    id: userId || socket.id,
    username,
    socketId: socket.id,
  }

  io.emit(
    "users_update",
    Object.values(users).reduce((unique, user) => {
      if (!unique.some((u) => u.id === user.id)) {
        unique.push(user)
      }
      return unique
    }, []),
  )

  socket.on("send_private_message", async (messageData, callback) => {
    try {
      const { text, sender_id, receiver_id } = messageData

      if (!text || !sender_id || !receiver_id) {
        return callback({
          success: false,
          error: "Missing required fields",
        })
      }

      const receiverSocket = Object.values(users).find((user) => user.id === receiver_id)

      const message = {
        id: uuidv4(),
        text,
        sender_id,
        receiver_id,
        sender: users[socket.id].username,
        room: "private",
        timestamp: new Date(),
        isPrivate: true,
      }

      await saveMessage(message)

      if (receiverSocket) {
        socket.to(receiverSocket.socketId).emit("private_message", message)
      }

      callback({ success: true, message })
    } catch (error) {
      console.error("Error sending private message:", error)
      callback({ success: false, error: "Failed to send message" })
    }
  })

  socket.on("get_private_message_history", async ({ userId }, callback) => {
    try {
      const currentUserId = users[socket.id].id

      if (!currentUserId || !userId) {
        return callback({
          success: false,
          error: "Missing user IDs",
        })
      }

      const messages = await getPrivateMessages(currentUserId, userId)

      callback({
        success: true,
        messages,
        userId,
      })

      socket.emit("private_message_history", {
        userId,
        messages,
      })
    } catch (error) {
      console.error("Error getting private message history:", error)
      callback({ success: false, error: "Failed to get message history" })
    }
  })

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`)
    delete users[socket.id]
    io.emit("users_update", Object.values(users))
  })
})

app.get("/", (req, res) => {
  res.send("Socket.IO Chat Server is running")
})

const PORT = process.env.PORT || 3006
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})