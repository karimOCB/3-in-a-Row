import express from "express";
import matchesRoutes from "./routes/matches";
import mongoose from "mongoose"

const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  console.log("someone pinged here!!");
  res.send("pong");
});

app.use("/matches", matchesRoutes);

async () => {
  if (!process.env.MONGO_DB_URL) {
    throw new Error("MONGO_DB_URL is not defined in the environment variables.");
  }
  await mongoose.connect(process.env.MONGO_DB_URL);

  
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:{PORT}`);
  });
}

