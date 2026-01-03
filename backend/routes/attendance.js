const express = require("express")
const { pool } = require("../server")

const router = express.Router()

// Check in
router.post("/check-in", async (req, res) => {
  try {
    const { employee_id } = req.body

    if (!employee_id) {
      return res.status(400).json({ error: "employee_id is required" })
    }

    // Check if already checked in today
    const existingRecord = await pool.query(
      `
      SELECT * FROM attendance 
      WHERE employee_id = $1 AND attendance_date = CURRENT_DATE
    `,
      [employee_id],
    )

    if (existingRecord.rows.length > 0 && existingRecord.rows[0].check_in_time) {
      return res.status(400).json({ error: "Already checked in today" })
    }

    const result = await pool.query(
      `
      INSERT INTO attendance (employee_id, check_in_time, attendance_date, status)
      VALUES ($1, CURRENT_TIMESTAMP, CURRENT_DATE, 'present')
      ON CONFLICT (employee_id, attendance_date) 
      DO UPDATE SET check_in_time = CURRENT_TIMESTAMP
      RETURNING *
    `,
      [employee_id],
    )

    res.json({
      message: "Checked in successfully",
      attendance: result.rows[0],
    })
  } catch (error) {
    console.error("Check-in error:", error)
    res.status(500).json({ error: "Failed to check in" })
  }
})

// Check out
router.post("/check-out", async (req, res) => {
  try {
    const { employee_id } = req.body

    if (!employee_id) {
      return res.status(400).json({ error: "employee_id is required" })
    }

    // Get today's record
    const record = await pool.query(
      `
      SELECT * FROM attendance 
      WHERE employee_id = $1 AND attendance_date = CURRENT_DATE
    `,
      [employee_id],
    )

    if (record.rows.length === 0) {
      return res.status(400).json({ error: "No check-in record found for today" })
    }

    if (record.rows[0].check_out_time) {
      return res.status(400).json({ error: "Already checked out today" })
    }

    // Calculate work duration
    const checkInTime = new Date(record.rows[0].check_in_time)
    const checkOutTime = new Date()
    const durationMinutes = Math.floor((checkOutTime - checkInTime) / (1000 * 60))

    const result = await pool.query(
      `
      UPDATE attendance 
      SET 
        check_out_time = CURRENT_TIMESTAMP,
        work_duration_minutes = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE employee_id = $2 AND attendance_date = CURRENT_DATE
      RETURNING *
    `,
      [durationMinutes, employee_id],
    )

    res.json({
      message: "Checked out successfully",
      attendance: result.rows[0],
    })
  } catch (error) {
    console.error("Check-out error:", error)
    res.status(500).json({ error: "Failed to check out" })
  }
})

// Get attendance history for employee
router.get("/history/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params
    const { month, year } = req.query

    let query = "SELECT * FROM attendance WHERE employee_id = $1"
    const params = [employee_id]

    if (month && year) {
      query += ` AND EXTRACT(MONTH FROM attendance_date) = $2 AND EXTRACT(YEAR FROM attendance_date) = $3`
      params.push(month, year)
    }

    query += " ORDER BY attendance_date DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Get attendance history error:", error)
    res.status(500).json({ error: "Failed to fetch attendance history" })
  }
})

// Get attendance summary
router.get("/summary/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params

    const result = await pool.query(
      `
      SELECT 
        COUNT(*) as total_days,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
        SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late,
        SUM(CASE WHEN status = 'half_day' THEN 1 ELSE 0 END) as half_day,
        ROUND(AVG(work_duration_minutes)::numeric, 2) as avg_work_duration
      FROM attendance 
      WHERE employee_id = $1 AND attendance_date >= DATE_TRUNC('month', CURRENT_DATE)
    `,
      [employee_id],
    )

    res.json(result.rows[0])
  } catch (error) {
    console.error("Get attendance summary error:", error)
    res.status(500).json({ error: "Failed to fetch attendance summary" })
  }
})

module.exports = router
