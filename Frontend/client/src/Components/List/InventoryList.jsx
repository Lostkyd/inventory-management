import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllProducts, deleteProduct } from "../../Services/product/ProductServices";
import InventoryEditForm from "../Forms/Admin/InventoryEditForm";
import { toast } from "react-hot-toast";
import "./InventoryList.css";

const InventoryList = ({ searchTerm }) => {
    const queryClient = useQueryClient();
    const [editingProduct, setEditingProduct] = useState(null);

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await fetchAllProducts();
            return response.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (productId) => deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Product deleted successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Unable to delete product");
        }
    });

    const filteredProducts = useMemo(() => {
        return products.filter(product =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.productDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [products, searchTerm]);

    if (isLoading) return <div><p>Loading...</p></div>;

    return (
        <>
            <div className="inventory-list">
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={product.productId}>
                                <td>{index + 1}</td>
                                <td><img src={product.imgUrl} alt={product.productName} width={48} /></td>
                                <td>{product.productName}</td>
                                <td>{product.categoryName}</td>
                                <td>{product.productQuantity}</td>
                                <td>₱{Number(product.productPrice).toLocaleString('en-PH')}</td>
                                <td>{product.productDescription}</td>
                                <td>
                                    <button className="btn-edit" title="Edit"
                                        onClick={() => setEditingProduct(product)}>
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn-delete" title="Delete"
                                        onClick={() => deleteMutation.mutate(product.productId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {editingProduct && (
                <div className="custom-modal-overlay" onClick={() => setEditingProduct(null)}>
                    <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="custom-modal-header">
                            <h5>Edit Product</h5>
                            <button className="close-btn" onClick={() => setEditingProduct(null)}>✕</button>
                        </div>
                        <InventoryEditForm
                            product={editingProduct}
                            onClose={() => setEditingProduct(null)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default InventoryList;