import './App.css'
import Menubar from './Components/Menubar/Menubar'
import CategoryManagement from './Pages/Admin/CategoryManagement/CategoryManagement'
import Dashboard from './Pages/Dashboard/Dashboard'
import Order from './Pages/Admin/Order/Order'
import InventoryManagement from './Pages/Admin/InventoryManagement/InventoryManagement'
import UserManagement from './Pages/Admin/UserManagement/UserManagement'
import LandingPage from './Pages/Landing/LandingPage'
import AdminRoute from './Components/Routes/AdminRoute'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

const App = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();

    const noMenubarRoutes = ['/', '/landing'];
    const showMenubar = !noMenubarRoutes.includes(location.pathname);

    return (
        <div>
            {showMenubar && (
                <Menubar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            )}
            <Toaster />
            <main className={showMenubar ? `main-content ${isCollapsed ? 'collapsed' : ''}` : ''}>
                <Routes>
                    {/* public */}
                    <Route path='/' element={<LandingPage />} />
                    <Route path='/landing' element={<LandingPage />} />

                    {/* admin only */}
                    <Route path='/dashboard' element={<AdminRoute element={<Dashboard />} />} />
                    <Route path='/category' element={<AdminRoute element={<CategoryManagement />} />} />
                    <Route path='/users' element={<AdminRoute element={<UserManagement />} />} />
                    <Route path='/inventory' element={<AdminRoute element={<InventoryManagement />} />} />
                    <Route path='/order' element={<AdminRoute element={<Order />} />} />

                    {/* catch-all */}
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;