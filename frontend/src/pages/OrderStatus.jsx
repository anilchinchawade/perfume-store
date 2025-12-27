import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import.meta.env.VITE_API_BASE_URL;

export default function OrderStatus() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders/${id}`
        );
        setOrder(res.data);
      } catch {
        setError('Order not found');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return <p className="p-6">Loading order...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-6 border rounded mt-6">
      <h1 className="text-2xl font-bold mb-4">Order Status</h1>

      <p>
        <strong>Order ID:</strong> {order._id}
      </p>
      <p>
        <strong>Total Amount:</strong> ₹{order.totalPrice}
      </p>
      <p>
        <strong>Payment:</strong> {order.isPaid ? 'Paid ✅' : 'Pending ❌'}
      </p>
      <p>
        <strong>Delivery:</strong>{' '}
        {order.isDelivered ? 'Delivered 🚚' : 'Pending'}
      </p>

      <p className="text-sm text-gray-500 mt-2">
        Placed on: {new Date(order.createdAt).toLocaleString()}
      </p>

      <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
        Share this link to track your order:
        <div className="break-all mt-1 text-blue-600">
          {window.location.href}
        </div>
      </div>
    </div>
  );
}
