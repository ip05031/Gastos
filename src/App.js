import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GastosForm from './components/GastosForm';
import UserForm from './components/UserForm';

function App() {
  return (
    <Router basename="/Gastos">
      <Routes>
        <Route path="/" element={<GastosForm />} />
        <Route path="/musr" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
