import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers, deleteUser } from "../../../Services/auth/admin/UserServices";
import { toast } from "react-hot-toast";
import "./UserList.css";

const UserList = ({ searchTerm, onEdit }) => {
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await fetchAllUsers();
            return response.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (userId) => deleteUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User deleted successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Unable to delete user");
        }
    });

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    if (isLoading) return <div className="no-results"><p>Loading...</p></div>;

    return (
        <div className="user-list">
            {filteredUsers.length === 0 ? (
                <div className="no-results">
                    <i className="bi bi-search fs-1"></i>
                    <p>No users found</p>
                </div>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.userId}>
                                <td>{index + 1}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`status-badge ${user.verified ? "verified" : "unverified"}`}>
                                        {user.verified ? "Verified" : "Unverified"}
                                    </span>
                                </td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn-edit" title="Edit"
                                        onClick={() => onEdit(user)}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn-delete" title="Delete"
                                        onClick={() => deleteMutation.mutate(user.userId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserList;