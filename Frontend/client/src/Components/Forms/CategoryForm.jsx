import { useState, useMemo } from 'react';
import { assets } from '../../assets/assets';
import { addCategory } from '../../Services/category/CategoryServices';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
        onError: (error) => {
            console.error(error);
            toast.error("Unable to add category");
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please select an image for the category");
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
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    <img src={imagePreview} alt="Category" width={48} />
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">Category Name</label>
                <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    className="form-control"
                    placeholder="Enter category name"
                    onChange={onChange}
                    value={data.categoryName}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    id="description"
                    name="categoryDescription"
                    className="form-control"
                    rows="3"
                    placeholder="Optional description"
                    onChange={onChange}
                    value={data.categoryDescription}
                />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={mutation.isPending}>
                {mutation.isPending ? "Adding..." : "Submit"}
            </button>
        </form>
    );
};

export default CategoryForm;