import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import toast from 'react-hot-toast';

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully 👋');
    navigate('/admin/login', { replace: true });
  };
  return (
    <div
      className={`
        fixed md:static top-0 left-0 h-full z-50
        w-64 bg-white border-r
        transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}
    >
      <button
        className="md:hidden p-2 w-full text-right"
        onClick={() => setSidebarOpen(false)}
      >
        ✕
      </button>

      <nav className="p-4 space-y-3">
        <Link
          to="/admin/dashboard"
          onClick={() => setSidebarOpen(false)}
          className="block px-4 py-2 rounded hover:bg-pink-600 hover:text-white"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/products"
          onClick={() => setSidebarOpen(false)}
          className="block px-4 py-2 rounded hover:bg-pink-600 hover:text-white"
        >
          🧴 Products
        </Link>

        <Link
          to="/admin/orders"
          onClick={() => setSidebarOpen(false)}
          className="block px-4 py-2 rounded hover:bg-pink-600 hover:text-white"
        >
          📦 Orders
        </Link>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded text-red-500 hover:bg-red-500 hover:text-white"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
}
