import pool from "../lib/db.js"

export const saveMessage = async (message) => {
  try {
    const roomValue = message.room || "private"

    const [result] = await pool.query(
      "INSERT INTO messages (id, text, sender, sender_id, receiver_id, room, timestamp, is_private) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        message.id,
        message.text,
        message.sender,
        message.sender_id,
        message.receiver_id || null,
        roomValue, 
        message.timestamp,
        message.isPrivate || false,
      ],
    )
    return result
  } catch (error) {
    console.error("Error saving message:", error)
    throw error
  }
}

export const getMessagesByRoom = async (room) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM messages WHERE room = ? AND is_private = FALSE ORDER BY timestamp ASC LIMIT 100",
      [room],
    )
    return rows
  } catch (error) {
    console.error("Error getting messages by room:", error)
    throw error
  }
}

export const getPrivateMessages = async (user1Id, user2Id) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM messages 
       WHERE ((sender_id = ? AND receiver_id = ?) 
       OR (sender_id = ? AND receiver_id = ?)) 
       AND is_private = TRUE 
       ORDER BY timestamp ASC 
       LIMIT 100`,
      [user1Id, user2Id, user2Id, user1Id],
    )
    return rows
  } catch (error) {
    console.error("Error getting private messages:", error)
    throw error
  }
}

export const getRecentMessages = async (limit = 50) => {
  try {
    const [rows] = await pool.query("SELECT * FROM messages ORDER BY timestamp DESC LIMIT ?", [limit])
    return rows
  } catch (error) {
    console.error("Error getting recent messages:", error)
    throw error
  }
}