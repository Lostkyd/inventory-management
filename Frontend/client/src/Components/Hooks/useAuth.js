import { useContext } from 'react';
import { AppContext } from '../../Context/Context';

export const useAuth = () => {
    const { auth, setAuthData, logout } = useContext(AppContext);
    return {
        token: auth.token,
        role: auth.role,
        isAuthenticated: !!auth.token,
        isAdmin: auth.role === "ROLE_ADMIN",
        setAuthData,
        logout
    };
};