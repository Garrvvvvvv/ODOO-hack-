const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { pool } = require("../server")

const router = express.Router()

// Register endpoint
router.post("/register", async (req, res) => {
  const { email, password, full_name, role = "employee" } = req.body

  try {
    // Validate input
    if (!email || !password || !full_name) {
      return res.status(400).json({ error: "Email, password, and full name are required" })
    }

    // Check if user exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: "User already exists" })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const password_hash = await bcrypt.hash(password, salt)

    // Insert user
    const result = await pool.query(
      "INSERT INTO users (email, password_hash, full_name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, full_name, role",
      [email, password_hash, full_name, role],
    )

    const user = result.rows[0]

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })

    res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Registration failed" })
  }
})

// Login endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    // Find user
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    const user = result.rows[0]

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" })
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    })

    res.json({
      message: "Login successful",
      user: { id: user.id, email: user.email, full_name: user.full_name, role: user.role },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ error: "Login failed" })
  }
})

// Get current user endpoint
router.get("/me", (req, res) => {
  // This uses the authenticateToken middleware
  res.json({ user: req.user })
})

module.exports = router
