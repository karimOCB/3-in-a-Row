import express from "express";
import matchesRoutes from "./routes/matches";
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", matchesRoutes);

const startServer = async () => {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("MONGO_DB_URL is not defined in the environment variables.");
  }

  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Invoke the function
startServer();