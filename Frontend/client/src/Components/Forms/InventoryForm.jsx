const InventoryForm = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                    Product Name
                </label>
                <input
                    type="text"
                    id="productName"
                    className="form-control"
                    placeholder="Enter product name"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                    Quantity
                </label>
                <input
                    type="number"
                    id="quantity"
                    className="form-control"
                    placeholder="Enter quantity"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input
                    type="number"
                    id="price"
                    className="form-control"
                    placeholder="Enter price"
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    id="description"
                    className="form-control"
                    rows="3"
                    placeholder="Product description"
                />
            </div>

            <button type="submit" className="btn btn-success w-100">
                Save Product
            </button>
        </form>
    )
}

export default InventoryForm;
