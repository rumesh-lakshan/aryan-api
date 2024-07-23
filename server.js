const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require('path');
const dbConnection = require("./utils/database");

const app = express();

app.use(cors({ origin: 'https://www.aryanrentacarandtours.com' }));
app.use(express.json());

const port = process.env.PORT || 5000;

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'build')));

// Import routes
const userRoute = require("./routes/user/user.routes");
const carRoute = require("./routes/vehicles/car.routes");
const bookingRouter = require("./routes/vehicles/booking.routes");

// Define API routes
app.use("/api/users/", userRoute);
app.use("/api/cars/", carRoute);
app.use("/api/bookings/", bookingRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Car renting system!");
});

// Serve frontend index.html for all other routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Node JS Server Started on port ${port}`);
  dbConnection.connectDB();
});
