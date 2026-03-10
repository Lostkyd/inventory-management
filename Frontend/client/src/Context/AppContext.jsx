import { useState } from 'react';
import { AppContext } from './Context';

export const AppContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null
    });

    const setAuthData = (token, role) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        setAuth({ token, role });
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuth({ token: null, role: null });
        window.location.href = "/";
    };

    return (
        <AppContext.Provider value={{ auth, setAuthData, logout }}>
            {children}
        </AppContext.Provider>
    );
};