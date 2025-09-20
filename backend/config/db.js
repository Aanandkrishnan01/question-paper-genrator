const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // MongoDB Atlas connection string - explicitly setting the database name to "questionpaper"
    const conn = await mongoose.connect('mongodb+srv://aanand:Aanand%400@project.ylnfr71.mongodb.net/questionpaper?retryWrites=true&w=majority&appName=project', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Don't exit process immediately, try to continue with in-memory fallback
    console.log('Using in-memory MongoDB fallback...');
    
    try {
      // If we can't connect to Atlas, try using mongodb-memory-server
      // Note: You'd need to install this with: npm install mongodb-memory-server
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      
      const localConn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log(`In-Memory MongoDB Connected: ${localConn.connection.host}`);
      return localConn;
    } catch (err) {
      console.error(`In-memory MongoDB error: ${err.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
