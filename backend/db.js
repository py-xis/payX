const { MongoClient } = require("mongodb");

const MONGO_URI = "mongodb+srv://pranavkulkarni062004:NvYZNpNFrp5EPqcK@cluster0.pwb6a.mongodb.net/?retryWrites=true&w=majority";

let dbInstance = null;

// Function to connect to the database and return the instance
async function connectToDatabase() {
    if (!dbInstance) {
        try {
            const client = new MongoClient(MONGO_URI);
            await client.connect();
            dbInstance = client.db("payX"); // Use your database name
            console.log("Connected to MongoDB");
        } catch (err) {
            console.error("Failed to connect to MongoDB:", err.message);
            throw err;
        }
    }
    return dbInstance;
}

module.exports = { connectToDatabase };