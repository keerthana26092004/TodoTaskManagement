const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
const app = express();


mongoose.connect("mongodb+srv://keerthanaravikumar188:keerthu123@cluster0.wfcwchf.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.use(cors());
app.use(express.json()); 


app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});