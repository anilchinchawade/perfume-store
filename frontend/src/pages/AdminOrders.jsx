import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import.meta.env.VITE_API_BASE_URL;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = getToken();

  const fetchOrders = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markPaid = async (id) => {
    await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/api/orders/${id}/pay`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchOrders();
  };

  const markDelivered = async (id) => {
    await axios.put(
      `http://${import.meta.env.VITE_API_BASE_URL}/api/orders/${id}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchOrders();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Payment</th>
            <th className="border p-2">Delivery</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">{order._id}</td>
              <td className="border p-2">{order.shippingAddress?.fullName}</td>
              <td className="border p-2">₹{order.totalPrice}</td>
              <td className="border p-2">
                {order.isPaid ? 'Paid ✅' : 'Pending ❌'}
              </td>
              <td className="border p-2">
                {order.isDelivered ? 'Delivered 🚚' : 'Pending'}
              </td>
              <td className="border p-2 space-x-2">
                {!order.isPaid && (
                  <button
                    onClick={() => markPaid(order._id)}
                    className="bg-green-600 text-white px-2 py-1 rounded"
                  >
                    Mark Paid
                  </button>
                )}
                {order.isPaid && !order.isDelivered && (
                  <button
                    onClick={() => markDelivered(order._id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
