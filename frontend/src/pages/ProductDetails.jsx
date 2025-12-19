import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../services/productService';
// import { useCart } from '../context/CartContext';
import { useCart } from '../context/useCart';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getProductById(id)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p className="text-center mt-20">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center mt-20">Product not found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white rounded-xl p-6 border">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src =
                'https://images.unsplash.com/photo-1594035910387-fea47794261f';
            }}
            className="h-full w-full object-cover
             group-hover:scale-110 transition duration-300"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-500 mt-1">Brand: {product.brand}</p>

          <p className="text-2xl font-bold text-pink-600 mt-4">
            ₹{product.price}
          </p>

          <p className="text-sm text-gray-600 mt-2">
            Volume: {product.volume} ml
          </p>

          <p className="text-sm mt-2">
            {product.stock > 0 ? (
              <span className="text-green-600">
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-8 bg-black text-white px-8 py-3 rounded
                       hover:bg-pink-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
