import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

export default function ProtectedAdminRoute({ children }) {
  if (!isTokenValid()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
