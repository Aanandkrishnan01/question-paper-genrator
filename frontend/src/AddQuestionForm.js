import React, { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';

function AddQuestionForm({ onQuestionAdded }) {
  const [subject, setSubject] = useState('maths');
  const [text, setText] = useState('');
  const [marks, setMarks] = useState(2);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      // Get authentication token
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You must be logged in to add questions');
        setLoading(false);
        return;
      }
      
      const response = await fetch('http://localhost:3001/add-question', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject, text, marks }),
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Question added successfully to database!');
        setText('');
        setMarks(2);
        // Wait a moment to show success message, then call onQuestionAdded
        setTimeout(() => {
          if (onQuestionAdded) onQuestionAdded(data.question);
        }, 1500);
      } else {
        setMessage('Error adding question to database.');
      }
    } catch (error) {
      console.error("Error details:", error);
      setMessage('Connection error. Please check if the backend server is running.');
    }
    setLoading(false);
  };

  return (
    <>
      <h2 className="qp-title">Add New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="qp-section">
          <div style={{ marginBottom: '15px' }}>
            <label className="qp-label">Subject</label>
            <select className="qp-select" value={subject} onChange={e => setSubject(e.target.value)}>
              <option value="maths">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label className="qp-label">Question Text</label>
            <textarea 
              className="qp-input" 
              value={text} 
              onChange={e => setText(e.target.value)} 
              required 
              rows={3}
              style={{ resize: 'vertical', minHeight: '100px', width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          
          <div>
            <label className="qp-label">Marks</label>
            <select className="qp-select" value={marks} onChange={e => setMarks(Number(e.target.value))}>
              <option value={2}>2 marks</option>
              <option value={3}>3 marks</option>
              <option value={5}>5 marks</option>
              <option value={10}>10 marks</option>
            </select>
          </div>
        </div>
        
        <div className="qp-action-row" style={{ marginTop: '20px' }}>
          <button 
            className="qp-btn" 
            type="submit" 
            disabled={loading}
          >
            {loading ? <><LoadingIndicator type="dots" /> Adding...</> : 'Add Question'}
          </button>
        </div>
        
        {message && (
          <div style={{ 
            color: message.includes('success') ? '#1DB954' : '#ff6b6b', 
            marginTop: 15,
            padding: '10px 15px',
            background: message.includes('success') ? 'rgba(29, 185, 84, 0.1)' : 'rgba(255, 107, 107, 0.1)',
            borderRadius: '4px',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {message}
          </div>
        )}
      </form>
    </>
  );
}

export default AddQuestionForm;
