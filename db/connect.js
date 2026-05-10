const { MongoClient } = require("mongodb"); // Import the official MongoDB driver

const client = new MongoClient(process.env.MONGODB_URI); // Create a client using the connection string from .env

let db; // Will hold the connected database so we only connect once

async function connectDB() {
  // Open a connection (on first call) and return the database
  if (!db) {
    // If we haven't connected yet
    await client.connect(); // Establish a network connection to MongoDB
    db = client.db("cse340"); // Select the 'cse340' database (as indicated in your URI path)
    console.log("Connected to MongoDB"); // Confirm connection in the server logs
  }

  return db; // Hand back the database handle for queries
}

module.exports = connectDB; // Export so routes/controllers can call connectDB()
