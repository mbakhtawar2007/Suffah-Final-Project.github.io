import React, { useState } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

const App = () => {
  const [editingProduct, setEditingProduct] = useState(null); // null means create mode

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Panel - ShopEase</h1>

      <ProductForm
        editingProduct={editingProduct}
        onClearEdit={() => setEditingProduct(null)}
      />

      <hr style={{ margin: '30px 0' }} />

      <ProductList onEdit={(product) => setEditingProduct(product)} />
    </div>
  );
};

export default App;
