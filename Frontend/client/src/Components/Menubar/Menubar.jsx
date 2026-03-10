import './Menubar.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuth } from "../Hooks/useAuth";

const Menubar = ({ isCollapsed, setIsCollapsed }) => {
    const { logout } = useAuth();

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <nav className={`sidebar d-flex flex-column flex-shrink-0 position-fixed ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="toggle-btn" onClick={toggleSidebar}>
                <i className={`bi bi-chevron-${isCollapsed ? 'right' : 'left'}`}></i>
            </button>

            <div className="p-4 logo-container text-center">
                <h4 className="logo-text fw-bold mb-0">Ronn's Shop</h4>
                <img 
                    src={logo}
                        alt="Logo"
                    className="collapsed-logo"
                />
            </div>

            <div className="nav flex-column">
                <Link to="/dashboard" className="sidebar-link text-decoration-none">
                    <i className="bi bi-house-door-fill"></i>
                    <span className="hide-on-collapse ms-3">Dashboard</span>
                </Link>
                <Link to="/order" className="sidebar-link text-decoration-none">
                    <i className="bi bi-compass-fill"></i>
                    <span className="hide-on-collapse ms-3">Order</span>
                </Link>
                <Link to="/inventory" className="sidebar-link text-decoration-none">
                    <i className="bi bi-box-seam-fill"></i>
                    <span className="hide-on-collapse ms-3">Inventory Management</span>
                </Link>
                <Link to="/category" className="sidebar-link text-decoration-none">
                    <i className="bi bi-folder-fill"></i>
                    <span className="hide-on-collapse ms-3">Category Management</span>
                </Link>
                <Link to="/users" className="sidebar-link text-decoration-none">
                    <i className="bi bi-people-fill"></i>
                    <span className="hide-on-collapse ms-3">User Management</span>
                </Link>
            </div>

            <div className="profile-section mt-auto p-4">
                <div className="d-flex align-items-center">
                    <img
                        src="https://randomuser.me/api/portraits/women/70.jpg"
                        className="profile-avatar"
                        alt="Profile"
                    />
                    <div className="ms-3 profile-info">
                        <h6 className="text-white mb-0">Alex Morgan</h6>
                        <small className="text-white-50">Admin</small>
                    </div>
                </div>
                <button className="logout-btn mt-3" onClick={logout}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span className="hide-on-collapse ms-3">Logout</span>
                </button>
            </div>
        </nav>
    );
};

export default Menubar;