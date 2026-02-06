// Global Search Functionality
let searchResultsVisible = false;
let searchTimeout = null;

// Initialize global search on all pages
document.addEventListener('DOMContentLoaded', function() {
  initializeSearch();
});

function initializeSearch() {
  // Find all search inputs across the site
  const searchInputs = document.querySelectorAll('input[placeholder*="Search"], .search, #search-input');
  
  searchInputs.forEach(input => {
    // Create search results container if it doesn't exist
    if (!input.parentElement.querySelector('.search-results-container')) {
      const resultsContainer = document.createElement('div');
      resultsContainer.className = 'search-results-container';
      resultsContainer.id = `search-results-${Date.now()}`;
      input.parentElement.appendChild(resultsContainer);
      
      // Position results container
      const rect = input.getBoundingClientRect();
      resultsContainer.style.position = 'absolute';
      resultsContainer.style.top = `${rect.bottom + 5}px`;
      resultsContainer.style.left = `${rect.left}px`;
      resultsContainer.style.width = `${rect.width}px`;
      resultsContainer.style.zIndex = '1000';
    }
    
    // Add search event listener
    input.addEventListener('input', function(e) {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length >= 2) {
        searchTimeout = setTimeout(() => {
          performSearch(query, input);
        }, 300);
      } else {
        hideSearchResults(input);
      }
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
      if (!input.contains(e.target) && !input.parentElement.querySelector('.search-results-container').contains(e.target)) {
        hideSearchResults(input);
      }
    });
    
    // Show results on focus if there's a query
    input.addEventListener('focus', function(e) {
      if (e.target.value.trim().length >= 2) {
        performSearch(e.target.value.trim(), input);
      }
    });
  });
}

function performSearch(query, inputElement) {
  // Load content data if not already loaded
  if (typeof searchAllContent === 'undefined') {
    if (typeof eventsData === 'undefined' || typeof playsData === 'undefined' || typeof sportsData === 'undefined') {
      // Try to load the data file
      const script = document.createElement('script');
      script.src = 'all-content-data.js';
      script.onload = () => performSearch(query, inputElement);
      document.head.appendChild(script);
      return;
    }
  }
  
  const results = searchAllContent(query);
  const totalResults = results.movies.length + results.events.length + results.plays.length + results.sports.length;
  
  if (totalResults === 0) {
    showNoResults(inputElement, query);
    return;
  }
  
  displaySearchResults(results, inputElement);
}

function displaySearchResults(results, inputElement) {
  const container = inputElement.parentElement.querySelector('.search-results-container');
  if (!container) return;
  
  let html = '<div class="search-results">';
  
  // Movies Section
  if (results.movies.length > 0) {
    html += '<div class="search-section">';
    html += '<div class="search-section-title">Movies (' + results.movies.length + ')</div>';
    results.movies.slice(0, 3).forEach(movie => {
      html += createMovieSearchResult(movie);
    });
    if (results.movies.length > 3) {
      html += `<div class="search-more"><a href="movies.html?search=${encodeURIComponent(inputElement.value)}">View all ${results.movies.length} movies</a></div>`;
    }
    html += '</div>';
  }
  
  // Events Section
  if (results.events.length > 0) {
    html += '<div class="search-section">';
    html += '<div class="search-section-title">Events (' + results.events.length + ')</div>';
    results.events.slice(0, 3).forEach(event => {
      html += createEventSearchResult(event);
    });
    if (results.events.length > 3) {
      html += `<div class="search-more"><a href="events.html?search=${encodeURIComponent(inputElement.value)}">View all ${results.events.length} events</a></div>`;
    }
    html += '</div>';
  }
  
  // Plays Section
  if (results.plays.length > 0) {
    html += '<div class="search-section">';
    html += '<div class="search-section-title">Plays (' + results.plays.length + ')</div>';
    results.plays.slice(0, 3).forEach(play => {
      html += createPlaySearchResult(play);
    });
    if (results.plays.length > 3) {
      html += `<div class="search-more"><a href="plays.html?search=${encodeURIComponent(inputElement.value)}">View all ${results.plays.length} plays</a></div>`;
    }
    html += '</div>';
  }
  
  // Sports Section
  if (results.sports.length > 0) {
    html += '<div class="search-section">';
    html += '<div class="search-section-title">Sports (' + results.sports.length + ')</div>';
    results.sports.slice(0, 3).forEach(sport => {
      html += createSportSearchResult(sport);
    });
    if (results.sports.length > 3) {
      html += `<div class="search-more"><a href="sports.html?search=${encodeURIComponent(inputElement.value)}">View all ${results.sports.length} sports events</a></div>`;
    }
    html += '</div>';
  }
  
  html += '</div>';
  container.innerHTML = html;
  container.style.display = 'block';
  searchResultsVisible = true;
  
  // Add click handlers
  container.querySelectorAll('.search-result-item').forEach(item => {
    item.addEventListener('click', function() {
      const link = this.querySelector('a');
      if (link) {
        window.location.href = link.href;
      }
    });
  });
}

