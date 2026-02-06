// Theater Database with Ambiance-based Pricing
const theatersData = [
  {
    id: 1,
    name: "PVR Cinemas",
    location: "Phoenix Marketcity, Viman Nagar",
    distance: "2.3 km",
    rating: 4.5,
    facilities: ["Parking", "Food Court", "IMAX", "Dolby Atmos"],
    formats: ["2D", "3D", "IMAX", "4DX"],
    recommended: true,
    nearby: true,
    ambiance: "premium", // luxury, premium, standard, budget
    priceMultiplier: 1.3 // 30% premium for premium ambiance
  },
  {
    id: 2,
    name: "INOX Cinemas",
    location: "Koregaon Park Plaza",
    distance: "3.1 km",
    rating: 4.3,
    facilities: ["Parking", "Food Court", "Recliner Seats"],
    formats: ["2D", "3D", "IMAX"],
    recommended: true,
    nearby: true,
    ambiance: "premium",
    priceMultiplier: 1.25
  },
  {
    id: 3,
    name: "Cinepolis",
    location: "Amanora Mall, Hadapsar",
    distance: "5.2 km",
    rating: 4.4,
    facilities: ["Parking", "Food Court", "VIP Lounge"],
    formats: ["2D", "3D"],
    recommended: false,
    nearby: true,
    ambiance: "standard",
    priceMultiplier: 1.0
  },
  {
    id: 4,
    name: "CityPride Cinemas",
    location: "Kothrud",
    distance: "8.5 km",
    rating: 4.2,
    facilities: ["Parking", "Snacks"],
    formats: ["2D"],
    recommended: false,
    nearby: false,
    ambiance: "budget",
    priceMultiplier: 0.85
  },
  {
    id: 5,
    name: "E-Square Multiplex",
    location: "Shivajinagar",
    distance: "4.7 km",
    rating: 4.1,
    facilities: ["Parking", "Food Court"],
    formats: ["2D", "3D"],
    recommended: false,
    nearby: true,
    ambiance: "standard",
    priceMultiplier: 1.0
  },
  {
    id: 6,
    name: "Wave Cinemas",
    location: "Aundh",
    distance: "6.8 km",
    rating: 4.0,
    facilities: ["Parking", "Food Court"],
    formats: ["2D", "3D"],
    recommended: false,
    nearby: false,
    ambiance: "standard",
    priceMultiplier: 1.0
  },
  {
    id: 7,
    name: "PVR ICON",
    location: "Pavilion Mall, Koregaon Park",
    distance: "3.5 km",
    rating: 4.6,
    facilities: ["Parking", "Luxury Seats", "IMAX", "Dolby Cinema"],
    formats: ["2D", "3D", "IMAX", "4DX 3D", "DOLBY CINEMA 3D"],
    recommended: true,
    nearby: true,
    ambiance: "luxury",
    priceMultiplier: 1.5
  },
  {
    id: 8,
    name: "INOX Megaplex",
    location: "Seasons Mall, Magarpatta",
    distance: "7.2 km",
    rating: 4.3,
    facilities: ["Parking", "Food Court", "Recliner"],
    formats: ["2D", "3D", "IMAX"],
    recommended: false,
    nearby: false,
    ambiance: "premium",
    priceMultiplier: 1.25
  }
];

// Show timings for each theater
const showTimings = {
  1: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM", "10:30 PM"],
  2: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM", "11:00 PM"],
  3: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
  4: ["12:00 PM", "3:00 PM", "6:00 PM", "9:00 PM"],
  5: ["10:30 AM", "1:30 PM", "4:30 PM", "7:30 PM"],
  6: ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"],
  7: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"],
  8: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"]
};

// Seat availability for each show (simplified - in real app this would be from backend)
function getSeatAvailability(theaterId, date, time) {
  // Random seat availability for demo
  const totalSeats = { A: 10, B: 10, C: 10, D: 10, E: 10 };
  const bookedSeats = {};
  
  Object.keys(totalSeats).forEach(row => {
    bookedSeats[row] = [];
    const numBooked = Math.floor(Math.random() * 4); // 0-3 booked seats per row
    for (let i = 0; i < numBooked; i++) {
      const seatNum = Math.floor(Math.random() * totalSeats[row]) + 1;
      if (!bookedSeats[row].includes(seatNum)) {
        bookedSeats[row].push(seatNum);
      }
    }
  });
  
  return { totalSeats, bookedSeats };
}

// Base seat pricing (will be multiplied by theater ambiance)
const baseSeatPricing = {
  PLATINUM: 350,
  GOLD: 250,
  SILVER: 180
};

// Get dynamic pricing based on theater ambiance
function getSeatPricing(theaterId) {
  const theater = theatersData.find(t => t.id === theaterId);
  const multiplier = theater ? theater.priceMultiplier : 1.0;
  
  return {
    PLATINUM: Math.round(baseSeatPricing.PLATINUM * multiplier),
    GOLD: Math.round(baseSeatPricing.GOLD * multiplier),
    SILVER: Math.round(baseSeatPricing.SILVER * multiplier)
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { theatersData, showTimings, getSeatAvailability, seatPricing };
}

