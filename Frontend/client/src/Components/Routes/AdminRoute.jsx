import { Navigate } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth';

const AdminRoute = ({ element }) => {
    const { isAuthenticated, isAdmin, role } = useAuth();
    console.log("isAuthenticated:", isAuthenticated);
    console.log("isAdmin:", isAdmin);
    console.log("role:", role);
    
    if (!isAuthenticated) return <Navigate to="/" />;
    if (!isAdmin) return <Navigate to="/dashboard" />;
    return element;
};

export default AdminRoute;