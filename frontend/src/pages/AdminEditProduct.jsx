import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utils/auth';
import.meta.env.VITE_API_BASE_URL;

export default function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: 'Unisex',
    volume: '',
    stock: '',
    image: '',
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing product
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`)
      .then((res) => setFormData(res.data))
      .catch(() => alert('Failed to load product'));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (newImage) {
        const imageData = new FormData();
        imageData.append('image', newImage);

        const uploadRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
          imageData
        );

        imageUrl = uploadRes.data.imageUrl;
      }

      // Update product
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`,
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

      alert('Product updated successfully ✅');
      navigate('/admin/products');
    } catch (error) {
      alert('Update failed ❌', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Product Name"
          required
        />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Brand"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Description"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Price"
          required
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
          type="number"
          name="volume"
          value={formData.volume}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Volume (ml)"
          required
        />

        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Stock"
          required
        />

        {/* Current image */}
        {formData.image && (
          <img src={formData.image} alt="Current" className="h-32 rounded" />
        )}

        {/* New image upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewImage(e.target.files[0])}
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-pink-600"
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}
