const CategoryForm = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="categoryName" className="form-label">
                    Category Name
                </label>
                <input
                    type="text"
                    id="categoryName"
                    className="form-control"
                    placeholder="Enter category name"
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
                    placeholder="Optional description"
                />
            </div>

            <button type="submit" className="btn btn-success w-100">
                Save Category
            </button>
        </form>
    )
}

export default CategoryForm
