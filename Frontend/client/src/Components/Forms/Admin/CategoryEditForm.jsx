import { useState, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategory } from "../../../Services/category/CategoryServices";
import toast from "react-hot-toast";
import '../../../Styles/FormStyles.css';

const CategoryEditForm = ({ category, onClose }) => {
    const queryClient = useQueryClient();
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        categoryName: category.categoryName || "",
        categoryDescription: category.categoryDescription || ""
    });

    const imagePreview = useMemo(() => {
        return image ? URL.createObjectURL(image) : category.imgUrl;
    }, [image, category.imgUrl]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const updateMutation = useMutation({
        mutationFn: () => {
            const formData = new FormData();
            formData.append("categoryName", data.categoryName);
            if (data.categoryDescription) formData.append("categoryDescription", data.categoryDescription);
            if (image) formData.append("file", image);
            return updateCategory(category.categoryId, formData);
        },
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
        <form onSubmit={(e) => { e.preventDefault(); updateMutation.mutate(); }}>
            <label htmlFor="edit-category-image" className="form-upload-area">
                <img src={imagePreview} alt="Preview" className="form-upload-preview" />
                <div className="form-upload-text">
                    Category Image
                    <span>{image ? image.name : "Click to change image"}</span>
                </div>
            </label>
            <input type="file" id="edit-category-image" hidden
                onChange={(e) => setImage(e.target.files[0])} />

            <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input type="text" name="categoryName" className="form-control"
                    value={data.categoryName} onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="categoryDescription" className="form-control"
                    rows="3" value={data.categoryDescription} onChange={onChange} />
            </div>
            <button type="submit" className="form-submit-btn" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
};

export default CategoryEditForm;