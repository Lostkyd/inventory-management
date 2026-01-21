import { useContext, useMemo } from "react";
import { AppContext } from "../../Context/Context";
import "./CategoryList.css";

const CategoryList = ({ searchTerm }) => {
    const { categories } = useContext(AppContext);

    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.categoryName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            category.categoryDescription
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    return (
        <div className="category-list">

            {filteredCategories.length === 0 ? (
                <div className="no-results">
                    <i className="bi bi-search fs-1"></i>
                    <p>No categories found</p>
                </div>
            ) : (
                <div className="category-grid">
                    {filteredCategories.map((category, index) => (
                        <div key={index} className="category-card">

                            <div className="category-card-header">
                                <div className="category-info">
                                    <div className="category-image">
                                        <img
                                            src={category.imgUrl}
                                            alt={category.categoryName}
                                        />
                                    </div>
                                    <h5 className="category-name">
                                        {category.categoryName}
                                    </h5>
                                </div>
                                <div className="category-actions">
                                    <button className="btn-edit" title="Edit">
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button className="btn-delete" title="Delete">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="category-card-body">
                                <p className="category-description">
                                    {category.categoryDescription}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryList;
