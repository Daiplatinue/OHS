import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Connect to database
export const connectDB = async () => {
  try {
    const connection = await pool.getConnection()
    console.log("MySQL Database connected")
    connection.release()
  } catch (error) {
    console.error("Database connection failed:", error)
    process.exit(1)
  }
}

export default pool