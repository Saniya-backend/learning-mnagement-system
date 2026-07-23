require("dotenv").config();
require("./config/db");
const express = require("express");
const cors = require("cors");
const required = [
  "DB_HOST",
  "DB_USER",
  "DB_PASSWORD",
  "DB_NAME",
  "JWT_SECRET"
];

required.forEach((key) => {
  if (!process.env[key]) {
    console.error(`${key} missing`);
    process.exit(1);
  }
});
const planRoutes = require("./routes/planRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes= require("./routes/dashboardRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const videoRoutes = require("./routes/videoRoutes");
const progressRoutes = require("./routes/progressRoutes");
const app = express();



app.use(cors());
app.use(express.json());

app.use("/api/teacher",teacherRoutes);
app.use("/api/organization",organizationRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/category",categoryRoutes);
app.use("/api/course",courseRoutes);
app.use("/api/enrollment",enrollmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/plans", planRoutes);
app.get("/", (req, res) => {
    res.send("LMS backend running");
});

app.listen(5000,()=>{
     console.log("Server Running");
 });
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
}); 
module.exports = app;