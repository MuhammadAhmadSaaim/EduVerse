const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
  };

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Connect to MongoDB
connectDB();



// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/courses", require("./routes/course"));
app.use("/api/content", require("./routes/contentRoutes")); // Add content routes
app.use("/api/user", require("./routes/user"));

// Add other routes as necessary

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
