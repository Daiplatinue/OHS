import express from 'express';
import { connectToDatabase } from '../lib/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [existingUser] = await db.query('SELECT * FROM acc_tb WHERE u_email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO acc_tb (u_username, u_email ,u_password) VALUES (?, ?, ?)",
            [username, email, hashPassword]);

        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await connectToDatabase();
        const [user] = await db.query('SELECT * FROM acc_tb WHERE u_email = ?', [email]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user[0].u_password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user[0].u_id },
            process.env.JWT_KEY,
            { expiresIn: '3h' }
        );

        return res.status(200).json({
            token,
            user: {
                id: user[0].u_id,
                username: user[0].username,
                email: user[0].u_email
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(403).json({ message: "No token provided" });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.id;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [user] = await db.query('SELECT u_id, username, u_email FROM acc_tb WHERE u_id = ?', [req.userId]);

        if (user.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ user: user[0] });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

export default router;