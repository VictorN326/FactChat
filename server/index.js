const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

// Load the dotenv configuration
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;

// Use middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
