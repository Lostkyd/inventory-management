import { useEffect, useState } from "react";
import { fetchAllCategories } from "../Service/CategoryServices";
import { AppContext } from "./Context";

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const response = await fetchAllCategories();
            setCategories(response.data);
        };
        
        loadData();
    }, []);

    const contextValue = {
        categories,
        setCategories
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};