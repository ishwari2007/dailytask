// Comprehensive Content Database for BookMyShow
// This includes Movies, Events, Plays, Sports, Activities

// Events Data
const eventsData = [
  {
    id: 1,
    type: 'event',
    title: "Satrangi Re – Sonu Nigam Live",
    image: "cast/satrangi.avif",
    category: "Music",
    date: "2026-01-10",
    time: "7:00 PM",
    venue: "Mahalaxmi Lawns, Kharadi, Pune",
    city: "Pune",
    price: 1999,
    priceRange: "₹1,999 onwards",
    description: "Experience the magic of Sonu Nigam live in concert as he performs his most iconic hits in an unforgettable musical evening.",
    duration: "3hrs",
    language: "Hindi",
    tags: ["Music", "Live Concert", "Bollywood"]
  },
  {
    id: 2,
    type: 'event',
    title: "Arijit Singh Live Concert",
    image: "cast/arijit.jfif",
    category: "Music",
    date: "2026-01-15",
    time: "7:30 PM",
    venue: "Jio World Garden, Mumbai",
    city: "Mumbai",
    price: 2499,
    priceRange: "₹2,499 onwards",
    description: "The voice of the nation, Arijit Singh, performs live in an exclusive concert.",
    duration: "3hrs",
    language: "Hindi",
    tags: ["Music", "Live Concert", "Bollywood"]
  },
  {
    id: 3,
    type: 'event',
    title: "Stand-up Comedy Night",
    image: "cast/pranit.jfif",
    category: "Comedy",
    date: "2026-01-25",
    time: "8:00 PM",
    venue: "Comedy Store, Pune",
    city: "Pune",
    price: 499,
    priceRange: "₹499 onwards",
    description: "Laugh out loud with top comedians in an evening of non-stop entertainment.",
    duration: "2hrs",
    language: "Hindi/English",
    tags: ["Comedy", "Stand-up"]
  },
  {
    id: 4,
    type: 'event',
    title: "Photography Workshop",
    image: "cast/photo.jfif",
    category: "Workshop",
    date: "2026-01-21",
    time: "10:00 AM",
    venue: "Art Gallery, Delhi",
    city: "Delhi",
    price: 1499,
    priceRange: "₹1,499 onwards",
    description: "Learn professional photography techniques from industry experts.",
    duration: "6hrs",
    language: "English",
    tags: ["Workshop", "Photography", "Education"]
  },
  {
    id: 5,
    type: 'event',
    title: "Kids Fun Carnival",
    image: "cast/kids.jfif",
    category: "Kids",
    date: "2026-01-25",
    time: "11:00 AM",
    venue: "Fun City, Bangalore",
    city: "Bangalore",
    price: 299,
    priceRange: "₹299 onwards",
    description: "A fun-filled day with games, rides, and activities for kids.",
    duration: "4hrs",
    language: "All",
    tags: ["Kids", "Family", "Entertainment"]
  },
  {
    id: 6,
    type: 'event',
    title: "Online Tech Talk",
    image: "cast/tech.jfif",
    category: "Online",
    date: "2026-01-28",
    time: "6:00 PM",
    venue: "Online",
    city: "Online",
    price: 0,
    priceRange: "FREE",
    description: "Join industry leaders for insights on the latest tech trends.",
    duration: "2hrs",
    language: "English",
    tags: ["Tech", "Online", "Education"]
  }
];

// Plays Data
const playsData = [
  {
    id: 1,
    type: 'play',
    title: "The Silent House",
    image: "cast/silent.jfif",
    genre: "Drama",
    language: "Hindi",
    date: "2026-01-14",
    time: "7:00 PM",
    venue: "Prithvi Theatre, Mumbai",
    city: "Mumbai",
    price: 599,
    priceRange: "₹599 onwards",
    description: "A powerful drama exploring family relationships and secrets.",
    duration: "2hrs",
    tags: ["Drama", "Theatre", "Hindi"]
  },
  {
    id: 2,
    type: 'play',
    title: "Laugh Till You Cry",
    image: "cast/laugh.jfif",
    genre: "Comedy",
    language: "English",
    date: "2026-01-15",
    time: "8:00 PM",
    venue: "Ranga Shankara, Bangalore",
    city: "Bangalore",
    price: 499,
    priceRange: "₹499 onwards",
    description: "A hilarious comedy that will keep you entertained throughout.",
    duration: "2hrs",
    tags: ["Comedy", "Theatre", "English"]
  },
  {
    id: 3,
    type: 'play',
    title: "Rhythm of Life",
    image: "cast/rythm.jfif",
    genre: "Musical",
    language: "Hindi",
    date: "2026-01-20",
    time: "7:30 PM",
    venue: "Kamani Auditorium, Delhi",
    city: "Delhi",
    price: 799,
    priceRange: "₹799 onwards",
    description: "A mesmerizing musical journey through the rhythms of life.",
    duration: "2.5hrs",
    tags: ["Musical", "Theatre", "Hindi"]
  },
  {
    id: 4,
    type: 'play',
    title: "Kutumb Kirtan",
    image: "cast/kutumb.jfif",
    genre: "Drama",
    language: "Marathi",
    date: "2026-01-25",
    time: "7:00 PM",
    venue: "Bal Gandharva Rangmandir, Pune",
    city: "Pune",
    price: 399,
    priceRange: "₹399 onwards",
    description: "A heartwarming Marathi play about family values and traditions.",
    duration: "2hrs",
    tags: ["Drama", "Theatre", "Marathi"]
  },
  {
    id: 5,
    type: 'play',
    title: "Hamlet",
    image: "cast/hamlet.jfif",
    genre: "Classic",
    language: "English",
    date: "2026-01-28",
    time: "7:30 PM",
    venue: "NCPA, Mumbai",
    city: "Mumbai",
    price: 699,
    priceRange: "₹699 onwards",
    description: "Shakespeare's timeless classic brought to life on stage.",
    duration: "3hrs",
    tags: ["Classic", "Theatre", "English", "Shakespeare"]
  }
];

