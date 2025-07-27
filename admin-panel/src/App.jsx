// admin-panel/src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import AdminLogin from './components/AdminLogin'; // Import the new login component
import ProtectedAdminRoute from './context/ProtectedAdminRoute'; // We'll create this next
// import './index.css'; // Your main admin CSS
import './admin.css'; // Your admin-specific CSS

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  const handleClearEdit = () => {
    setEditingProduct(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    sessionStorage.removeItem('token'); // Clear from session storage too, if used
    alert('Logged out successfully.');
    navigate('/admin/login'); // Redirect to login page
  };

  // State to trigger product list refresh. This is a common pattern for CRUD.
  const [refreshProducts, setRefreshProducts] = useState(0); 
  const triggerProductRefresh = () => setRefreshProducts(prev => prev + 1);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Admin Panel</h1>
        {localStorage.getItem('token') && ( // Show logout button if token exists
          <button onClick={handleLogout} className="logout-button">Logout</button>
        )}
      </header>
      
      <main className="app-main">
        <Routes>
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedAdminRoute>
                {/* Nested routes for authenticated admin users */}
                <Routes>
                  <Route 
                    path="/" 
                    element={
                      <>
                        <ProductForm 
                          editingProduct={editingProduct} 
                          onClearEdit={handleClearEdit} 
                          onProductSubmit={triggerProductRefresh} // Pass refresh prop
                        />
                        <ProductList 
                          onEdit={setEditingProduct} 
                          refreshTrigger={refreshProducts} // Pass refresh prop
                          onDeleteSuccess={triggerProductRefresh} // Pass refresh prop
                        />
                      </>
                    } 
                  />
                  {/* Potentially other admin routes here like /admin/users, /admin/orders etc. */}
                </Routes>
              </ProtectedAdminRoute>
            } 
          />
          {/* Redirect root to admin login initially if no token */}
          <Route path="/" element={<AdminLogin />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;