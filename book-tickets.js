// Helper function to navigate to theater selection
function bookTickets(movieId, movieTitle, genres, language) {
  const params = new URLSearchParams({
    movieId: movieId || '',
    title: encodeURIComponent(movieTitle || ''),
    genres: genres || '',
    language: language || ''
  });
  
  window.location.href = `theaters.html?${params.toString()}`;
}