function createMovieSearchResult(movie) {
  const detailPage = movie.detailPage || `details.html?movieId=${movie.id}`;
  return `
    <div class="search-result-item">
      <a href="${detailPage}">
        <img src="${movie.poster}" alt="${movie.title}" class="search-result-image">
        <div class="search-result-info">
          <div class="search-result-title">${movie.title}</div>
          <div class="search-result-subtitle">${movie.genres.slice(0, 2).join(', ')} • ${movie.language}</div>
          <div class="search-result-meta">⭐ ${movie.rating} • ${movie.releaseDate}</div>
        </div>
      </a>
    </div>
  `;
}

function createEventSearchResult(event) {
  return `
    <div class="search-result-item">
      <a href="event-detail.html?eventId=${event.id}">
        <img src="${event.image}" alt="${event.title}" class="search-result-image">
        <div class="search-result-info">
          <div class="search-result-title">${event.title}</div>
          <div class="search-result-subtitle">${event.category} • ${event.venue}</div>
          <div class="search-result-meta">${event.date} • ${event.priceRange}</div>
        </div>
      </a>
    </div>
  `;
}

function createPlaySearchResult(play) {
  return `
    <div class="search-result-item">
      <a href="play-detail.html?playId=${play.id}">
        <img src="${play.image}" alt="${play.title}" class="search-result-image">
        <div class="search-result-info">
          <div class="search-result-title">${play.title}</div>
          <div class="search-result-subtitle">${play.genre} • ${play.language}</div>
          <div class="search-result-meta">${play.venue} • ${play.priceRange}</div>
        </div>
      </a>
    </div>
  `;
}

function createSportSearchResult(sport) {
  return `
    <div class="search-result-item">
      <a href="sport-detail.html?sportId=${sport.id}">
        <img src="${sport.image}" alt="${sport.title}" class="search-result-image">
        <div class="search-result-info">
          <div class="search-result-title">${sport.title}</div>
          <div class="search-result-subtitle">${sport.sport} • ${sport.venue}</div>
          <div class="search-result-meta">${sport.date} • ${sport.priceRange}</div>
        </div>
      </a>
    </div>
  `;
}

function showNoResults(inputElement, query) {
  const container = inputElement.parentElement.querySelector('.search-results-container');
  if (!container) return;
  
  container.innerHTML = `
    <div class="search-results">
      <div class="search-no-results">
        <p>No results found for "<strong>${query}</strong>"</p>
        <p class="search-suggestions">Try different keywords or browse categories</p>
      </div>
    </div>
  `;
  container.style.display = 'block';
}

function hideSearchResults(inputElement) {
  const container = inputElement.parentElement.querySelector('.search-results-container');
  if (container) {
    container.style.display = 'none';
  }
  searchResultsVisible = false;
}


