import express from 'express';
import connectDB from './conn/conn.js'; 
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from backend side");
});

app.use("/api/v1",userRoutes);



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
