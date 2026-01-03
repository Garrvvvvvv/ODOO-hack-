-- Create payroll table
CREATE TABLE payroll (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  payroll_date DATE NOT NULL,
  basic_salary DECIMAL(12, 2),
  allowances DECIMAL(12, 2) DEFAULT 0,
  deductions DECIMAL(12, 2) DEFAULT 0,
  tax DECIMAL(12, 2) DEFAULT 0,
  net_salary DECIMAL(12, 2),
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed
  payment_method VARCHAR(50), -- bank_transfer, cheque, cash
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payroll_employee_id ON payroll(employee_id);
CREATE INDEX idx_payroll_date ON payroll(payroll_date);
CREATE INDEX idx_payroll_status ON payroll(payment_status);
