// Movie Management System
let filteredMovies = [...moviesData];
let activeFilters = {
  language: [],
  genre: [],
  format: []
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  renderMovies(moviesData);
  setupSearch();
  setupFilters();
  setupSorting();
});

// Render movies grid
function renderMovies(movies) {
  const moviesGrid = document.getElementById('movies-grid');
  if (!moviesGrid) return;

  if (movies.length === 0) {
    moviesGrid.innerHTML = `
      <div class="no-results">
        <p>No movies found. Try adjusting your filters.</p>
      </div>
    `;
    return;
  }

  moviesGrid.innerHTML = movies.map(movie => createMovieCard(movie)).join('');
  
  // Add click event listeners to cards
  movies.forEach(movie => {
    const card = document.querySelector(`[data-movie-id="${movie.id}"]`);
    if (card) {
      card.addEventListener('click', () => {
        if (movie.detailPage) {
          window.location.href = movie.detailPage;
        }
      });
    }
  });
}

// Create movie card HTML
function createMovieCard(movie) {
  const tagClass = movie.certificate === 'NEW' ? 'tag-new' : 'tag-certificate';
  const isNew = movie.releaseDate && new Date(movie.releaseDate) > new Date() ? true : false;
  
  return `
    <div class="bms-card" data-movie-id="${movie.id}">
      <div class="poster">
        <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
        ${isNew ? '<span class="tag tag-new">NEW</span>' : ''}
        ${movie.certificate ? `<span class="tag ${tagClass}">${movie.certificate}</span>` : ''}
        <div class="card-overlay">
          <button class="quick-view-btn" onclick="event.stopPropagation(); window.location.href='${movie.detailPage || '#'}'">
            View Details
          </button>
        </div>
      </div>
      <div class="card-content">
        <h3 title="${movie.title}">${movie.title}</h3>
        <p class="movie-genres">${movie.genres.join(' • ')} / ${movie.language}</p>
        <div class="card-footer">
          <span class="rating">⭐ ${movie.rating}</span>
          <span class="votes">${movie.votes} votes</span>
        </div>
        <div class="movie-meta-info">
          <span class="duration">⏱ ${movie.duration}</span>
          <span class="formats">${movie.format.slice(0, 2).join(', ')}${movie.format.length > 2 ? '+' : ''}</span>
        </div>
      </div>
    </div>
  `;
}

// Setup search functionality
function setupSearch() {
  const searchInput = document.querySelector('.nav-left input') || document.getElementById('search-input');
  if (!searchInput) return;

  // Debounce search for better performance
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      const searchTerm = e.target.value.toLowerCase().trim();
      filterMovies(searchTerm);
    }, 300);
  });
}

// Filter movies based on search and active filters
function filterMovies(searchTerm = '') {
  filteredMovies = moviesData.filter(movie => {
    // Search filter
    const matchesSearch = !searchTerm || 
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genres.some(g => g.toLowerCase().includes(searchTerm)) ||
      movie.language.toLowerCase().includes(searchTerm);

    // Language filter
    const matchesLanguage = activeFilters.language.length === 0 ||
      activeFilters.language.includes(movie.language);

    // Genre filter
    const matchesGenre = activeFilters.genre.length === 0 ||
      activeFilters.genre.some(g => movie.genres.includes(g));

    // Format filter
    const matchesFormat = activeFilters.format.length === 0 ||
      activeFilters.format.some(f => movie.format.includes(f));

    return matchesSearch && matchesLanguage && matchesGenre && matchesFormat;
  });

  renderMovies(filteredMovies);
  updateResultsCount();
}

// Setup filter buttons
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-group button');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      updateActiveFilters();
      filterMovies();
    });
  });
}

// Update active filters based on button states
function updateActiveFilters() {
  activeFilters = { language: [], genre: [], format: [] };

  // Get all active buttons and categorize them
  document.querySelectorAll('.filter-group button.active').forEach(btn => {
    const group = btn.closest('.filter-group');
    if (!group) return;
    
    const groupTitle = group.querySelector('h4');
    if (!groupTitle) return;
    
    const titleText = groupTitle.textContent.trim();
    const value = btn.textContent.trim();

    if (titleText.includes('Language')) {
      activeFilters.language.push(value);
    } else if (titleText.includes('Genre')) {
      activeFilters.genre.push(value);
    } else if (titleText.includes('Format')) {
      activeFilters.format.push(value);
    }
  });
}

// Setup sorting options
function setupSorting() {
  const sortSelect = document.getElementById('sort-movies');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortMovies(e.target.value);
    });
  }
}

// Sort movies
function sortMovies(sortBy) {
  const sorted = [...filteredMovies];
  
  switch(sortBy) {
    case 'rating-high':
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case 'rating-low':
      sorted.sort((a, b) => a.rating - b.rating);
      break;
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'release-new':
      sorted.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
      break;
    case 'release-old':
      sorted.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
      break;
    default:
      break;
  }
  
  renderMovies(sorted);
}

// Update results count
function updateResultsCount() {
  const countElement = document.getElementById('results-count');
  if (countElement) {
    countElement.textContent = `${filteredMovies.length} movie${filteredMovies.length !== 1 ? 's' : ''} found`;
  }
}

// Clear all filters
function clearFilters() {
  document.querySelectorAll('.filter-group button').forEach(btn => {
    btn.classList.remove('active');
  });
  activeFilters = { language: [], genre: [], format: [] };
  
  const searchInput = document.querySelector('.nav-left input') || document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = '';
  }
  
  const sortSelect = document.getElementById('sort-movies');
  if (sortSelect) {
    sortSelect.value = '';
  }
  
  filterMovies();
}

