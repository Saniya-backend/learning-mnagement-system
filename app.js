require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes= require("./routes/dashboardRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const app = express();
 require("./config/db");


app.use(cors());
app.use(express.json());
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/courses",courseRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("LMS backend running");
});

app.listen(5000,()=>{
     console.log("Server Running");
 });

module.exports = app;