-- Create approvals table
CREATE TABLE approvals (
  id SERIAL PRIMARY KEY,
  request_type VARCHAR(50) NOT NULL, -- leave, document, expense, promotion
  request_id INTEGER NOT NULL,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  assigned_to INTEGER NOT NULL REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'pending', -- pending, approved, rejected
  comments TEXT,
  approval_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_approvals_employee_id ON approvals(employee_id);
CREATE INDEX idx_approvals_assigned_to ON approvals(assigned_to);
CREATE INDEX idx_approvals_status ON approvals(status);
CREATE INDEX idx_approvals_type ON approvals(request_type);
