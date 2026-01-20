import './InventoryList.css';

const InventoryList = () => {
      const products = [
        { id: 1, productName: 'Electronics', quantity: '10', price: '200.00', productDescription: 'Various electronic items' },
        { id: 2, productName: 'Clothing', quantity: '20', price: '50.00', productDescription: 'Various clothing items' },
        { id: 3, productName: 'Books', quantity: '50', price: '15.00', productDescription: 'Various books and magazines' },
    ];
  return (
    <div className="inventory-list">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
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