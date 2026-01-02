import { Outlet, Link } from "react-router-dom";

export default function EmployeeLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4 bg-blue-600 text-white flex gap-4">
        <Link to="/employee">Dashboard</Link>
        <Link to="/employee/leave">Apply Leave</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
