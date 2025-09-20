import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Call logout callback
    onLogout();
    
    // Navigate to login page
    navigate('/login');
  };
  
  return (
    <nav className="navbar">
      <motion.div 
        className="navbar-brand"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">Question Paper Generator</Link>
      </motion.div>
      
      <motion.div 
        className="navbar-menu"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {user ? (
          <>
            <span className="navbar-welcome">Welcome, {user.username}!</span>
            <button 
              className="navbar-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link navbar-button">Register</Link>
          </>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;
