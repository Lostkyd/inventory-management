import { useContext } from 'react';
import { AppContext } from '../../Context/Context';
import './InventoryList.css';

const InventoryList = () => {
    const { products, setProducts } = useContext(AppContext);

    const handleDelete = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts(products.filter(p => p.productId !== productId));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Unable to delete product");
        }
    };

    return (
        <div className="inventory-list">
            <table className="inventory-table">
                <thead>
                    <tr>
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
                    {products.map((product) => (
                        <tr key={product.productId}>
                            <td><img src={product.imgUrl} alt={product.productName} width={48} /></td>
                            <td>{product.productName}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.productQuantity}</td>
                            <td>{product.productPrice}</td>
                            <td>{product.productDescription}</td>
                            <td>
                                <button className="btn-edit" title="Edit">
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn-delete" title="Delete"
                                    onClick={() => handleDelete(product.productId)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default InventoryList;