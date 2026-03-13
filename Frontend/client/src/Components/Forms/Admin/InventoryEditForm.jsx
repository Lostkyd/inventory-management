import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../../../Services/product/ProductServices";
import { fetchAllCategories } from "../../../Services/category/CategoryServices";
import toast from "react-hot-toast";
import '../../../Styles/FormStyles.css';

const InventoryEditForm = ({ product, onClose }) => {
    const queryClient = useQueryClient();
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        categoryId: product.categoryId || "",
        productName: product.productName || "",
        productQuantity: product.productQuantity || "",
        productPrice: product.productPrice || "",
        productDescription: product.productDescription || ""
    });

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await fetchAllCategories();
            return response.data;
        }
    });

    const imagePreview = useMemo(() => {
        return image ? URL.createObjectURL(image) : product.imgUrl;
    }, [image, product.imgUrl]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const updateMutation = useMutation({
        mutationFn: () => {
            const formData = new FormData();
            formData.append("product", JSON.stringify(data));
            if (image) formData.append("file", image);
            return updateProduct(product.productId, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Product updated successfully!");
            onClose();
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update product");
        }
    });

    return (
        <form onSubmit={(e) => { e.preventDefault(); updateMutation.mutate(); }}>
            <label htmlFor="edit-product-image" className="form-upload-area">
                <img src={imagePreview} alt="Preview" className="form-upload-preview" />
                <div className="form-upload-text">
                    Product Image
                    <span>{image ? image.name : "Click to change image"}</span>
                </div>
            </label>
            <input type="file" id="edit-product-image" hidden
                onChange={(e) => setImage(e.target.files[0])} />

            <div className="mb-3">
                <label className="form-label">Category</label>
                <select className="form-control" name="categoryId"
                    onChange={onChange} value={data.categoryId} required>
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.categoryId}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input type="text" name="productName" className="form-control"
                    value={data.productName} onChange={onChange} required />
            </div>
            <div className="edit-form-grid">
                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input type="number" name="productQuantity" className="form-control"
                        value={data.productQuantity} onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <div className="input-currency">
                        <span>&#8369;</span>
                        <input type="number" name="productPrice" className="form-control"
                            value={data.productPrice} onChange={onChange} required />
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea name="productDescription" className="form-control"
                    rows="3" value={data.productDescription} onChange={onChange} />
            </div>
            <button type="submit" className="form-submit-btn" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
        </form>
    );
};

export default InventoryEditForm;