// Sports Data
const sportsData = [
  {
    id: 1,
    type: 'sport',
    title: "India vs New Zealand - ODI",
    image: "cast/india.jfif",
    sport: "Cricket",
    category: "Cricket",
    date: "2026-01-11",
    time: "2:00 PM",
    venue: "Wankhede Stadium, Mumbai",
    city: "Mumbai",
    price: 1499,
    priceRange: "₹1,499 onwards",
    description: "Watch India take on New Zealand in an exciting ODI match.",
    duration: "8hrs",
    tags: ["Cricket", "ODI", "International"]
  },
  {
    id: 2,
    type: 'sport',
    title: "ISL: Mumbai City FC vs FC Goa",
    image: "cast/goa.jfif",
    sport: "Football",
    category: "Football",
    date: "2026-01-18",
    time: "7:30 PM",
    venue: "Mumbai Football Arena",
    city: "Mumbai",
    price: 799,
    priceRange: "₹799 onwards",
    description: "High-octane football action in the Indian Super League.",
    duration: "2hrs",
    tags: ["Football", "ISL", "Club Match"]
  },
  {
    id: 3,
    type: 'sport',
    title: "Badminton Open Championship",
    image: "cast/bad.jfif",
    sport: "Badminton",
    category: "Badminton",
    date: "2026-01-21",
    time: "10:00 AM",
    venue: "Gachibowli Indoor Stadium, Hyderabad",
    city: "Hyderabad",
    price: 499,
    priceRange: "₹499 onwards",
    description: "Watch top badminton players compete in this championship.",
    duration: "6hrs",
    tags: ["Badminton", "Championship", "Indoor"]
  },
  {
    id: 4,
    type: 'sport',
    title: "City Marathon 2025",
    image: "cast/marathon.jfif",
    sport: "Running",
    category: "Marathon",
    date: "2026-01-29",
    time: "5:30 AM",
    venue: "Marine Drive, Pune",
    city: "Pune",
    price: 999,
    priceRange: "₹999 onwards",
    description: "Join thousands of runners in this annual marathon event.",
    duration: "4hrs",
    tags: ["Marathon", "Running", "Fitness"]
  },
  {
    id: 5,
    type: 'sport',
    title: "Esports Championship",
    image: "cast/esport.jfif",
    sport: "Gaming",
    category: "Esports",
    date: "2026-01-05",
    time: "6:00 PM",
    venue: "Online",
    city: "Online",
    price: 299,
    priceRange: "₹299 onwards",
    description: "Watch top esports players compete in various games.",
    duration: "6hrs",
    tags: ["Esports", "Gaming", "Online"]
  }
];

// Combined search function
function searchAllContent(query) {
  const results = {
    movies: [],
    events: [],
    plays: [],
    sports: []
  };
  
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return results;
  
  // Search in movies
  if (typeof moviesData !== 'undefined') {
    results.movies = moviesData.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genres.some(g => g.toLowerCase().includes(searchTerm)) ||
      movie.language.toLowerCase().includes(searchTerm)
    );
  }
  
  // Search in events
  results.events = eventsData.filter(event =>
    event.title.toLowerCase().includes(searchTerm) ||
    event.category.toLowerCase().includes(searchTerm) ||
    event.city.toLowerCase().includes(searchTerm) ||
    event.tags.some(t => t.toLowerCase().includes(searchTerm))
  );
  
  // Search in plays
  results.plays = playsData.filter(play =>
    play.title.toLowerCase().includes(searchTerm) ||
    play.genre.toLowerCase().includes(searchTerm) ||
    play.language.toLowerCase().includes(searchTerm) ||
    play.tags.some(t => t.toLowerCase().includes(searchTerm))
  );
  
  // Search in sports
  results.sports = sportsData.filter(sport =>
    sport.title.toLowerCase().includes(searchTerm) ||
    sport.sport.toLowerCase().includes(searchTerm) ||
    sport.category.toLowerCase().includes(searchTerm) ||
    sport.tags.some(t => t.toLowerCase().includes(searchTerm))
  );
  
  return results;
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { eventsData, playsData, sportsData, searchAllContent };
}


