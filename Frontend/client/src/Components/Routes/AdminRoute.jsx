import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const AdminRoute = ({ element }) => {
    const { isAuthenticated, isAdmin, loading } = useAuth();

    if (loading) return null;
    if (!isAuthenticated) return <Navigate to="/" />;
    if (!isAdmin) return <Navigate to="/" />;
    return element;
};

export default AdminRoute;