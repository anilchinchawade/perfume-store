import { Link } from 'react-router-dom';
import { useState } from 'react';
import { isTokenValid } from '../utils/auth';
// import { useCart } from '../context/CartContext';
import { useCart } from '../context/useCart';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartItems } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Perfume<span className="text-pink-600">Store</span>
        </Link>

        <div className="hidden md:flex gap-6">
          <Link to="/" className="hover:text-pink-600">
            Home
          </Link>
          <Link to="/cart" className="hover:text-pink-600">
            Cart ({cartItems.length})
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <Link to="/" className="block py-1">
            Home
          </Link>
          <Link to="/cart" className="block py-1">
            Cart
          </Link>
        </div>
      )}

      {isTokenValid() && (
        <Link
          to="/admin/products"
          className="text-sm font-medium hover:text-pink-600"
        >
          Admin Products
        </Link>
      )}
    </nav>
  );
}
