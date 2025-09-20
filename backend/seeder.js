const connectDB = require('./config/db');
const Question = require('./models/Question');
const questionsData = require('./questionsData');

const importData = async () => {
  try {
    const conn = await connectDB();
    
    // Log database info
    console.log(`Connected to database: ${conn.connection.name}`);
    console.log(`Using collection: ${Question.collection.name}`);
    
    // Clear existing data
    await Question.deleteMany();
    console.log('Cleared existing data');
    
    // Prepare questions from questionsData
    const questions = [];
    
    for (const subject in questionsData) {
      questionsData[subject].forEach(q => {
        questions.push({
          text: q.text,
          marks: q.marks,
          subject: subject
        });
      });
    }
    
    // Insert questions into database
    const result = await Question.insertMany(questions);
    
    console.log(`Data imported successfully! Added ${result.length} questions.`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
