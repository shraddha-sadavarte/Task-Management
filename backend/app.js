import express from 'express'

const app = express();

app.use("/", (req,res) => {
    res.send("Hello from backend side")
});

const port = 1000

app.listen(port, () => {console.log("Server Started")})

