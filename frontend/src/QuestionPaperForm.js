


import React, { useState } from 'react';
import LoadingIndicator from './LoadingIndicator';

function QuestionPaperForm({ onAddQuestion }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('maths');
  const [partAMarks, setPartAMarks] = useState(10);
  const [partBMarks, setPartBMarks] = useState(10);
  const [partACategory, setPartACategory] = useState(2);
  const [partBCategory, setPartBCategory] = useState(10);
  const [partAQuestions, setPartAQuestions] = useState([]);
  const [partBQuestions, setPartBQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const fetchSectionQuestions = async () => {
    setPartAQuestions([]);
    setPartBQuestions([]);
    setLoading(true);
    
    try {
      // Get authentication token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }
      
      // Using the new database-powered endpoint with authentication
      const response = await fetch(`http://localhost:3001/section-questions?subject=${subject}&partA_marks=${partAMarks}&partB_marks=${partBMarks}&partA_category=${partACategory}&partB_category=${partBCategory}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const data = await response.json();
      
      // Small delay for animation effect
      setTimeout(() => {
        setPartAQuestions(data.partA);
        setPartBQuestions(data.partB);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setLoading(false);
      alert("Failed to fetch questions. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!partAQuestions.length && !partBQuestions.length) {
      alert('Please fetch questions first!');
      return;
    }
    
    try {
      // Get authentication token
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to generate a PDF');
        return;
      }
      
      setPdfGenerating(true);
      const allQuestions = [
        ...partAQuestions.map(q => ({ ...q, section: 'Part A' })),
        ...partBQuestions.map(q => ({ ...q, section: 'Part B' }))
      ];
      const response = await fetch('http://localhost:3001/generate-pdf', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, questions: allQuestions, subject, totalMarks: partAMarks + partBMarks }),
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'question-paper.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Error generating PDF. Please try again.');
      console.error(error);
    } finally {
      setPdfGenerating(false);
    }
  };

  return (
    <form className="qp-form" onSubmit={handleSubmit}>
      <h2 className="qp-title">Create Question Paper</h2>
      
      <div className="qp-section">
        <h3 className="qp-section-title">Basic Information</h3>
        <div style={{ marginBottom: '15px' }}>
          <label className="qp-label">Paper Title</label>
          <input
            className="qp-input"
            type="text"
            placeholder="Enter paper title here"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="qp-label">Subject</label>
          <select className="qp-select" value={subject} onChange={e => setSubject(e.target.value)}>
            <option value="maths">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <div className="qp-section" style={{ flex: 1, minWidth: '250px' }}>
          <h3 className="qp-section-title">Part A Configuration</h3>
          <div style={{ marginBottom: '15px' }}>
            <label className="qp-label">Total Marks</label>
            <input
              className="qp-input"
              type="number"
              min={partACategory}
              max={20}
              step={partACategory}
              value={partAMarks}
              onChange={e => setPartAMarks(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="qp-label">Question Category</label>
            <select className="qp-select" value={partACategory} onChange={e => setPartACategory(Number(e.target.value))}>
              <option value={2}>2 marks</option>
              <option value={3}>3 marks</option>
              <option value={5}>5 marks</option>
            </select>
          </div>
        </div>

        <div className="qp-section" style={{ flex: 1, minWidth: '250px' }}>
          <h3 className="qp-section-title">Part B Configuration</h3>
          <div style={{ marginBottom: '15px' }}>
            <label className="qp-label">Total Marks</label>
            <input
              className="qp-input"
              type="number"
              min={partBCategory}
              max={50}
              step={partBCategory}
              value={partBMarks}
              onChange={e => setPartBMarks(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="qp-label">Question Category</label>
            <select className="qp-select" value={partBCategory} onChange={e => setPartBCategory(Number(e.target.value))}>
              <option value={5}>5 marks</option>
              <option value={10}>10 marks</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="qp-action-row">
        <button 
          className="qp-btn" 
          type="button" 
          onClick={fetchSectionQuestions} 
          disabled={loading}
        >
          {loading ? <><LoadingIndicator type="dots" /> Fetching...</> : 'Fetch Questions'}
        </button>
        
        <button 
          className="qp-btn qp-btn-secondary" 
          type="button" 
          onClick={onAddQuestion}
        >
          Add New Question
        </button>
      </div>

      {(partAQuestions.length > 0 || partBQuestions.length > 0) && (
        <div style={{ marginTop: '25px' }}>
          <div className="qp-section">
            <h3 className="qp-section-title">
              Part A Questions ({partACategory} marks each)
            </h3>
            {partAQuestions.length > 0 ? (
              <ul className="question-list" style={{ padding: '0 10px' }}>
                {partAQuestions.map((q, i) => (
                  <li 
                    key={i} 
                    style={{ 
                      margin: '10px 0', 
                      color: '#b3b3b3',
                      padding: '10px 12px',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span className="question-text">
                      {q.text} <span className="question-marks">({q.marks} marks)</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ 
                color: '#b3b3b3', 
                fontStyle: 'italic',
                padding: '15px',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '4px'
              }}>
                No questions fetched
              </p>
            )}
          </div>

          <div className="qp-section" style={{ marginTop: '20px' }}>
            <h3 className="qp-section-title">
              Part B Questions ({partBCategory} marks each)
            </h3>
            {partBQuestions.length > 0 ? (
              <ul className="question-list" style={{ padding: '0 10px' }}>
                {partBQuestions.map((q, i) => (
                  <li 
                    key={i} 
                    style={{ 
                      margin: '10px 0', 
                      color: '#b3b3b3',
                      padding: '10px 12px',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span className="question-text">
                      {q.text} <span className="question-marks">({q.marks} marks)</span>
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ 
                color: '#b3b3b3', 
                fontStyle: 'italic',
                padding: '15px',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '4px'
              }}>
                No questions fetched
              </p>
            )}
          </div>
          
          <div className="qp-action-row" style={{ marginTop: '25px' }}>
            <button 
              className="qp-btn" 
              type="submit" 
              disabled={(!partAQuestions.length && !partBQuestions.length) || pdfGenerating}
            >
              {pdfGenerating ? <><LoadingIndicator /> Generating...</> : 'Generate PDF'}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default QuestionPaperForm;
