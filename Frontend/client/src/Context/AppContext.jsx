import { useState } from 'react';
import { AppContext } from './Context';

export const AppContextProvider = (props) => {
    const [auth, setAuth] = useState({ token: null, role: null });

    const setAuthData = (token, role) => {
        setAuth({ token, role });
    };

    const contextValue = {
        auth,
        setAuthData,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};