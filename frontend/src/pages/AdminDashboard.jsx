import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const token = getToken();

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get(
        'http://localhost:5000/api/orders/admin/dashboard',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(res.data);
    };

    fetchStats();
  }, []);

  if (!stats) return <p className="p-6">Loading dashboard...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Orders" value={stats.totalOrders} />
        <Card title="Total Revenue" value={`₹${stats.totalRevenue}`} />
        <Card title="Pending Payments" value={stats.pendingPayments} />
        <Card title="Delivered Orders" value={stats.deliveredOrders} />
      </div>

      {/* SIMPLE SALES LIST */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Orders by Date</h2>
        <ul className="list-disc ml-6">
          {stats.salesByDate.map((item) => (
            <li key={item._id}>
              {item._id}: {item.count} orders
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
