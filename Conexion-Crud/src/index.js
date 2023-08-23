const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const padreRoute = require('./routes/users');

// const authRoutes = require("./routes/auth");

// const verifyToken = require('./routes/validate-token');
const cors = require('cors');


const app = express();
const port =  8888

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false})); // Parse JSON 
app.use(cors());


// Routes

app.use('/api', padreRoute);

// app.use('/api/user', authRoutes);
// app.use('/api/dashboard', verifyToken, dashboardRoutes)


// MongoDB connection
mongoose.connect('mongodb+srv://fender99:Oscuro34@cluster0.vioixrk.mongodb.net/proyectopecera?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});






