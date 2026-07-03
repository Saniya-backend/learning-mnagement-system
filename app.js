require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const app = express();
 require("./config/db");


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("LMS backend running");
});

app.listen(5000,()=>{
     console.log("Server Running");
 });

module.exports = app;