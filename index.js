const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authController = require('./controllers/authController');
const employeeController = require('./controllers/employeeController');
const authMiddleware = require('./utils/auth');
dotenv.config();

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://ppcommercial31:punit12@cluster0.ogkgxal.mongodb.net/mernstack?retryWrites=true&w=majority&appName=AtlasApp`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.post('/signup', authController.signup);
app.post('/login', authController.login);
app.post('/employee/create', authMiddleware, employeeController.createEmployee);
app.get('/employee', authMiddleware, employeeController.getEmployees);
app.put('/employee/edit/:employeeId', authMiddleware, employeeController.editEmployee);
app.delete('/employee/delete/:employeeId', authMiddleware, employeeController.deleteEmployee);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
