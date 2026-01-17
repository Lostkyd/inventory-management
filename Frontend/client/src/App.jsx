import './App.css'
import Menubar from './Components/Menubar/Menubar'
import CategoryManagement from './Pages/CategoryManagement/CategoryManagement'
import Dashboard from './Pages/Dashboard/Dashboard'
import Explore from './Pages/Explore/Explore'
import InventoryManagement from './Pages/InventoryManagement/InventoryManagement'
import UserManagement from './Pages/UserManagement/UserManagement'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

const App = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div>
      <Menubar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className={`main-content ${isCollapsed ? 'collapsed' : ''}`}>
        <Routes>
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