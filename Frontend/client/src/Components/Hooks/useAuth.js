import { useContext } from 'react';
import { AppContext } from '../../Context/Context';

export const useAuth = () => {
    const { auth, setAuthData, logout, loading } = useContext(AppContext);
    return {
        role: auth.role,
        firstName: auth.firstName,
        isAuthenticated: !!auth.role,
        isAdmin: auth.role === "ROLE_ADMIN",
        loading,
        setAuthData,
        logout
    };
};