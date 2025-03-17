import express from 'express';
import connectDB from './conn/conn.js'; 
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import TaskAPI from './routes/task.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello from backend side");
});

//routes
app.use("/api/v1",userRoutes);
app.use("/api/v2",TaskAPI);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
