// import { useCart } from '../context/CartContext';
import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 && <p>Your cart is empty</p>}

      {cartItems.map((item) => (
        <div key={item._id} className="flex items-center gap-4 border-b py-4">
          <img src={item.image} className="h-20 w-20 object-cover" />

          <div className="flex-1">
            <h2 className="font-semibold">{item.name}</h2>
            <p>₹{item.price}</p>
          </div>

          <input
            type="number"
            min="1"
            value={item.qty}
            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
            className="w-16 border p-1 rounded"
          />

          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div className="mt-6 text-right">
          <h2 className="text-xl font-bold">Total: ₹{total}</h2>
          {/* <button className="mt-4 bg-black text-white px-6 py-2 rounded">
            Checkout
          </button> */}
          <button
            onClick={() => navigate('/checkout')}
            className="mt-4 bg-black text-white px-6 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}
