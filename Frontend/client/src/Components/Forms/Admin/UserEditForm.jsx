import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../../Services/auth/admin/UserServices";
import toast from "react-hot-toast";
import "./UserForm.css";

const UserEditForm = ({ user, onClose }) => {
    const queryClient = useQueryClient();
    const [data, setData] = useState({
        firstName: user.firstName || "",
        middleName: user.middleName || "",
        lastName: user.lastName || "",
        address: user.address || "",
        phoneNumber: user.phoneNumber || "",
        birthDate: user.birthDate || ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const updateMutation = useMutation({
        mutationFn: () => updateUser(user.userId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("User updated successfully!");
            onClose();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update user");
        }
    });

    return (
        <div className="user-form">
            <form onSubmit={(e) => { e.preventDefault(); updateMutation.mutate(); }}>
                <div className="edit-form-grid">
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" name="firstName" className="form-control"
                            placeholder="Juan" value={data.firstName} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Middle Name</label>
                        <input type="text" name="middleName" className="form-control"
                            placeholder="Santos" value={data.middleName} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="lastName" className="form-control"
                            placeholder="Dela Cruz" value={data.lastName} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="text" name="phoneNumber" className="form-control"
                            placeholder="09123456789" value={data.phoneNumber} onChange={onChange} />
                    </div>
                    <div className="mb-3 full-width">
                        <label className="form-label">Address</label>
                        <input type="text" name="address" className="form-control"
                            placeholder="Manila, Philippines" value={data.address} onChange={onChange} />
                    </div>
                    <div className="mb-3 full-width">
                        <label className="form-label">Birth Date</label>
                        <input type="date" name="birthDate" className="form-control"
                            value={data.birthDate} onChange={onChange} />
                    </div>
                </div>
                <button type="submit" className="edit-save-btn"
                    disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
            </form>
        </div>
    );
};

export default UserEditForm;