import { useState, useEffect } from 'react';
import { AppContext } from './Context';
import api from '../Context/Interceptor/GlobalInterceptor';

export const AppContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        email: null,
        token: null,
        role: null,
        firstName: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const publicPaths = ['/', '/landing', '/login', '/register'];
        const isPublicPage = publicPaths.includes(window.location.pathname);

        if (isPublicPage) {
            setLoading(false);
            return;
        }

        api.get('/auth/me')
            .then(response => {
                setAuth({
                    email: response.data.email,
                    token: null,
                    role: response.data.role,
                    firstName: response.data.firstName
                });
            })
            .catch((error) => {
                if (error.response?.status !== 401) {
                    console.error('Failed to fetch current user:', error);
                }
                setAuth({ email: null, token: null, role: null, firstName: null });
            })
            .finally(() => setLoading(false));
    }, []);

    const setAuthData = (email, role, firstName) => {
        setAuth({
            email,
            token: null,
            role,
            firstName
        });
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setAuth({ email: null, token: null, role: null, firstName: null });
        }
    };

    return (
        <AppContext.Provider value={{ auth, setAuthData, logout, loading }}>
            {children}
        </AppContext.Provider>
    );
};