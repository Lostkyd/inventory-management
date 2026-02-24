import { useEffect, useState } from "react";
import { fetchAllCategories } from "../Services/category/CategoryServices";
import { fetchAllProducts } from "../Services/product/ProductServices";
import { AppContext } from "./Context";

export const AppContextProvider = (props) => {

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [auth, setAuth] = useState({ token: null, role: null });
    useEffect(() => {
        const loadData = async () => {
            const response = await fetchAllCategories();
            const productResponse = await fetchAllProducts();
            setCategories(response.data);
            setProducts(productResponse.data);
        };
        
        loadData();
    }, []);

    const setAuthData = (token, role) => {
        setAuth({ token, role });
    };

    const contextValue = {
        categories,
        setCategories,
        auth,
        setAuthData,
        products,
        setProducts
    };

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};