import './App.css'
import Menubar from './Components/Menubar/Menubar'
import CategoryManagement from './Pages/CategoryManagement/CategoryManagement'
import Dashboard from './Pages/Dashboard/Dashboard'
import Explore from './Pages/Explore/Explore'
import InventoryManagement from './Pages/InventoryManagement/InventoryManagement'
import UserManagement from './Pages/UserManagement/UserManagement'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import LandingPage from './Pages/Landing/LandingPage'
import { useLocation } from 'react-router-dom'

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // ✅ pages that should NOT show Menubar
  const noMenubarRoutes = ['/', '/landing', '/login', '/signup'];
  const showMenubar = !noMenubarRoutes.includes(location.pathname);

  return (
    <div>
      {showMenubar && (
        <Menubar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}
      <Toaster />
      <main className={showMenubar ? `main-content ${isCollapsed ? 'collapsed' : ''}` : ''}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/landing' element={<LandingPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/category' element={<CategoryManagement />} />
          <Route path='/users' element={<UserManagement />} />
          <Route path='/inventory' element={<InventoryManagement />} />
          <Route path='/explore' element={<Explore />} />
        </Routes>
      </main>
    </div>
  )
}

export default App