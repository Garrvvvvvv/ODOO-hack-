const express = require("express")
const { pool } = require("../server")

const router = express.Router()

// Request leave
router.post("/", async (req, res) => {
  try {
    const { employee_id, leave_type, start_date, end_date, reason } = req.body

    if (!employee_id || !leave_type || !start_date || !end_date) {
      return res.status(400).json({ error: "All fields are required" })
    }

    const result = await pool.query(
      `
      INSERT INTO leaves (employee_id, leave_type, start_date, end_date, reason, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *
    `,
      [employee_id, leave_type, start_date, end_date, reason],
    )

    res.status(201).json({
      message: "Leave request submitted",
      leave: result.rows[0],
    })
  } catch (error) {
    console.error("Create leave error:", error)
    res.status(500).json({ error: "Failed to request leave" })
  }
})

// Get leaves for employee
router.get("/employee/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params
    const { status } = req.query

    let query = "SELECT * FROM leaves WHERE employee_id = $1"
    const params = [employee_id]

    if (status) {
      query += ` AND status = $2`
      params.push(status)
    }

    query += " ORDER BY start_date DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Get leaves error:", error)
    res.status(500).json({ error: "Failed to fetch leaves" })
  }
})

// Get all pending leaves for approval
router.get("/pending", async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT l.*, e.id as emp_id, u.full_name, e.department
      FROM leaves l
      JOIN employees e ON l.employee_id = e.id
      JOIN users u ON e.user_id = u.id
      WHERE l.status = 'pending'
      ORDER BY l.created_at DESC
    `,
    )

    res.json(result.rows)
  } catch (error) {
    console.error("Get pending leaves error:", error)
    res.status(500).json({ error: "Failed to fetch pending leaves" })
  }
})

// Approve/Reject leave
router.put("/:id/approve", async (req, res) => {
  try {
    const { id } = req.params
    const { status, approved_by } = req.body

    if (!status || !approved_by) {
      return res.status(400).json({ error: "status and approved_by are required" })
    }

    const result = await pool.query(
      `
      UPDATE leaves 
      SET 
        status = $1,
        approved_by = $2,
        approval_date = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING *
    `,
      [status, approved_by, id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Leave request not found" })
    }

    res.json({
      message: `Leave ${status}`,
      leave: result.rows[0],
    })
  } catch (error) {
    console.error("Approve leave error:", error)
    res.status(500).json({ error: "Failed to approve leave" })
  }
})

module.exports = router
