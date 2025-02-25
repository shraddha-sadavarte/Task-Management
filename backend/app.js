import express from 'express';
import connectDB from './conn/conn.js'; 

const app = express();

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from backend side");
});

const port = 1000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
