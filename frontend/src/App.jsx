import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminAddProduct from './pages/AdminAddProduct';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AdminLogin from './pages/AdminLogin';

function App() {
  const isAdmin = !!localStorage.getItem('adminToken');
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route
          path="/admin/add-product"
          element={isAdmin ? <AdminAddProduct /> : <AdminLogin />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// function App() {
//   return (
//     <div className="h-screen bg-black flex items-center justify-center">
//       <h1 className="text-4xl font-bold text-pink-500">
//         Tailwind is Working ✅
//       </h1>
//     </div>
//   );
// }

// export default App;
