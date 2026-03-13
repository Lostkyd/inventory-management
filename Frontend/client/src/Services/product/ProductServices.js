import api from '../../Context/Interceptor/GlobalInterceptor';

export const addProduct = async (product) => 
    api.post(`/admin/products`, product);

export const updateProduct = async (productId, formData) =>
    api.put(`/admin/products/${productId}`, formData);

export const fetchAllProducts = async () => 
    api.get(`/products`);

export const deleteProduct = async (itemId) => 
    api.delete(`/admin/products/${itemId}`);
