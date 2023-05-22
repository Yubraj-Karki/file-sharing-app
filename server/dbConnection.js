require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.DATABASE_URL;

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      connectTimeoutMS: 30000, // Set the connection timeout to 30 seconds (adjust as needed)
    });
    console.log("Connected to MongoDB!");

    // Perform database operations or start your application logic here
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectDB;
