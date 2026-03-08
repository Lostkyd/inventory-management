import { useState } from 'react';
import UserForm from '../../Components/Forms/UserForm';
import UserList from '../../Components/List/UserList';
import './UserManagement.css';

const UserManagement = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [step, setStep] = useState(1);

    const handleCloseModal = () => {
        if (step === 1) {
            setShowModal(false);
            setStep(1);
        }
    };

    return (
        <div className="user-container">
            <div className="user-header">
                <h2>User List</h2>
                <div className="header-actions">
                    <div className="search-container">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <i className="bi bi-search search-icon"></i>
                    </div>
                    <button className="add-user-btn" onClick={() => setShowModal(true)}>
                        <i className="bi bi-plus-circle me-2"></i>
                        Add User
                    </button>
                </div>
            </div>

            <div className="user-list-wrapper">
                <UserList searchTerm={searchTerm} />
            </div>

            {showModal && (
                <div className="custom-modal-overlay" onClick={handleCloseModal}>
                    <div className="custom-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="custom-modal-header">
                            <h5>Add User</h5>
                            {step === 1 && (
                                <button className="close-btn" onClick={handleCloseModal}>✕</button>
                            )}
                        </div>
                        <UserForm
                            step={step}
                            setStep={setStep}
                            onUserAdded={() => { setShowModal(false); setStep(1); }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserManagement;