const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [
            email,
        ]);
        if (user.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `
            INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email
            `,
            [username, email, hashPassword],
        );
        const token = jwt.sign(
            {
                id: result.rows[0].id,
                email: result.rows[0].email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
        );
        res.status(200).json({
            message: "User registered successfully",
            user: result.rows[0],
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await pool.query(`SELECT * FROM users WHERE email = $1`, [
            email,
        ]);

        if (user.rows.length === 0) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: user.rows[0].id,
                email: user.rows[0].email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
        );
        res.cookie("token", token);

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user.rows[0].id,
                username: user.rows[0].username,
                email: user.rows[0].email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
}

async function getMe(req, res) {
    try {
        const user = await pool.query(
            `
            SELECT id, username, email FROM users WHERE id = $1
            `,
            [req.user.id],
        );
        res.status(200).json({
            message: "User found",
            user: user.rows[0],
        });
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
}

async function logout(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({
            message: "No token found",
        });
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "Logout successful",
    });
}

module.exports = {
    register,
    login,
    getMe,
    logout,
};
