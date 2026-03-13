import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAllCategories, deleteCategory } from "../../Services/category/CategoryServices";
import CategoryEditForm from "../Forms/Admin/CategoryEditForm";
import "./CategoryList.css";
import toast from "react-hot-toast";

const CategoryList = ({ searchTerm }) => {
    const queryClient = useQueryClient();
    const [editingCategory, setEditingCategory] = useState(null);

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await fetchAllCategories();
            return response.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (categoryId) => deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category deleted successfully");
        },
        onError: (error) => {
            console.error(error);
            toast.error("Unable to delete category");
        }
    });

    const filteredCategories = useMemo(() => {
        return categories.filter(category =>
            category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.categoryDescription?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    if (isLoading) return <div className="no-results"><p>Loading...</p></div>;

    return (
        <>
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
                                            <img src={category.imgUrl} alt={category.categoryName} />
                                        </div>
                                        <div>
                                            <h5 className="category-name">{category.categoryName}</h5>
                                            <span className="category-count">
                                                {category.productCount} {category.productCount === 1 ? "Item" : "Items"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="category-actions">
                                        <button className="btn-edit" title="Edit"
                                            onClick={() => setEditingCategory(category)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn-delete" title="Delete"
                                            onClick={() => deleteMutation.mutate(category.categoryId)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="category-card-body">
                                    <p className="category-description">{category.categoryDescription}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {editingCategory && (
                <div className="custom-modal-overlay" onClick={() => setEditingCategory(null)}>
                    <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="custom-modal-header">
                            <h5>Edit Category</h5>
                            <button className="close-btn" onClick={() => setEditingCategory(null)}>✕</button>
                        </div>
                        <CategoryEditForm
                            category={editingCategory}
                            onClose={() => setEditingCategory(null)}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default CategoryList;