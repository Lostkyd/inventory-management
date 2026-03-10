import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;