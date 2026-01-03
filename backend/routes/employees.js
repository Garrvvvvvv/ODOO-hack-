const express = require("express")
const { pool } = require("../server")

const router = express.Router()

// Get all employees
router.get("/", async (req, res) => {
  try {
    const { department, status, search } = req.query
    let query = `
      SELECT e.*, u.email, u.full_name 
      FROM employees e 
      JOIN users u ON e.user_id = u.id 
      WHERE 1=1
    `
    const params = []
    let paramCount = 1

    if (department) {
      query += ` AND e.department = $${paramCount}`
      params.push(department)
      paramCount++
    }

    if (status) {
      query += ` AND e.status = $${paramCount}`
      params.push(status)
      paramCount++
    }

    if (search) {
      query += ` AND (u.full_name ILIKE $${paramCount} OR e.employee_id ILIKE $${paramCount} OR u.email ILIKE $${paramCount})`
      params.push(`%${search}%`)
      paramCount++
    }

    query += " ORDER BY e.created_at DESC"

    const result = await pool.query(query, params)
    res.json(result.rows)
  } catch (error) {
    console.error("Get employees error:", error)
    res.status(500).json({ error: "Failed to fetch employees" })
  }
})

// Get employee by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const result = await pool.query(
      `
      SELECT e.*, u.email, u.full_name 
      FROM employees e 
      JOIN users u ON e.user_id = u.id 
      WHERE e.id = $1
    `,
      [id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" })
    }

    const employee = result.rows[0]

    // Get attendance summary
    const attendanceSummary = await pool.query(
      `
      SELECT 
        COUNT(*) as total_days,
        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent,
        SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late,
        SUM(CASE WHEN status = 'half_day' THEN 1 ELSE 0 END) as half_day
      FROM attendance 
      WHERE employee_id = $1 AND attendance_date >= DATE_TRUNC('month', CURRENT_DATE)
    `,
      [id],
    )

    res.json({
      ...employee,
      attendance_summary: attendanceSummary.rows[0],
    })
  } catch (error) {
    console.error("Get employee error:", error)
    res.status(500).json({ error: "Failed to fetch employee" })
  }
})

// Create new employee
router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      employee_id,
      department,
      position,
      date_of_birth,
      phone,
      address,
      city,
      state,
      zip_code,
      country,
      joining_date,
      base_salary,
      salary_currency,
    } = req.body

    if (!user_id || !employee_id) {
      return res.status(400).json({ error: "user_id and employee_id are required" })
    }

    const result = await pool.query(
      `
      INSERT INTO employees (
        user_id, employee_id, department, position, date_of_birth, 
        phone, address, city, state, zip_code, country, joining_date, 
        base_salary, salary_currency
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `,
      [
        user_id,
        employee_id,
        department,
        position,
        date_of_birth,
        phone,
        address,
        city,
        state,
        zip_code,
        country,
        joining_date,
        base_salary,
        salary_currency,
      ],
    )

    res.status(201).json({
      message: "Employee created successfully",
      employee: result.rows[0],
    })
  } catch (error) {
    console.error("Create employee error:", error)
    res.status(500).json({ error: "Failed to create employee" })
  }
})

// Update employee
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { department, position, phone, address, city, state, zip_code, country, base_salary, status } = req.body

    const result = await pool.query(
      `
      UPDATE employees 
      SET 
        department = COALESCE($1, department),
        position = COALESCE($2, position),
        phone = COALESCE($3, phone),
        address = COALESCE($4, address),
        city = COALESCE($5, city),
        state = COALESCE($6, state),
        zip_code = COALESCE($7, zip_code),
        country = COALESCE($8, country),
        base_salary = COALESCE($9, base_salary),
        status = COALESCE($10, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *
    `,
      [department, position, phone, address, city, state, zip_code, country, base_salary, status, id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" })
    }

    res.json({
      message: "Employee updated successfully",
      employee: result.rows[0],
    })
  } catch (error) {
    console.error("Update employee error:", error)
    res.status(500).json({ error: "Failed to update employee" })
  }
})

// Delete employee
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query("DELETE FROM employees WHERE id = $1 RETURNING id", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" })
    }

    res.json({ message: "Employee deleted successfully" })
  } catch (error) {
    console.error("Delete employee error:", error)
    res.status(500).json({ error: "Failed to delete employee" })
  }
})

module.exports = router
