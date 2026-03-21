import { useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllUsers, deleteUser , updateUserRole } from "../../../Services/auth/admin/UserServices";
import { useAuth } from "../../Hooks/useAuth";
import { ROLES } from "../../../Constants/constants";
import { toast } from "react-hot-toast";
import "./UserList.css";

const UserList = ({ searchTerm, onEdit }) => {
    const queryClient = useQueryClient();
    const { email, role } = useAuth();
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

    const roleMutation = useMutation({
        mutationFn: ({ userId, role }) => updateUserRole(userId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User role updated successfully");
        },
        onError: (error) => {
            console.error(error);
            const message =
                error.response?.data?.detail ||
                error.response?.data?.message ||
                "Unable to update role";

            toast.error(message);
            queryClient.invalidateQueries({ queryKey: ["users"] });
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
                            <th>Role</th>
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
                                    <span className={`status-badge ${user.isVerified ? "verified" : "unverified"}`}>
                                        {user.isVerified ? "Verified" : "Unverified"}
                                    </span>
                                </td>
                                <td>
                                    <select
                                        className="role-select"
                                        value={user.role || ROLES.USER}
                                        disabled={roleMutation.isPending}
                                        onChange={(e) => {
                                            const newRole = e.target.value;

                                            if (
                                                email === user.email &&
                                                role === ROLES.ADMIN &&
                                                newRole === ROLES.USER
                                            ) {
                                                toast.error("You cannot remove your own admin role");
                                                return;
                                            }

                                            if (
                                                window.confirm(
                                                    `Change role of ${user.email} to ${
                                                        newRole === ROLES.ADMIN ? "Admin" : "User"
                                                    }?`
                                                )
                                            ) {
                                                roleMutation.mutate({
                                                    userId: user.userId,
                                                    role: newRole
                                                });
                                            } else {
                                                queryClient.invalidateQueries({ queryKey: ["users"] });
                                            }
                                        }}
                                    >
                                        <option value={ROLES.USER}>User</option>
                                        <option value={ROLES.ADMIN}>Admin</option>
                                    </select>
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