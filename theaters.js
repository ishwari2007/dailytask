// Theater Selection Management
let allTheaters = [...theatersData];
let filteredTheaters = [...theatersData];
let currentMovie = null;
let activeFilter = 'all';

// Get movie info from URL parameters
function getMovieFromURL() {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get('movieId');
  const movieTitle = params.get('title') || decodeURIComponent(params.get('title') || '');
  const movieGenres = params.get('genres') || '';
  const movieLanguage = params.get('language') || '';
  
  if (movieId && typeof moviesData !== 'undefined') {
    currentMovie = moviesData.find(m => m.id === parseInt(movieId));
  } else if (movieTitle) {
    currentMovie = {
      id: movieId || 0,
      title: movieTitle,
      genres: movieGenres.split(','),
      language: movieLanguage
    };
  }
  
  updateMovieHeader();
}

// Update movie header
function updateMovieHeader() {
  const headerTitle = document.getElementById('movie-title');
  const headerSubtitle = document.getElementById('movie-subtitle');
  
  if (currentMovie && headerTitle) {
    headerTitle.textContent = currentMovie.title || 'Select Theater';
    const subtitle = [
      currentMovie.certificate || 'UA',
      currentMovie.genres?.slice(0, 2).join(', ') || '',
      currentMovie.language || ''
    ].filter(Boolean).join(' • ');
    if (headerSubtitle) {
      headerSubtitle.textContent = subtitle;
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  getMovieFromURL();
  renderTheaters(allTheaters);
  setupSearch();
  setupFilters();
  setupLocationSelector();
});

// Render theaters list
function renderTheaters(theaters) {
  const container = document.getElementById('theaters-container');
  const noResults = document.getElementById('no-results');
  
  if (!container) return;
  
  if (theaters.length === 0) {
    container.innerHTML = '';
    if (noResults) noResults.style.display = 'block';
    return;
  }
  
  if (noResults) noResults.style.display = 'none';
  
  // Sort: Recommended first, then by distance
  const sorted = [...theaters].sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });
  
  container.innerHTML = sorted.map(theater => createTheaterCard(theater)).join('');
  
  // Add click handlers
  sorted.forEach(theater => {
    const card = document.querySelector(`[data-theater-id="${theater.id}"]`);
    if (card) {
      const selectBtn = card.querySelector('.select-theater-btn');
      if (selectBtn) {
        selectBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selectTheater(theater);
        });
      }
    }
  });
}

// Create theater card HTML
function createTheaterCard(theater) {
  const recommendedBadge = theater.recommended ? '<span class="badge recommended">Recommended</span>' : '';
  const nearbyBadge = theater.nearby ? '<span class="badge nearby">Nearby</span>' : '';
  
  const facilitiesHTML = theater.facilities.slice(0, 3).map(f => `<span class="facility-tag">${f}</span>`).join('');
  const formatsHTML = theater.formats.join(', ');
  
  return `
    <div class="theater-card" data-theater-id="${theater.id}">
      <div class="theater-header">
        <div class="theater-info">
          <h3 class="theater-name">${theater.name}</h3>
          <p class="theater-location">📍 ${theater.location}</p>
          <div class="theater-badges">
            ${recommendedBadge}
            ${nearbyBadge}
          </div>
        </div>
        <div class="theater-meta">
          <div class="distance">${theater.distance}</div>
          <div class="rating">⭐ ${theater.rating}</div>
        </div>
      </div>
      
      <div class="theater-details">
        <div class="facilities">
          ${facilitiesHTML}
          ${theater.facilities.length > 3 ? `<span class="facility-tag">+${theater.facilities.length - 3} more</span>` : ''}
        </div>
        <div class="formats">Available formats: <strong>${formatsHTML}</strong></div>
      </div>
      
      <div class="theater-actions">
        <button class="select-theater-btn">Select Showtimes</button>
      </div>
    </div>
  `;
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.getElementById('search-theater');
  if (!searchInput) return;
  
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value.toLowerCase().trim();
      filterTheaters(searchTerm);
    }, 300);
  });
}

// Setup filter buttons
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      activeFilter = this.dataset.filter;
      filterTheaters();
    });
  });
}

// Setup location selector
function setupLocationSelector() {
  const locationSelect = document.getElementById('location-select');
  if (locationSelect) {
    locationSelect.addEventListener('change', () => {
      // In a real app, this would filter theaters by location
      filterTheaters();
    });
  }
}

// Filter theaters
function filterTheaters(searchTerm = '') {
  const searchInput = document.getElementById('search-theater');
  const term = searchTerm || (searchInput ? searchInput.value.toLowerCase().trim() : '');
  
  filteredTheaters = allTheaters.filter(theater => {
    // Search filter
    const matchesSearch = !term ||
      theater.name.toLowerCase().includes(term) ||
      theater.location.toLowerCase().includes(term);
    
    // Category filter
    let matchesFilter = true;
    switch(activeFilter) {
      case 'nearby':
        matchesFilter = theater.nearby === true;
        break;
      case 'recommended':
        matchesFilter = theater.recommended === true;
        break;
      case 'imax':
        matchesFilter = theater.formats.some(f => f.includes('IMAX'));
        break;
      default:
        matchesFilter = true;
    }
    
    return matchesSearch && matchesFilter;
  });
  
  renderTheaters(filteredTheaters);
}

// Select theater and navigate to seat selection
function selectTheater(theater) {
  if (!currentMovie) {
    alert('Movie information not found. Please try again.');
    return;
  }
  
  // Store booking info in sessionStorage
  const bookingInfo = {
    movieId: currentMovie.id,
    movieTitle: currentMovie.title,
    theaterId: theater.id,
    theaterName: theater.name,
    theaterLocation: theater.location,
    date: new Date().toISOString().split('T')[0] // Today's date
  };
  
  sessionStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
  
  // Navigate to seat selection page
  window.location.href = `seat-selection.html?theaterId=${theater.id}&movieId=${currentMovie.id}`;
}

// Go back to movies
function goBack() {
  window.location.href = 'movies.html';
}


