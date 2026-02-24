import axios from "axios";

export const addProduct = async (product) => {
    return await axios.post("http://localhost:8080/api/v1/admin/products", product, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
}

export const deleteProduct = async (itemId) => {
    return await axios.delete(`http://localhost:8080/api/v1/admin/products/${itemId}`, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
}

export const fetchAllProducts = async () => {
    return await axios.get('http://localhost:8080/api/v1/products', {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
}