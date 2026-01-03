const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { Pool } = require("pg")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Verify pool connection
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
})

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Access token required" })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" })
    }
    req.user = user
    next()
  })
}

// Routes
const authRoutes = require("./routes/auth")
const employeeRoutes = require("./routes/employees")
const attendanceRoutes = require("./routes/attendance")
const leaveRoutes = require("./routes/leaves")
const payrollRoutes = require("./routes/payroll")
const documentRoutes = require("./routes/documents")
const approvalRoutes = require("./routes/approvals")

app.use("/api/auth", authRoutes)
app.use("/api/employees", authenticateToken, employeeRoutes)
app.use("/api/attendance", authenticateToken, attendanceRoutes)
app.use("/api/leaves", authenticateToken, leaveRoutes)
app.use("/api/payroll", authenticateToken, payrollRoutes)
app.use("/api/documents", authenticateToken, documentRoutes)
app.use("/api/approvals", authenticateToken, approvalRoutes)

// Export pool for use in routes
module.exports = { app, pool }

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Dayflow HR Backend running on port ${PORT}`)
})
