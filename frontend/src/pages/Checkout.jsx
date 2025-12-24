import { useCart } from '../context/useCart';
//  import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    pincode: '',
    phone: '',
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const placeOrder = async () => {
  //   console.log('Place Order clicked');

  //   if (cartItems.length === 0) return;

  //   try {
  //     const res = await axios.post('http://localhost:5000/api/orders', {
  //       // orderItems: cartItems,
  //       orderItems: cartItems.map((item) => ({
  //         product: item._id,
  //         name: item.name,
  //         price: item.price,
  //         qty: item.qty,
  //         image: item.image,
  //       })),

  //       shippingAddress: form,
  //       totalPrice: total,
  //     });

  //     console.log('Order API success', res.data);

  //     localStorage.removeItem('cartItems');
  //     navigate('/order-success');
  //   } catch (error) {
  //     console.error('Order API failed', error.response?.data || error.message);
  //     alert('Failed to place order. Check console.');
  //   }
  // };
  const placeOrder = () => {
    if (cartItems.length === 0) return;

    navigate('/gpay-payment', {
      state: {
        cartItems,
        form,
        total,
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          placeOrder();
        }}
        className="grid md:grid-cols-2 gap-6"
      >
        {/* LEFT: SHIPPING FORM */}
        <div className="space-y-3">
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
            minLength={3}
            className="border p-2 w-full"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />

          <input
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            pattern="[0-9]{6}"
            title="Enter 6-digit pincode"
            className="border p-2 w-full"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
            title="Enter 10-digit phone number"
            className="border p-2 w-full"
          />
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Order Summary</h2>

          {cartItems.map((item) => (
            <p key={item._id}>
              {item.name} × {item.qty}
            </p>
          ))}

          <p className="font-bold mt-2">Total: ₹{total}</p>

          <button
            type="submit"
            disabled={cartItems.length === 0}
            className={`mt-4 px-4 py-2 rounded text-white ${
              cartItems.length === 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-pink-600'
            }`}
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}
