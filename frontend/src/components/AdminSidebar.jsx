import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../utils/auth';
import toast from 'react-hot-toast';

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully 👋');
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="p-5 border-b dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Admin Panel
        </h2>
      </div>

      <nav className="p-4 space-y-3">
        <Link
          to="/admin/dashboard"
          className="block px-4 py-2 rounded hover:bg-pink-600 hover:text-white"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/admin/products"
          className="block px-4 py-2 rounded hover:bg-pink-600 hover:text-white"
        >
          🧴 Products
        </Link>

        <Link
          to="/admin/orders"
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
    </aside>
  );
}
