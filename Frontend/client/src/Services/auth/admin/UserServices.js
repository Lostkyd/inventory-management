import api from '../../../Context/Interceptor/GlobalInterceptor';

export const fetchAllUsers = async () => {
    return await api.get(`/admin/users`);
}

export const addUser = async (email, role) => {
    return await api.post(`/admin/register`, { email, role });
}
export const updateUserRole = async (userId, role) =>
    api.patch(`/admin/users/${userId}/role`, { role });

export const updateUser = async (userId, data) =>
    api.put(`/admin/users/${userId}`, data);

export const deleteUser = async (userId) => {
    return await api.delete(`/admin/users/${userId}`);
}

