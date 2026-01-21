import './InventoryList.css';

const InventoryList = () => {
      const products = [
        { id: 1, productName: 'Washing Machine', category: 'Electronics', quantity: '10', price: '200.00', productDescription: 'Panglaba' },
        { id: 2, productName: 'Skirt', category: 'Clothing', quantity: '20', price: '50.00', productDescription: 'Damit mo`to tanga' },
        { id: 3, productName: 'Pencils', category: 'Books', quantity: '50', price: '15.00', productDescription: 'Pangsaksak sa olo' },
    ];
  return (
    <div className="inventory-list">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Product Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{product.productDescription}</td>
                                    {product.status}
                            <td>
                                <button className="btn-edit" title="Edit">
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn-delete" title="Delete">
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