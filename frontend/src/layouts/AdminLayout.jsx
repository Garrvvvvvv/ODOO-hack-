import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-black text-white flex gap-4">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/leaves">Leave Approvals</Link>
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
