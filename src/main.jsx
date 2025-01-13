import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Error boundary for rendering issues
try {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error('Error rendering the application:', error);
}
