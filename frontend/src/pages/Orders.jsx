import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/orders')
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="border p-4 mb-3 rounded">
          <p>Total: ₹{order.totalPrice}</p>
          <p>Items: {order.orderItems.length}</p>
          <p>Status: {order.isPaid ? 'Paid' : 'Pending'}</p>
        </div>
      ))}
    </div>
  );
}
