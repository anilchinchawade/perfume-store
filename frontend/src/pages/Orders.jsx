// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Orders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/orders')
//       .then((res) => setOrders(res.data));
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">My Orders</h1>

//       {orders.map((order) => (
//         <div key={order._id} className="border p-4 mb-3 rounded">
//           <p>Total: ₹{order.totalPrice}</p>
//           <p>Items: {order.orderItems.length}</p>
//           <p>Status: {order.isPaid ? 'Paid' : 'Pending'}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState } from 'react';
import axios from 'axios';

export default function Orders() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    if (!phone || phone.length !== 10) {
      setError('Enter valid 10-digit phone number');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/orders/my/${phone}`
      );
      setOrders(res.data);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {/* PHONE INPUT */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={fetchOrders}
          className="bg-black text-white px-4 rounded hover:bg-pink-600"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p>Loading orders...</p>}

      {/* ORDERS LIST */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow-sm">
              <div className="flex justify-between mb-2">
                <p className="font-semibold">Order ID</p>
                <p className="text-sm">{order._id}</p>
              </div>

              <p>
                <strong>Total:</strong> ₹{order.totalPrice}
              </p>

              <p>
                <strong>Payment:</strong>{' '}
                {order.isPaid ? 'Paid ✅' : 'Pending ❌'}
              </p>

              <p>
                <strong>Delivery:</strong>{' '}
                {order.isDelivered ? 'Delivered 🚚' : 'Pending'}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Placed on: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No orders found.</p>
      )}
    </div>
  );
}
