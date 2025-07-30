// admin-panel/src/App.jsx
import React, { useState } from 'react'; // useState is correctly imported here
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import AdminLogin from './components/AdminLogin';
import ProtectedAdminRoute from './context/ProtectedAdminRoute';
import './admin.css';

function App() {
    const [editingProduct, setEditingProduct] = useState(null); // CORRECTED LINE: removed '=' after setEditingProduct
    const navigate = useNavigate();

    const handleClearEdit = () => {
        setEditingProduct(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        alert('Logged out successfully.');
        navigate('/admin/login');
    };

    const [refreshProducts, setRefreshProducts] = useState(0);
    const triggerProductRefresh = () => setRefreshProducts(prev => prev + 1);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Admin Panel</h1>
                {localStorage.getItem('token') && (
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                )}
            </header>

            <main className="app-main">
                <Routes>
                    <Route path="/admin/login" element={<AdminLogin />} />

                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedAdminRoute>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <>
                                                <ProductForm
                                                    editingProduct={editingProduct}
                                                    onClearEdit={handleClearEdit}
                                                    onProductSubmit={triggerProductRefresh}
                                                />
                                                <ProductList
                                                    onEdit={setEditingProduct}
                                                    refreshTrigger={refreshProducts}
                                                    onDeleteSuccess={triggerProductRefresh}
                                                />
                                            </>
                                        }
                                    />
                                </Routes>
                            </ProtectedAdminRoute>
                        }
                    />
                    <Route path="/" element={<AdminLogin />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;