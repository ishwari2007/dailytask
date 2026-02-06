// ===============================
// Seat Selection Management
// ===============================
let selectedSeats = [];
let selectedDate = null;
let selectedTime = null;
let currentTheater = null;
let currentMovie = null;
let bookingInfo = null;

// ===============================
// Seat Pricing
// ===============================
function getSeatPrices() {
  if (currentTheater && typeof getSeatPricing !== "undefined") {
    return getSeatPricing(currentTheater.id);
  }
  return {
    PLATINUM: 350,
    GOLD: 250,
    SILVER: 180
  };
}

// ===============================
// Init on Load
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  loadBookingInfo();
  initializeDates();
  initializeSeats();
  setupDateSelection();
});

// ===============================
// Load Booking Info
// ===============================
function loadBookingInfo() {
  const params = new URLSearchParams(window.location.search);
  const theaterId = params.get("theaterId");
  const movieId = params.get("movieId");

  const stored = sessionStorage.getItem("bookingInfo");
  if (stored) bookingInfo = JSON.parse(stored);

  if (theaterId && typeof theatersData !== "undefined") {
    currentTheater = theatersData.find(t => t.id === parseInt(theaterId));
  } else if (bookingInfo) {
    currentTheater = theatersData.find(t => t.id === bookingInfo.theaterId);
  }

  if (movieId && typeof moviesData !== "undefined") {
    currentMovie = moviesData.find(m => m.id === parseInt(movieId));
  } else if (bookingInfo) {
    currentMovie = moviesData.find(m => m.id === bookingInfo.movieId);
  }

  updateHeader();
}

// ===============================
// Update Header
// ===============================
function updateHeader() {
  if (currentMovie) {
    document.getElementById("movie-title").textContent = currentMovie.title;
  }
  if (currentTheater) {
    document.getElementById("theater-name").textContent = currentTheater.name;
    document.getElementById("theater-location").textContent = `📍 ${currentTheater.location}`;
  }
}

// ===============================
// Dates
// ===============================
function initializeDates() {
  const container = document.getElementById("dates-container");
  const today = new Date();

  container.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const div = document.createElement("div");
    div.className = "date" + (i === 0 ? " active" : "");
    div.dataset.date = date.toISOString().split("T")[0];
    div.innerHTML = `
      <span class="day">${date.toLocaleDateString("en-US",{weekday:"short"}).toUpperCase()}</span>
      <span class="day-num">${date.getDate()}</span>
      <span class="month">${date.toLocaleDateString("en-US",{month:"short"}).toUpperCase()}</span>
    `;
    container.appendChild(div);
  }

  selectedDate = today.toISOString().split("T")[0];
  loadShowTimes();
}

function setupDateSelection() {
  document.getElementById("dates-container").addEventListener("click", e => {
    const dateEl = e.target.closest(".date");
    if (!dateEl) return;

    document.querySelectorAll(".date").forEach(d => d.classList.remove("active"));
    dateEl.classList.add("active");
    selectedDate = dateEl.dataset.date;
    loadShowTimes();
  });
}

// ===============================
// Showtimes
// ===============================
function loadShowTimes() {
  const container = document.getElementById("times-container");
  const timings = showTimings[currentTheater?.id] || showTimings[1];

  container.innerHTML = "";

  timings.forEach((time, i) => {
    const div = document.createElement("div");
    div.className = "time" + (i === 0 ? " active" : "");
    div.dataset.time = time;
    div.textContent = time;
    container.appendChild(div);
  });

  selectedTime = timings[0];

  container.onclick = e => {
    const t = e.target.closest(".time");
    if (!t) return;
    document.querySelectorAll(".time").forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    selectedTime = t.dataset.time;
    initializeSeats();
  };

  initializeSeats();
}

// ===============================
// Seats
// ===============================
function initializeSeats() {
  const prices = getSeatPrices();
  updateSeatPrices(prices);
  generateSeats("platinum-seats", ["A","B"], 10);
  generateSeats("gold-seats", ["C","D"], 10);
  generateSeats("silver-seats", ["E"], 10);
}

