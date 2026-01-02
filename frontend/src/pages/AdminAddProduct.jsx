import { getToken } from '../utils/auth';
import { useState } from 'react';
import axios from 'axios';
// import { logout } from '../utils/auth';
// import { useNavigate } from 'react-router-dom';
import.meta.env.VITE_API_BASE_URL;

export default function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: 'Unisex',
    volume: '',
    stock: '',
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   logout();
  //   // navigate('/admin/add-product');
  //   navigate('/admin/login', { replace: true });
  // };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1️⃣ Upload image to Cloudinary (backend API)
      const imageData = new FormData();
      imageData.append('image', image);

      const uploadRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/uploads`,
        imageData
      );

      const imageUrl = uploadRes.data.imageUrl;

      // 2️⃣ Create product
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/products`,
        {
          ...formData,
          price: Number(formData.price),
          volume: Number(formData.volume),
          stock: Number(formData.stock),
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert('Product added successfully ✅');

      // Reset form
      setFormData({
        name: '',
        brand: '',
        description: '',
        price: '',
        category: 'Unisex',
        volume: '',
        stock: '',
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      alert('Error adding product ❌');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Admin – Add New Product</h1>

      {/* <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div> */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option>Men</option>
          <option>Women</option>
          <option>Unisex</option>
        </select>

        <input
          name="volume"
          type="number"
          placeholder="Volume (ml)"
          value={formData.volume}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded
                     hover:bg-pink-600 transition"
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
