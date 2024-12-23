import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import createHttpError, {isHttpError} from "http-errors";
import mongoose from "mongoose";
import matchesRoutes from "./routes/matches";
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // Frontend origin
  credentials: true, // Allow credentials (cookies)
}))
app.use(express.json());
app.use(cookieParser()) // allow you to access your cookies from the request

const PORT = process.env.PORT || 3000;

app.use("/api", matchesRoutes);

app.use((_req, _res, next) => {
  next(createHttpError(404, "Endpoint not found"))
})

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

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