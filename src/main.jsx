import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from '../src/components/ErrorBoundary'; // Import the ErrorBoundary component
import '../src/styles/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application wrapped in the ErrorBoundary component
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
