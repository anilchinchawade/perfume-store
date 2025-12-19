import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <div className="text-green-600 text-5xl mb-4">✓</div>

      <h1 className="text-2xl font-bold mb-2">
        Thank you! Your order has been placed 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        We’ve received your order and will start processing it shortly.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/orders"
          className="bg-black text-white px-5 py-2 rounded hover:bg-pink-600"
        >
          View My Orders
        </Link>

        <Link to="/" className="border px-5 py-2 rounded hover:bg-gray-100">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
