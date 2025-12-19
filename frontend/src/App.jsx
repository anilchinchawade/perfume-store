import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminLogin from './pages/AdminLogin';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminProductList from './pages/AdminProductList';
import AdminEditProduct from './pages/AdminEditProduct';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/add-product"
            element={
              <ProtectedAdminRoute>
                <AdminAddProduct />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedAdminRoute>
                <AdminProductList />
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/admin/edit-product/:id"
            element={
              <ProtectedAdminRoute>
                <AdminEditProduct />
              </ProtectedAdminRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
