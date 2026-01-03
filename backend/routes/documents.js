const express = require("express")
const { pool } = require("../server")

const router = express.Router()

// Upload document
router.post("/", async (req, res) => {
  try {
    const { employee_id, document_name, document_type, file_url, file_size, uploaded_by, expiry_date } = req.body

    if (!employee_id || !document_name || !file_url) {
      return res.status(400).json({ error: "employee_id, document_name, and file_url are required" })
    }

    const result = await pool.query(
      `
      INSERT INTO documents (employee_id, document_name, document_type, file_url, file_size, uploaded_by, expiry_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
      [employee_id, document_name, document_type, file_url, file_size, uploaded_by, expiry_date],
    )

    res.status(201).json({
      message: "Document uploaded successfully",
      document: result.rows[0],
    })
  } catch (error) {
    console.error("Upload document error:", error)
    res.status(500).json({ error: "Failed to upload document" })
  }
})

// Get documents for employee
router.get("/employee/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params
    const { document_type } = req.query

    let query = "SELECT * FROM documents WHERE employee_id = $1"
    const params = [employee_id]

    if (document_type) {
      query += ` AND document_type = $2`
      params.push(document_type)
    }

    query += " ORDER BY created_at DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Get documents error:", error)
    res.status(500).json({ error: "Failed to fetch documents" })
  }
})

// Get all documents
router.get("/", async (req, res) => {
  try {
    const { document_type, employee_id, search } = req.query

    let query = `
      SELECT d.*, e.employee_id, u.full_name
      FROM documents d
      JOIN employees e ON d.employee_id = e.id
      JOIN users u ON e.user_id = u.id
      WHERE 1=1
    `
    const params = []
    let paramCount = 1

    if (document_type) {
      query += ` AND d.document_type = $${paramCount}`
      params.push(document_type)
      paramCount++
    }

    if (employee_id) {
      query += ` AND d.employee_id = $${paramCount}`
      params.push(employee_id)
      paramCount++
    }

    if (search) {
      query += ` AND (d.document_name ILIKE $${paramCount} OR u.full_name ILIKE $${paramCount})`
      params.push(`%${search}%`)
      paramCount++
    }

    query += " ORDER BY d.created_at DESC"

    const result = await pool.query(query, params)

    res.json(result.rows)
  } catch (error) {
    console.error("Get all documents error:", error)
    res.status(500).json({ error: "Failed to fetch documents" })
  }
})

// Delete document
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query("DELETE FROM documents WHERE id = $1 RETURNING id", [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Document not found" })
    }

    res.json({ message: "Document deleted successfully" })
  } catch (error) {
    console.error("Delete document error:", error)
    res.status(500).json({ error: "Failed to delete document" })
  }
})

module.exports = router
