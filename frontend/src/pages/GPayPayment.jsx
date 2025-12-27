import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import.meta.env.VITE_API_BASE_URL;

export default function GPayPayment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  // Safety: user should not land here directly
  if (!state) {
    navigate('/');
    return null;
  }

  const { cartItems, form, total } = state;

  const confirmPayment = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders`, {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        shippingAddress: form,
        totalPrice: total,
        paymentMethod: 'GPay QR',
        paymentStatus: 'Pending',
      });

      localStorage.removeItem('cartItems');
      navigate('/order-success');
    } catch (err) {
      alert('Failed to save order. Please try again.' + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Pay using UPI (GPay)</h1>

      <p className="mb-3">Scan the QR code below to complete payment</p>

      <img src="/gpay-qr.png" alt="GPay QR" className="mx-auto w-64 h-64" />

      <p className="mt-4 font-semibold">Amount: ₹{total}</p>

      <button
        onClick={confirmPayment}
        className="mt-6 bg-black text-white px-6 py-2 rounded hover:bg-pink-600"
      >
        I have paid
      </button>

      <p className="text-sm text-gray-500 mt-3">
        Payment will be verified manually by admin.
      </p>
    </div>
  );
}
