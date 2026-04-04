import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const PermissionRoute = ({ element, permission }) => {
    const { isAuthenticated, loading, hasPermission } = useAuth();

    if (loading) return null;
    if (!isAuthenticated) return <Navigate to="/" />;
    if (!hasPermission(permission)) return <Navigate to="/" />;

    return element;
};

export default PermissionRoute;
