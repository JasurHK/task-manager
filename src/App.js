import React from 'react';
import AppRoutes from './routes.js';
import './styles.css'; // Global Styles (add basic styles here)
import TestDragDrop from './TestDragDrop.js';

const App = () => {
  return (
    <div className="App">
      <AppRoutes />
      
    </div>
  );
  // return <TestDragDrop />;
}

export default App;
