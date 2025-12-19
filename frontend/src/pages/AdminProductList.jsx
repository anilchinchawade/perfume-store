import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function AdminProductList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    const loadProducts = async () => {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === 'All' || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?'))
      return;

    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin – Product List</h1>

        <button
          onClick={() => navigate('/admin/add-product')}
          className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600"
        >
          + Add Product
        </button>
      </div> */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Admin – Product List</h1>

        <div className="flex gap-3">
          {/* Search */}
          <input
            type="text"
            placeholder="Search by name or brand"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          />

          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Unisex">Unisex</option>
          </select>

          <button
            onClick={() => navigate('/admin/add-product')}
            className="bg-black text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Brand</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {/* {products.map((product) => ( */}
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.brand}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-product/${product._id}`)
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* {products.length === 0 && ( */}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
