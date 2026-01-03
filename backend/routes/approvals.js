const express = require("express")
const { pool } = require("../server")

const router = express.Router()

// Create approval request
router.post("/", async (req, res) => {
  try {
    const { request_type, request_id, employee_id, assigned_to } = req.body

    if (!request_type || !request_id || !employee_id || !assigned_to) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const result = await pool.query(
      `
      INSERT INTO approvals (request_type, request_id, employee_id, assigned_to, status)
      VALUES ($1, $2, $3, $4, 'pending')
      RETURNING *
    `,
      [request_type, request_id, employee_id, assigned_to],
    )

    res.status(201).json({
      message: "Approval request created",
      approval: result.rows[0],
    })
  } catch (error) {
    console.error("Create approval error:", error)
    res.status(500).json({ error: "Failed to create approval request" })
  }
})

// Get approvals for user
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params
    const { status } = req.query

    let query = `
      SELECT a.*, u.full_name as employee_name, e.department
      FROM approvals a
      JOIN employees e ON a.employee_id = e.id
      JOIN users u ON e.user_id = u.id
      WHERE a.assigned_to = $1
    `
    const params = [user_id]

    if (status) {
      query += ` AND a.status = $2`
      params.push(status)
    }

    query += " ORDER BY a.created_at DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Get approvals error:", error)
    res.status(500).json({ error: "Failed to fetch approvals" })
  }
})

// Get all pending approvals
router.get("/pending", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT a.*, u.full_name as employee_name, e.department, au.full_name as assigned_to_name
      FROM approvals a
      JOIN employees e ON a.employee_id = e.id
      JOIN users u ON e.user_id = u.id
      JOIN users au ON a.assigned_to = au.id
      WHERE a.status = 'pending'
      ORDER BY a.created_at ASC
    `,
    )

    res.json(result.rows)
  } catch (error) {
    console.error("Get pending approvals error:", error)
    res.status(500).json({ error: "Failed to fetch pending approvals" })
  }
})

// Approve or reject request
router.put("/:id/decide", async (req, res) => {
  try {
    const { id } = req.params
    const { status, comments } = req.body

    if (!status || !["approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Valid status (approved/rejected) is required" })
    }

    const result = await pool.query(
      `
      UPDATE approvals 
      SET 
        status = $1,
        comments = COALESCE($2, comments),
        approval_date = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `,
      [status, comments, id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Approval request not found" })
    }

    res.json({
      message: `Request ${status}`,
      approval: result.rows[0],
    })
  } catch (error) {
    console.error("Decide approval error:", error)
    res.status(500).json({ error: "Failed to process approval" })
  }
})

// Get approvals by type
router.get("/type/:type", async (req, res) => {
  try {
    const { type } = req.params
    const { status } = req.query

    let query = `
      SELECT a.*, u.full_name as employee_name, e.department
      FROM approvals a
      JOIN employees e ON a.employee_id = e.id
      JOIN users u ON e.user_id = u.id
      WHERE a.request_type = $1
    `
    const params = [type]

    if (status) {
      query += ` AND a.status = $2`
      params.push(status)
    }

    query += " ORDER BY a.created_at DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Get approvals by type error:", error)
    res.status(500).json({ error: "Failed to fetch approvals" })
  }
})

module.exports = router
