import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboard() {
  const token = getToken();

  const [stats, setStats] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // ✅ FETCH DASHBOARD STATS (DEFINED AT COMPONENT SCOPE)
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/orders/admin/dashboard',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            startDate,
            endDate,
          },
        }
      );
      setStats(res.data);
    } catch (error) {
      console.error('Failed to load dashboard stats', error);
    }
  };

  // ✅ LOAD STATS ON PAGE LOAD
  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* DATE FILTERS */}
      <div className="flex gap-4 mb-6">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={fetchStats}
          className="bg-black text-white px-4 rounded hover:bg-pink-600"
        >
          Apply
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Orders" value={stats.totalOrders} />
        <Card title="Total Revenue" value={`₹${stats.totalRevenue}`} />
        <Card title="Pending Payments" value={stats.pendingPayments} />
        <Card title="Delivered Orders" value={stats.deliveredOrders} />
      </div>

      {/* ORDERS TREND */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Orders Trend</h2>

        {stats.salesByDate?.length === 0 ? (
          <p className="text-gray-500">No order data available yet.</p>
        ) : (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.salesByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#ec4899"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* REVENUE TREND */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Revenue Trend</h2>

        {stats.revenueByDate?.length === 0 ? (
          <p className="text-gray-500">No revenue data available.</p>
        ) : (
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.revenueByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#16a34a"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ REUSABLE CARD COMPONENT
function Card({ title, value }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
