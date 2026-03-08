import { useState, useMemo } from "react";
import { assets } from "../../assets/assets";
import { addProduct } from "../../Services/product/ProductServices";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAllCategories } from "../../Services/category/CategoryServices";

const InventoryForm = ({ onProductAdded }) => {
    const queryClient = useQueryClient();
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        categoryId: "",
        productName: "",
        productQuantity: "",
        productPrice: "",
        productDescription: ""
    });

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await fetchAllCategories();
            return response.data;
        }
    });

    const imagePreview = useMemo(() => {
        return image ? URL.createObjectURL(image) : assets.upload;
    }, [image]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const mutation = useMutation({
        mutationFn: (formData) => addProduct(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Product added successfully");
            setData({ categoryId: "", productName: "", productQuantity: "", productPrice: "", productDescription: "" });
            setImage(false);
            if (onProductAdded) onProductAdded();
        },
        onError: (error) => {
            console.error(error);
            toast.error("Unable to add product");
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please select an image for the product");
            return;
        }
        const formData = new FormData();
        formData.append("product", JSON.stringify(data));
        formData.append("file", image);
        mutation.mutate(formData);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    <img src={imagePreview} alt="Product" width={48} />
                </label>
                <input type="file" id="image" name="image" className="form-control" hidden
                    onChange={(e) => setImage(e.target.files[0])} />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select className="form-control" name="categoryId" id="category"
                    onChange={onChange} value={data.categoryId} required>
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.categoryId}>{category.categoryName}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">Product Name</label>
                <input type="text" name="productName" id="productName" className="form-control"
                    placeholder="Enter product name" onChange={onChange} value={data.productName} required />
            </div>
            <div className="mb-3">
                <label htmlFor="productQuantity" className="form-label">Quantity</label>
                <input type="number" id="productQuantity" name="productQuantity" className="form-control"
                    placeholder="Enter quantity" onChange={onChange} value={data.productQuantity} required />
            </div>
            <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">Price</label>
                <input type="number" id="productPrice" name="productPrice" className="form-control"
                    placeholder="Enter price" onChange={onChange} value={data.productPrice} required />
            </div>
            <div className="mb-3">
                <label htmlFor="productDescription" className="form-label">Description</label>
                <textarea id="productDescription" name="productDescription" className="form-control"
                    rows="3" placeholder="Product description" onChange={onChange} value={data.productDescription} />
            </div>
            <button type="submit" className="btn btn-success w-100" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Save Product"}
            </button>
        </form>
    );
};

export default InventoryForm;