import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PolicyholderForm from './components/Policyholders/PolicyholderForm';
import ClaimForm from './components/Claims/ClaimForm';
import PolicyForm from './components/Policies/PolicyForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-policyholder" element={<PolicyholderForm />} />
        <Route path='/add-policy' element={<PolicyForm />} />
        <Route path='/add-claim' element={<ClaimForm />} />
      </Routes>
    </Router>
  );
}

export default App;