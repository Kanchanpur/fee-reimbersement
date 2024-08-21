import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EducationReimbursementForm from './pages/EducationReimbursementForm';
import EducationReimbursementView from './pages/EducationReimbursementView';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
     
        <Route path="/" element={<LoginPage/>} />  
        <Route path="/Dashboard" element={<Dashboard/>} />     
        <Route path="/Eduform" element={<EducationReimbursementForm />} />
        <Route path="/Eduview" element={<EducationReimbursementView />} />
      </Routes>
    </Router>
  );
}

export default App;
