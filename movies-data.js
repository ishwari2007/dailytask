// Centralized Movie Data
const moviesData = [
  {
    id: 1,
    title: "Ikkis",
    poster: "ikkis.avif",
    backdrop: "cast/ikk.jfif",
    rating: 8.5,
    votes: "20.5K",
    genres: ["Action", "Drama", "Historical", "War"],
    language: "Hindi",
    duration: "2h 27m",
    format: ["2D"],
    certificate: "UA",
    releaseDate: "1 Jan 2026",
    description: "Woh Ikkis Ka Tha, Ikkis Ka Hi Rahega! An untold true story of India's youngest Param Vir Chakra awardee - Second Lieutenant Arun Khetarpal.",
    detailPage: "ikkis.html",
    ticketPage: "dticket.html",
    cast: [
      { name: "Dharmendra", role: "M.L.Khetrapal", image: "cast/dharm.avif" },
      { name: "Jaideep Ahlawat", role: "Actor", image: "cast/jai.avif" },
      { name: "Agastya Nanda", role: "Arun Khetrapal", image: "cast/aga.avif" },
      { name: "Deepak Dobirayal", role: "Actor", image: "cast/deep.avif" }
    ]
  },
  {
    id: 2,
    title: "Dhurandhar",
    poster: "dhurandhar.avif",
    backdrop: "cast/download.jfif",
    rating: 8.1,
    votes: "45K",
    genres: ["Action", "Thriller"],
    language: "Hindi",
    duration: "3h 30m",
    format: ["2D", "IMAX"],
    certificate: "UA",
    releaseDate: "5 Dec 2025",
    description: "A genre-bending, edge-of-the-seat action thriller with big stars playing iconic characters. Told with audacious swagger, the story follows a mysterious 'traveller' as he slips into the heart of Karachi's underbelly.",
    detailPage: "details.html",
    ticketPage: "dticket.html",
    cast: [
      { name: "Ranveer Singh", role: "Hamza Ali Mazari", image: "cast/ranveer.avif" },
      { name: "Akshaye Khanna", role: "Rehman Dakait", image: "cast/akshay.avif" },
      { name: "Sanjay Dutt", role: "SP Chaudhary Aslam", image: "cast/rmadhvan.avif" }
    ]
  },
  {
    id: 3,
    title: "Krantijyoti Vidyalay Marathi Madhyam",
    poster: "kranti.avif",
    backdrop: "cast/kr.jfif",
    rating: 7.9,
    votes: "45K",
    genres: ["Drama", "Comedy"],
    language: "Marathi",
    duration: "2h 29m",
    format: ["2D", "IMAX"],
    certificate: "UA",
    releaseDate: "1 Jan 2026",
    description: "A heartfelt tribute to the Marathi-medium schools celebrating their enduring values, rich culture, vital learnings, and timeless nostalgia.",
    detailPage: "kranti.html",
    ticketPage: "kticket.html",
    cast: [
      { name: "Sachin Khedekar", role: "Actor", image: "cast/sachin.avif" },
      { name: "Amey Wagh", role: "Actor", image: "cast/amey.avif" },
      { name: "Prajakta Koli", role: "Actor", image: "cast/praju.avif" }
    ]
  },
  {
    id: 4,
    title: "Zootopia 2",
    poster: "zoo.avif",
    backdrop: "cast/zoot.jfif",
    rating: 9.1,
    votes: "20.5K",
    genres: ["Adventure", "Animation", "Comedy"],
    language: "Hindi",
    duration: "2h 25m",
    format: ["2D", "ICE 3D", "4DX 3D", "IMAX 2D", "MX4D 3D", "3D SCREEN X", "IMAX 3D", "DOLBY CINEMA 3D", "3D"],
    certificate: "UA",
    releaseDate: "28 Nov 2025",
    description: "Get ready to race back into the wild, colorful world of Zootopia, where animals talk, hustle, and chase their dreams - just like us!",
    detailPage: "zootopia.html",
    ticketPage: "dticket.html",
    cast: [
      { name: "Shraddha Kapoor", role: "Judy Hopps (Hindi)", image: "cast/shraddha.avif" },
      { name: "Ginnifer Goodwin", role: "Judy Hopps", image: "cast/genifer.avif" },
      { name: "Jason Bateman", role: "Nick Wilde", image: "cast/jason.avif" }
    ]
  },
  {
    id: 5,
    title: "Tu Meri Main Tera Main Tera Tu Meri",
    poster: "tu meri.avif",
    backdrop: "cast/tb.jfif",
    rating: 9.6,
    votes: "45K",
    genres: ["Comedy", "Romantic"],
    language: "Hindi",
    duration: "2h 25m",
    format: ["2D", "IMAX"],
    certificate: "UA",
    releaseDate: "25 Dec 2025",
    description: "Two souls find love in the midst of self-discovery, but family expectations test their bond, leaving them with only hope for a reunion.",
    detailPage: "tumeri.html",
    ticketPage: "dticket.html",
    cast: [
      { name: "Kartik Aaryan", role: "Ray Mehra", image: "cast/kartik.avif" },
      { name: "Ananya Pandey", role: "Rumi", image: "cast/ananya.avif" },
      { name: "Jackie Shroff", role: "Wardhan Singh", image: "cast/jacky.avif" }
    ]
  },
  {
    id: 6,
    title: "Uttar",
    poster: "uttar.avif",
    backdrop: "cast/uttar.avif",
    rating: 8.6,
    votes: "20.5K",
    genres: ["Drama", "Family"],
    language: "Marathi",
    duration: "1h 58m",
    format: ["2D"],
    certificate: "UA",
    releaseDate: "12 Dec 2025",
    description: "A quiet, emotionally charged drama about Uma, a radio presenter who has raised her son Ninad alone. As Ninad pursues his ambitious career, distance grows between them until an unexpected project brings them back together.",
    detailPage: "uttar.html",
    ticketPage: "dticket.html",
    cast: [
      { name: "Renuka Shahane", role: "Uma Bhalerao", image: "cast/renu.avif" },
      { name: "Abhinay Berde", role: "Ninad", image: "cast/abhi.avif" },
      { name: "Hruta Durgule", role: "Actor", image: "cast/hruta.avif" }
    ]
  },
  {
    id: 7,
    title: "Avatar: Fire and Ash",
    poster: "avatar.avif",
    backdrop: "cast/adventure.jfif",
    rating: 9.0,
    votes: "50K",
    genres: ["Action", "Adventure", "Sci-Fi"],
    language: "English",
    duration: "3h 12m",
    format: ["2D", "3D", "IMAX 3D", "4DX 3D"],
    certificate: "UA",
    releaseDate: "18 Dec 2025",
    description: "Return to Pandora in this epic continuation of the Avatar saga, exploring new worlds and challenges.",
    detailPage: "avatar.html",
    ticketPage: "dticket.html",
    cast: []
  },
  {
    id: 8,
    title: "45",
    poster: "45.avif",
    backdrop: "cast/backdrop.jpg",
    rating: 8.8,
    votes: "15K",
    genres: ["Drama", "Biography"],
    language: "Hindi",
    duration: "2h 15m",
    format: ["2D"],
    certificate: "U",
    releaseDate: "15 Dec 2025",
    description: "An inspiring biographical drama based on true events.",
    detailPage: "details.html",
    ticketPage: "dticket.html",
    cast: []
  }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = moviesData;
}


