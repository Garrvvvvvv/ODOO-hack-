const express = require("express")
const { pool } = require("../server")

const router = express.Router()

// Create payroll entry
router.post("/", async (req, res) => {
  try {
    const { employee_id, payroll_date, basic_salary, allowances, deductions, tax } = req.body

    if (!employee_id || !payroll_date) {
      return res.status(400).json({ error: "employee_id and payroll_date are required" })
    }

    // Calculate net salary
    const allowances_val = allowances || 0
    const deductions_val = deductions || 0
    const tax_val = tax || 0
    const net_salary = basic_salary + allowances_val - deductions_val - tax_val

    const result = await pool.query(
      `
      INSERT INTO payroll (employee_id, payroll_date, basic_salary, allowances, deductions, tax, net_salary, payment_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
      RETURNING *
    `,
      [employee_id, payroll_date, basic_salary, allowances_val, deductions_val, tax_val, net_salary],
    )

    res.status(201).json({
      message: "Payroll entry created",
      payroll: result.rows[0],
    })
  } catch (error) {
    console.error("Create payroll error:", error)
    res.status(500).json({ error: "Failed to create payroll entry" })
  }
})

// Get payroll for employee
router.get("/employee/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params
    const { month, year } = req.query

    let query = "SELECT * FROM payroll WHERE employee_id = $1"
    const params = [employee_id]

    if (month && year) {
      query += ` AND EXTRACT(MONTH FROM payroll_date) = $2 AND EXTRACT(YEAR FROM payroll_date) = $3`
      params.push(month, year)
    }

    query += " ORDER BY payroll_date DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Get payroll error:", error)
    res.status(500).json({ error: "Failed to fetch payroll" })
  }
})

// Get all payroll entries
router.get("/", async (req, res) => {
  try {
    const { status, month, year } = req.query

    let query = `
      SELECT p.*, e.employee_id, u.full_name, e.department
      FROM payroll p
      JOIN employees e ON p.employee_id = e.id
      JOIN users u ON e.user_id = u.id
      WHERE 1=1
    `
    const params = []
    let paramCount = 1

    if (status) {
      query += ` AND p.payment_status = $${paramCount}`
      params.push(status)
      paramCount++
    }

    if (month && year) {
      query += ` AND EXTRACT(MONTH FROM p.payroll_date) = $${paramCount} AND EXTRACT(YEAR FROM p.payroll_date) = $${paramCount + 1}`
      params.push(month, year)
      paramCount += 2
    }

    query += " ORDER BY p.payroll_date DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Get all payroll error:", error)
    res.status(500).json({ error: "Failed to fetch payroll entries" })
  }
})

// Update payroll status
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { payment_status, payment_method, payment_date } = req.body

    const result = await pool.query(
      `
      UPDATE payroll 
      SET 
        payment_status = COALESCE($1, payment_status),
        payment_method = COALESCE($2, payment_method),
        payment_date = COALESCE($3, payment_date),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
    `,
      [payment_status, payment_method, payment_date, id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Payroll entry not found" })
    }

    res.json({
      message: "Payroll updated successfully",
      payroll: result.rows[0],
    })
  } catch (error) {
    console.error("Update payroll error:", error)
    res.status(500).json({ error: "Failed to update payroll" })
  }
})

// Get payroll summary
router.get("/summary/monthly", async (req, res) => {
  try {
    const { year } = req.query
    const currentYear = year || new Date().getFullYear()

    const result = await pool.query(
      `
      SELECT 
        EXTRACT(MONTH FROM payroll_date) as month,
        COUNT(*) as total_employees,
        SUM(net_salary) as total_payroll,
        SUM(basic_salary) as total_basic,
        SUM(allowances) as total_allowances,
        SUM(deductions) as total_deductions,
        SUM(tax) as total_tax
      FROM payroll
      WHERE EXTRACT(YEAR FROM payroll_date) = $1
      GROUP BY EXTRACT(MONTH FROM payroll_date)
      ORDER BY EXTRACT(MONTH FROM payroll_date)
    `,
      [currentYear],
    )

    res.json(result.rows)
  } catch (error) {
    console.error("Get payroll summary error:", error)
    res.status(500).json({ error: "Failed to fetch payroll summary" })
  }
})

module.exports = router