function updateSeatPrices(p) {
  document.querySelector('[data-type="PLATINUM"] .seat-type-price').textContent = `₹${p.PLATINUM}`;
  document.querySelector('[data-type="GOLD"] .seat-type-price').textContent = `₹${p.GOLD}`;
  document.querySelector('[data-type="SILVER"] .seat-type-price').textContent = `₹${p.SILVER}`;
}

function generateSeats(id, rows, count) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  rows.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "seat-row";

    for (let i = 1; i <= count; i++) {
      const seat = document.createElement("div");
      seat.className = "seat";
      seat.textContent = `${row}${i}`;
      seat.dataset.seatId = `${row}${i}`;
      seat.dataset.seatType = getSeatType(row);

      if (Math.random() < 0.15) {
        seat.classList.add("booked");
      } else {
        seat.onclick = () => toggleSeat(seat);
      }

      rowDiv.appendChild(seat);
    }
    container.appendChild(rowDiv);
  });
}

function getSeatType(row) {
  if (["A","B"].includes(row)) return "PLATINUM";
  if (["C","D"].includes(row)) return "GOLD";
  return "SILVER";
}

function toggleSeat(seat) {
  if (seat.classList.contains("booked")) return;

  const prices = getSeatPrices();
  const id = seat.dataset.seatId;
  const type = seat.dataset.seatType;

  if (seat.classList.contains("selected")) {
    seat.classList.remove("selected");
    selectedSeats = selectedSeats.filter(s => s.id !== id);
  } else {
    seat.classList.add("selected");
    selectedSeats.push({ id, type, price: prices[type] });
  }
  updateSummary();
}

// ===============================
// Summary
// ===============================
function updateSummary() {
  const list = document.getElementById("selected-seats-list");
  const price = document.getElementById("total-price");
  const btn = document.getElementById("proceed-btn");

  if (!selectedSeats.length) {
    list.textContent = "No seats selected";
    price.textContent = "0";
    btn.disabled = true;
    return;
  }

  const total = selectedSeats.reduce((s, x) => s + x.price, 0);
  list.textContent = selectedSeats.map(s => s.id).join(", ");
  price.textContent = total;
  btn.disabled = false;
}

// ===============================
// PAYMENT (RAZORPAY – JS ONLY)
// ===============================
async function proceedToPayment() {
  if (selectedSeats.length === 0) {
    alert("Please select seats");
    return;
  }

  const bookingData = {
    movie: currentMovie.title,
    theater: currentTheater.name,
    date: selectedDate,
    time: selectedTime,
    seats: selectedSeats.map(s => s.id),
    totalAmount: selectedSeats.reduce((sum, s) => sum + s.price, 0)
  };

  try {
    const response = await fetch("http://localhost:3000/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData)
    });

    const result = await response.json();

    if (result.success) {
      sessionStorage.setItem("bmsBooking", JSON.stringify(result.booking));
      window.location.href = "confirmation.html";
    } else {
      alert("Booking failed");
    }
  } catch (err) {
    alert("Server error. Try again.");
    console.error(err);
  }
}




// ===============================
// Save Booking
// ===============================
function saveBooking(paymentId, base, fee, gst) {
  sessionStorage.setItem("bmsBooking", JSON.stringify({
    paymentId,
    movie: currentMovie?.title,
    theater: currentTheater?.name,
    date: selectedDate,
    time: selectedTime,
    seats: selectedSeats,
    baseAmount: base,
    convenienceFee: fee,
    gst,
    totalAmount: base + fee + gst,
    status: "CONFIRMED",
    bookedAt: new Date().toLocaleString()
  }));
}

// ===============================
// Seat Lock Timer
// ===============================
let seatLockTime = 300;
setInterval(() => {
  seatLockTime--;
  if (seatLockTime === 0) {
    alert("⏰ Seat lock expired");
    location.reload();
  }
}, 1000);
