import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import ProductList from './pages/ProductList';
import ProtectedRoute from './components/ProtectedRoute';
import PrivateRoute from './components/PrivateRoute';
import CountryDetail from './pages/CountryDetail';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route 
          path="/product-list" 
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route 
          path="/country/:code" 
          element={
            <PrivateRoute>
              <CountryDetail />
            </PrivateRoute>
          }
        />
         {/* Default route to handle the base path */}
         <Route path="/" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
