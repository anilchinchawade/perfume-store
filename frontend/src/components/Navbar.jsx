import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { isTokenValid, logout } from '../utils/auth';
import { useCart } from '../context/useCart';

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { cartItems } = useCart();
  const isAdmin = isTokenValid();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };
  return (
    // <nav className="bg-white shadow-md">
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Perfume<span className="text-pink-600">Store</span>
        </Link>

        <div className="hidden md:flex gap-6">
          <Link
            to="/"
            className="px-3 py-2 rounded-md hover:bg-pink-100 transition"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="px-3 py-2 rounded-md hover:bg-pink-100 transition"
          >
            Cart ({cartItems.length})
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <Link
            to="/"
            className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="px-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Cart
          </Link>
          {/* <Link to="/orders" className="text-sm hover:text-pink-600">
            My Orders
          </Link> */}
        </div>
      )}

      {isTokenValid() && (
        <>
          <Link
            to="/admin/products"
            className="px-3 py-2 rounded-md hover:bg-pink-100 transition"
          >
            Admin Products
          </Link>

          <Link
            to="/admin/orders"
            className="px-3 py-2 rounded-md hover:bg-pink-100 transition"
          >
            Orders
          </Link>
          <Link
            to="/admin/dashboard"
            className="px-3 py-2 rounded-md hover:bg-pink-100 transition"
          >
            Dashboard
          </Link>
          {/* LOGOUT */}
          <Link
            to="/admin/login"
            onClick={(e) => {
              e.preventDefault(); // ⛔ stop default navigation
              handleLogout(); // ✅ clear token + redirect
            }}
            className="px-3 py-2 rounded-md hover:bg-pink-100 transition"
          >
            Logout
          </Link>
        </>
      )}
      {/* Login link (only if NOT admin) */}
      {!isAdmin && (
        <button
          onClick={() => navigate('/admin/login')}
          className="px-3 py-2 rounded-md hover:bg-pink-100 transition"
        >
          Admin Login
        </button>
      )}
    </nav>
  );
}
