import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/productService';

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => navigate(`/product/${product._id}`)}
          className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover rounded"
          />

          <h2 className="mt-2 font-bold text-lg">{product.name}</h2>

          <p className="text-sm text-gray-600">{product.brand}</p>

          <p className="mt-1 font-semibold">₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}
