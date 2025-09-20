
// Entry point for Express backend
const express = require('express');
const PDFDocument = require('pdfkit');
const cors = require('cors');
const connectDB = require('./config/db');
const Question = require('./models/Question');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();
const port = 3001;

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Add a question to the backend
app.post('/add-question', authMiddleware, async (req, res) => {
    try {
        const { subject, text, marks } = req.body;
        if (!subject || !text || !marks) {
            return res.status(400).json({ error: 'Invalid input' });
        }
        
        const newQuestion = new Question({
            subject,
            text,
            marks: Number(marks)
        });
        
        await newQuestion.save();
        res.json({ success: true, question: newQuestion });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to get questions by section
app.get('/section-questions', authMiddleware, async (req, res) => {
    try {
        const subject = req.query.subject;
        const partA_marks = parseInt(req.query.partA_marks, 10);
        const partB_marks = parseInt(req.query.partB_marks, 10);
        const partA_category = parseInt(req.query.partA_category, 10) || 2;
        const partB_category = parseInt(req.query.partB_category, 10) || 10;
        
        if (!subject) {
            return res.status(400).json({ error: 'Invalid subject' });
        }
        
        // Find questions for Part A
        const partAQuestions = await Question.find({ 
            subject: subject, 
            marks: partA_category 
        }).limit(Math.floor(partA_marks / partA_category));
        
        // Find questions for Part B
        const partBQuestions = await Question.find({ 
            subject: subject, 
            marks: partB_category 
        }).limit(Math.floor(partB_marks / partB_category));
        
        res.json({ 
            partA: partAQuestions, 
            partB: partBQuestions 
        });
    } catch (error) {
        console.error('Error fetching section questions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Endpoint to get questions by subject and total marks
app.get('/questions', authMiddleware, async (req, res) => {
    try {
        const subject = req.query.subject;
        const totalMarks = parseInt(req.query.totalMarks, 10);
        
        if (!subject) {
            return res.status(400).json({ error: 'Invalid subject' });
        }
        
        // Get all questions for the subject
        const questions = await Question.find({ subject: subject }).sort('marks');
        
        // Select questions to match total marks
        let selected = [];
        let sum = 0;
        for (let q of questions) {
            if (sum + q.marks <= totalMarks) {
                selected.push(q);
                sum += q.marks;
            }
            if (sum >= totalMarks) break;
        }
        
        res.json({ questions: selected, total: sum });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// PDF generation endpoint
app.post('/generate-pdf', authMiddleware, (req, res) => {
    const { title, questions, subject, totalMarks } = req.body;
    const doc = new PDFDocument({ margin: 50 });
    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    // Draw border
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;
    doc.rect(40, 40, pageWidth - 80, pageHeight - 80).stroke();

    // Centered header
    doc.fontSize(25).text(title || 'Question Paper', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(18).text(`Subject: ${subject || ''}`, { align: 'center' });
    doc.fontSize(16).text(`Total Marks: ${totalMarks || ''}`, { align: 'center' });
    doc.moveDown(1);

    // Group questions by section
    const partA = questions.filter(q => q.section === 'Part A');
    const partB = questions.filter(q => q.section === 'Part B');
    if (partA.length) {
        doc.fontSize(18).text('Part A (2-mark questions)', { align: 'left' }).moveDown(0.5);
        partA.forEach((q, i) => {
            doc.fontSize(14).text(`${i + 1}. ${q.text} (${q.marks} marks)`, { align: 'left', indent: 20 });
        });
        doc.moveDown();
    }
    if (partB.length) {
        doc.fontSize(18).text('Part B (10-mark questions)', { align: 'left' }).moveDown(0.5);
        partB.forEach((q, i) => {
            doc.fontSize(14).text(`${i + 1}. ${q.text} (${q.marks} marks)`, { align: 'left', indent: 20 });
        });
    }

    doc.end();
});

// API endpoint to get all questions
app.get('/api/questions', authMiddleware, async (req, res) => {
    try {
        const questions = await Question.find({});
        res.json(questions);
    } catch (error) {
        console.error('Error fetching all questions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// API endpoint to get questions by subject
app.get('/api/questions/:subject', authMiddleware, async (req, res) => {
    try {
        const { subject } = req.params;
        const questions = await Question.find({ subject });
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions by subject:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});
