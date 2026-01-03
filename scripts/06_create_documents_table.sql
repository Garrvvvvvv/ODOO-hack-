-- Create documents table
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  document_name VARCHAR(255) NOT NULL,
  document_type VARCHAR(100), -- id_proof, address_proof, qualification, contract, etc
  file_url VARCHAR(500),
  file_size INTEGER,
  uploaded_by INTEGER REFERENCES users(id),
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_employee_id ON documents(employee_id);
CREATE INDEX idx_documents_type ON documents(document_type);
