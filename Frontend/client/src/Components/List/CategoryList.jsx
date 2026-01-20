import './CategoryList.css';

const CategoryList = () => {
    const categories = [
        { id: 1, name: 'Electronics', description: 'Electronic devices', status: 'Active' },
        { id: 2, name: 'Clothing', description: 'Apparel and accessories', status: 'Active' },
        { id: 3, name: 'Books', description: 'Books and magazines', status: 'Inactive' },
    ];

    return (
        <div className="category-list">
            <table className="category-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <span className={`status-badge ${category.status.toLowerCase()}`}>
                                    {category.status}
                                </span>
                            </td>
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
};

export default CategoryList;