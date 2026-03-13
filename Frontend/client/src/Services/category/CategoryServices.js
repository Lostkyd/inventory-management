import api from '../../Context/Interceptor/GlobalInterceptor';

export const addCategory = async (categoryName) =>
    api.post('/admin/categories', { categoryName });

export const updateCategory = async (categoryId, categoryName) =>
    api.put(`/admin/categories/${categoryId}`, { categoryName });

export const fetchAllCategories = async () =>
    api.get('/categories');

export const deleteCategory = async (categoryId) =>
    api.delete(`/admin/categories/${categoryId}`);