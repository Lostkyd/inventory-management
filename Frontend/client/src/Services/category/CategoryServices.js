import api from '../../Context/Interceptor/GlobalInterceptor';

export const addCategory = async (category) => 
    api.post(`/admin/categories`, category);

export const updateCategory = async (categoryId, formData) =>
    api.put(`/admin/categories/${categoryId}`, formData);

export const fetchAllCategories = async () => 
    api.get(`/categories`);

export const deleteCategory = async (categoryId) => 
    api.delete(`/admin/categories/${categoryId}`);

