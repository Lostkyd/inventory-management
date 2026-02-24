import { useState } from 'react'
import InventoryForm from '../../Components/Forms/InventoryForm'
import InventoryList from '../../Components/List/InventoryList'
import './InventoryManagement.css'

const InventoryManagement = () => {
    const [showModal, setShowModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <div className="inventory-container text-light">
            <div className="inventory-header">
                <h2>Product List</h2>
                <div className="header-actions">
                    <div className="search-container">
                        <input 
                            type="text" 
                            className="form-control search-input" 
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="bi bi-search search-icon"></i>
                    </div>
                    <button
                        className="add-inventory-btn"
                        onClick={() => setShowModal(true)}
                    >
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Product
                    </button>
                </div>
            </div>

            <div className="inventory-list-wrapper">
                <InventoryList searchTerm={searchTerm} />
            </div>

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

                        <InventoryForm
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

export default InventoryManagement;