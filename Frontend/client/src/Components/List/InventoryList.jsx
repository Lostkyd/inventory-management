import { useContext, useMemo} from 'react';
import { AppContext } from '../../Context/Context';
import { deleteProduct } from '../../Services/product/ProductServices';
import { toast } from 'react-hot-toast';
import './InventoryList.css';

const InventoryList = ({ searchTerm }) => {
    const { products, setProducts } = useContext(AppContext);

    const filteredProducts = useMemo(() => {
            return products.filter(product =>
                product.productName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                product.productDescription
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                product.categoryName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
        }, [products, searchTerm]);

    const deleteProductById = async (productId) => {
        try {
            const response = await deleteProduct(productId);
            if(response.status === 204){
                const updatedProducts = products.filter(product => product.productId !== productId);
                setProducts(updatedProducts);
                toast.success("Product deleted successfully");
            }else{
                toast.error("Unable to delete product");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete product");
        }
    };

    return (
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
                            <td>{product.productPrice}</td>
                            <td>{product.productDescription}</td>
                            <td>
                                <button className="btn-edit" title="Edit">
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn-delete" title="Delete"
                                    onClick={() => deleteProductById(product.productId)}>
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