const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// API to get movies
app.get("/api/movies", (req, res) => {
  const moviesPath = path.join(__dirname, "movies.json");
  const movies = JSON.parse(fs.readFileSync(moviesPath, "utf-8"));
  res.json(movies);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
let bookings = []; // temporary in-memory DB

// Create booking (before payment)
app.post("/api/bookings", (req, res) => {
  const { movieId, seats, amount } = req.body;

  const booking = {
    id: Date.now(),
    movieId,
    seats,
    amount,
    status: "PENDING"
  };

  bookings.push(booking);

  res.json({
    success: true,
    bookingId: booking.id
  });
});
// In-memory bookings (temporary DB)
let bookings = [];

// Create booking
app.post("/api/bookings", (req, res) => {
  const {
    movie,
    theater,
    date,
    time,
    seats,
    totalAmount
  } = req.body;

  if (!movie || !theater || !date || !time || !seats || seats.length === 0) {
    return res.status(400).json({ message: "Invalid booking data" });
  }

  const booking = {
    id: Date.now(),
    movie,
    theater,
    date,
    time,
    seats,
    totalAmount,
    status: "CONFIRMED",
    bookedAt: new Date()
  };

  bookings.push(booking);

  res.json({
    success: true,
    booking
  });
});
