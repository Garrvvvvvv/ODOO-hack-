-- Create employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) UNIQUE NOT NULL,
  department VARCHAR(100),
  position VARCHAR(100),
  date_of_birth DATE,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(100),
  zip_code VARCHAR(20),
  country VARCHAR(100),
  joining_date DATE NOT NULL,
  salary_currency VARCHAR(10) DEFAULT 'USD',
  base_salary DECIMAL(12, 2),
  status VARCHAR(50) DEFAULT 'active', -- active, inactive, on_leave
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_employees_user_id ON employees(user_id);
CREATE INDEX idx_employees_department ON employees(department);
CREATE INDEX idx_employees_status ON employees(status);
