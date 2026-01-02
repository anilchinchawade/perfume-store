import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/productService';
import { useCart } from '../context/useCart';

// import { CartProvider } from './context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🌸 Our Premium Perfume Collection
        </h1>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl
                         transition-all duration-300 cursor-pointer
                         group overflow-hidden"
            >
              {/* Image Section */}
              <div className="h-60 bg-gray-100 flex items-center justify-center overflow-hidden">
                {
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src =
                        'https://images.unsplash.com/photo-1594035910387-fea47794261f';
                    }}
                    //         className="h-full w-full object-cover
                    //  group-hover:scale-110 transition duration-300"
                    className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110"
                  />
                }
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">{product.brand}</p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-bold text-pink-600">
                    ₹{product.price}
                  </span>

                  <span className="text-xs  px-3 py-1 rounded-full">
                    {product.volume} ml
                  </span>
                </div>

                <button
                  className="mt-5 w-full bg-black text-white py-2 rounded-lg
                             hover:bg-pink-600 transition"
                  // className="mt-3 bg-black text-white px-4 py-2 rounded hover:bg-pink-600"
                >
                  View Details
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-5 w-full bg-black text-white py-2 rounded-lg
                             hover:bg-pink-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
