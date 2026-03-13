import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../../Services/category/CategoryServices";
import toast from "react-hot-toast";
import "../../../Styles/FormStyles.css";

const CategoryEditForm = ({ category, onClose }) => {
    const queryClient = useQueryClient();
    const [data, setData] = useState({
        categoryName: category.categoryName || ""
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const updateMutation = useMutation({
        mutationFn: () => updateCategory(category.categoryId, data.categoryName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category updated successfully!");
            onClose();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update category");
        }
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                updateMutation.mutate();
            }}
        >
            <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                    type="text"
                    name="categoryName"
                    className="form-control"
                    value={data.categoryName}
                    onChange={onChange}
                    required
                />
            </div>

            <button
                type="submit"
                className="form-submit-btn"
                disabled={updateMutation.isPending}
            >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
};

export default CategoryEditForm;