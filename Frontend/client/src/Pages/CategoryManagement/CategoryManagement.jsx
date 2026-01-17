import { useState } from 'react'
import CategoryForm from '../../Components/Forms/CategoryForm'
import CategoryList from '../../Components/List/CategoryList'
import './CategoryManagement.css'

const CategoryManagement = () => {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="category-container text-light">

            <div className="category-header">
                <button
                    className="add-category-btn"
                    onClick={() => setShowModal(true)}
                >
                    Add Category
                </button>
            </div>

            <CategoryList />

            {showModal && (
                <div
                    className="custom-modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="custom-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="custom-modal-header">
                            <h5>Add Category</h5>
                            <button
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <CategoryForm
                            onSubmit={(e) => {
                                e.preventDefault()
                                setShowModal(false)
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default CategoryManagement
