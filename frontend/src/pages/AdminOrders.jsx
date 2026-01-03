import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import.meta.env.VITE_API_BASE_URL;
import Papa from 'papaparse';

const ITEMS_PER_PAGE = 8;

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const token = getToken();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.error('Failed to load orders', error);
    }
  };

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
      `${import.meta.env.VITE_API_BASE_URL}/api/orders/${id}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchOrders();
  };

  // // 🔍 FILTER ORDERS
  // const filteredOrders = orders.filter((order) => {
  //   const name = order.shippingAddress.fullName.toLowerCase();
  //   const phone = order.shippingAddress.phone;

  //   return name.includes(search.toLowerCase()) || phone.includes(search);
  // });
  // 🔍 SEARCH FILTER
  const searchedOrders = orders.filter((order) => {
    const name = order.shippingAddress.fullName.toLowerCase();
    const phone = order.shippingAddress.phone;

    return name.includes(search.toLowerCase()) || phone.includes(search);
  });

  // 🎯 STATUS FILTER
  const filteredOrders = searchedOrders.filter((order) => {
    if (statusFilter === 'paid') return order.isPaid;
    if (statusFilter === 'unpaid') return !order.isPaid;
    if (statusFilter === 'delivered') return order.isDelivered;
    if (statusFilter === 'undelivered') return !order.isDelivered;
    return true; // all
  });

  // 📄 PAGINATION LOGIC
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const exportToCSV = () => {
    const csvData = filteredOrders.map((order) => ({
      OrderID: order._id,
      CustomerName: order.shippingAddress.fullName,
      Phone: order.shippingAddress.phone,
      City: order.shippingAddress.city,
      TotalPrice: order.totalPrice,
      Paid: order.isPaid ? 'Yes' : 'No',
      Delivered: order.isDelivered ? 'Yes' : 'No',
      OrderDate: new Date(order.createdAt).toLocaleDateString(),
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by customer name or phone..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-72 border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700"
        />

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border px-3 py-2 rounded dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="all">All Orders</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="delivered">Delivered</option>
          <option value="undelivered">Undelivered</option>
        </select>

        <button
          onClick={exportToCSV}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ⬇ Export CSV
        </button>
      </div>

      {/* ORDERS TABLE */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow">
        <table className="w-full border-collapse text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Customer Phone No.</th>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Delivery</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center text-red-500 font-semibold"
                >
                  No orders match the selected filters
                </td>
              </tr>
            )}

            {currentOrders.map((order) => (
              <tr key={order._id}>
                <td className="border p-2">{order.shippingAddress.phone}</td>
                <td className="border p-2">
                  {order.shippingAddress?.fullName}
                </td>
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
      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? 'bg-black text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
