import React, { useState } from 'react';
import ProductsAdmin from './ProductsAdmin';
import UsersAdmin from './UsersAdmin';
import OrdersAdmin from './OrdersAdmin';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('products');

  return (
    <div>
      <h2>Admin Panel</h2>
      <nav>
        <button onClick={() => setActiveTab('products')} disabled={activeTab === 'products'}>Products</button>
        <button onClick={() => setActiveTab('users')} disabled={activeTab === 'users'}>Users</button>
        <button onClick={() => setActiveTab('orders')} disabled={activeTab === 'orders'}>Orders</button>
      </nav>
      <div>
        {activeTab === 'products' && <ProductsAdmin />}
        {activeTab === 'users' && <UsersAdmin />}
        {activeTab === 'orders' && <OrdersAdmin />}
      </div>
    </div>
  );
}

export default AdminPanel;
