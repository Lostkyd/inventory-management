import { useState, useMemo } from 'react';
import { assets } from '../../assets/assets';
import { addCategory } from '../../Services/category/CategoryServices';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import '../../Styles/FormStyles.css';

const CategoryForm = ({ onCategoryAdded }) => {
    const queryClient = useQueryClient();
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        categoryName: '',
        categoryDescription: '',
    });

    const imagePreview = useMemo(() => {
        return image ? URL.createObjectURL(image) : assets.upload;
    }, [image]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const mutation = useMutation({
        mutationFn: (formData) => addCategory(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category added successfully");
            setData({ categoryName: "", categoryDescription: "" });
            setImage(false);
            if (onCategoryAdded) onCategoryAdded();
        },
        onError: () => toast.error("Unable to add category")
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please select an image");
            return;
        }
        const formData = new FormData();
        formData.append("category", new Blob([JSON.stringify({
            categoryName: data.categoryName,
            categoryDescription: data.categoryDescription
        })], { type: "application/json" }));
        formData.append("file", image);
        mutation.mutate(formData);
    };

    return (
        <form onSubmit={onSubmit}>
            {/* ✅ upload area */}
            <label htmlFor="image" className="form-upload-area">
                <img src={imagePreview} alt="Preview" className="form-upload-preview" />
                <div className="form-upload-text">
                    Category Image
                    <span>{image ? image.name : "Click to upload"}</span>
                </div>
            </label>
            <input type="file" id="image" hidden
                onChange={(e) => setImage(e.target.files[0])} />

            <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input type="text" name="categoryName" className="form-control"
                    placeholder="Enter category name"
                    onChange={onChange} value={data.categoryName} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="categoryDescription" className="form-control"
                    rows="3" placeholder="Optional description"
                    onChange={onChange} value={data.categoryDescription} />
            </div>
            <button type="submit" className="form-submit-btn" disabled={mutation.isPending}>
                {mutation.isPending ? "Adding..." : "Add Category"}
            </button>
        </form>
    );
};

export default CategoryForm;