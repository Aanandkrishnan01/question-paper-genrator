
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Components
import QuestionPaperForm from './QuestionPaperForm';
import AddQuestionForm from './AddQuestionForm';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import IntroAnimation from './components/intro/IntroAnimation';

function App() {
  const [user, setUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [animateBackground, setAnimateBackground] = useState(false);
  // Show intro animation by default
  const [showIntro, setShowIntro] = useState(true);

  // Check for user in local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Hide intro animation after 3 seconds
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  // Create a background animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateBackground(prev => !prev);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div 
        className="App"
        style={{ 
          transition: 'background-position 8s ease',
          backgroundPosition: animateBackground ? 'right bottom' : 'left top'
        }}
      >
        {showIntro && <IntroAnimation />}
        
        <Navbar user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
          } />
          
          <Route path="/register" element={
            user ? <Navigate to="/" /> : <Register onLogin={handleLogin} />
          } />
          
          <Route path="/" element={
            user ? (
              <>
                <QuestionPaperForm onAddQuestion={() => setShowAddForm(true)} />
                
                {showAddForm && (
                  <div className="qp-modal">
                    <div 
                      className="qp-modal-content"
                      onClick={e => e.stopPropagation()}
                    >
                      <button 
                        className="qp-modal-close" 
                        onClick={() => setShowAddForm(false)}
                      >
                        ×
                      </button>
                      <AddQuestionForm onQuestionAdded={() => setShowAddForm(false)} />
                    </div>
                  </div>
                )}
              </>
            ) : <Navigate to="/login" />
          } />

          {/* Catch-all route to redirect to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
