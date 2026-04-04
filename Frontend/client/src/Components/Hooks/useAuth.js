import { useContext } from 'react';
import { AppContext } from '../../Context/Context';
import { ROLE_PERMISSIONS } from '../../Constants/constants';

export const useAuth = () => {
    const { auth, setAuthData, logout, loading } = useContext(AppContext);
    const permissions = ROLE_PERMISSIONS[auth.role] || [];

    const hasPermission = (permission) => permissions.includes(permission);

    return {
        role: auth.role,
        firstName: auth.firstName,
        permissions,
        hasPermission,
        isAuthenticated: !!auth.role,
        isAdmin: auth.role === "ROLE_ADMIN",
        loading,
        setAuthData,
        logout
    };
};
