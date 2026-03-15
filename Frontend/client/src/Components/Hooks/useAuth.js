import { useContext } from 'react';
import { AppContext } from '../../Context/Context';
import { ROLES } from '../../Constants/constants';

export const useAuth = () => {
    const { auth, setAuthData, logout, loading } = useContext(AppContext);
    return {
        email: auth.email,
        role: auth.role,
        firstName: auth.firstName,
        isAuthenticated: !!auth.role,
        isAdmin: auth.role === ROLES.ADMIN,
        loading,
        setAuthData,
        logout
    };
};