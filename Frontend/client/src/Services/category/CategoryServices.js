import axios from 'axios';

export const addCategory = async (category) => {
   return await axios.post('http://localhost:8080/api/v1/admin/categories', category, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
}

export const deleteCategory = async (categoryId) => {
    return await axios.delete(`http://localhost:8080/api/v1/admin/categories/${categoryId}`, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
}

export const fetchAllCategories = async () => {
    return await axios.get('http://localhost:8080/api/v1/categories', {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}});
}