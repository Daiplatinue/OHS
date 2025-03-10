import express from "express"
import pool from "../lib/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body
  try {
    const [existingUsers] = await pool.query("SELECT * FROM acc_tb WHERE u_email = ?", [email])
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    await pool.query("INSERT INTO acc_tb (u_username, u_email, u_password) VALUES (?, ?, ?)", [
      username,
      email,
      hashPassword,
    ])

    return res.status(201).json({ message: "User created successfully" })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error" })
  }
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const [users] = await pool.query("SELECT * FROM acc_tb WHERE u_email = ?", [email])

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    const user = users[0]

    const isMatch = await bcrypt.compare(password, user.u_password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ id: user.u_id }, process.env.JWT_KEY, { expiresIn: "3h" })

    return res.status(200).json({
      token,
      user: {
        id: user.u_id,
        username: user.u_username, 
        email: user.u_email,
      },
    })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error" })
  }
})

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"]
    if (!authHeader) {
      return res.status(403).json({ message: "No token provided" })
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userId = decoded.id
    next()
  } catch (err) {
    console.error(err)
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

router.get("/home", verifyToken, async (req, res) => {
  try {
    const [users] = await pool.query("SELECT u_id, u_username, u_email FROM acc_tb WHERE u_id = ?", [req.userId])

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ user: users[0] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error" })
  }
})

router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id
    const [users] = await pool.query("SELECT u_id, u_username, u_email FROM acc_tb WHERE u_id = ?", [userId])

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ user: users[0] })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: "Server error" })
  }
})

export default router