// React 18 imports for creating the root element and strict mode
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Main App component and global styles
import App from './App.tsx';
import './index.css';

// Create the React root element and render the app
// StrictMode helps identify potential problems in development
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
