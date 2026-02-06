// Events Page Dynamic Rendering and Booking
let filteredEvents = [];
let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', function() {
  if (typeof eventsData !== 'undefined') {
    filteredEvents = [...eventsData];
    renderEvents(eventsData);
    setupFilters();
    setupSearch();
    checkURLSearch();
  } else {
    // Load data file
    const script = document.createElement('script');
    script.src = 'all-content-data.js';
    script.onload = function() {
      filteredEvents = [...eventsData];
      renderEvents(eventsData);
      setupFilters();
      setupSearch();
      checkURLSearch();
    };
    document.head.appendChild(script);
  }
});

function checkURLSearch() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  if (search) {
    const searchInput = document.querySelector('.search, input[placeholder*="Search"]');
    if (searchInput) {
      searchInput.value = search;
      filterEvents(search);
    }
  }
}

function renderEvents(events) {
  const container = document.querySelector('.events, #events-container');
  if (!container) return;
  
  if (events.length === 0) {
    container.innerHTML = '<div class="no-results">No events found. Try adjusting your filters.</div>';
    return;
  }
  
  container.innerHTML = events.map(event => createEventCard(event)).join('');
  
  // Add click handlers
  events.forEach(event => {
    const card = container.querySelector(`[data-event-id="${event.id}"]`);
    if (card) {
      card.addEventListener('click', () => {
        window.location.href = `event-booking.html?eventId=${event.id}`;
      });
    }
  });
}

function createEventCard(event) {
  return `
    <div class="event-card" data-event-id="${event.id}">
      <img src="${event.image}" alt="${event.title}">
      <div class="event-info">
        <h3>${event.title}</h3>
        <p>${event.date} • ${event.time}</p>
        <p>${event.venue}</p>
        <p>${event.city}</p>
        <p class="price">${event.priceRange}</p>
      </div>
    </div>
  `;
}

function setupFilters() {
  const filters = document.querySelectorAll('.filter');
  filters.forEach(filter => {
    filter.addEventListener('click', function() {
      document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
      this.classList.add('active');
      activeFilter = this.textContent.trim();
      filterEvents();
    });
  });
}

function setupSearch() {
  const searchInput = document.querySelector('.search, input[placeholder*="Search"]');
  if (!searchInput) return;
  
  let searchTimeout;
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      filterEvents(e.target.value);
    }, 300);
  });
}

function filterEvents(searchTerm = '') {
  const term = searchTerm.toLowerCase().trim();
  
  filteredEvents = eventsData.filter(event => {
    const matchesSearch = !term ||
      event.title.toLowerCase().includes(term) ||
      event.category.toLowerCase().includes(term) ||
      event.city.toLowerCase().includes(term) ||
      event.tags.some(t => t.toLowerCase().includes(term));
    
    const matchesFilter = activeFilter === 'all' || 
      event.category.toLowerCase() === activeFilter.toLowerCase() ||
      (activeFilter === 'online' && event.city.toLowerCase() === 'online');
    
    return matchesSearch && matchesFilter;
  });
  
  renderEvents(filteredEvents);
}


