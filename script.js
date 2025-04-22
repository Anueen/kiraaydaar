document.addEventListener('DOMContentLoaded', function() {
  const locations = [
    'Kharar',
    'Mohali',
    'Chandigarh'
    // 'Panchkula',
    // 'Zirakpur',
    // 'Kurali',
    // 'Landran',
    // 'Amritsar'
  ];

  const locationCards = document.querySelectorAll('.popular-localities .card');
  const locationHeading = document.querySelector('.popular-localities h2');

  locationCards.forEach(card => {
    card.addEventListener('click', function() {
      const locationName = this.querySelector('.card-title').textContent;
      locationHeading.textContent = `In and around ${locationName}`;
    });

    card.style.cursor = 'pointer';
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
      this.style.transition = 'transform 0.3s ease';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  const locationInput = document.querySelector('input[placeholder="Location"]');
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'location-dropdown';
  locationInput.parentNode.style.position = 'relative';
  locationInput.parentNode.appendChild(dropdownContainer);

  locationInput.style.backgroundImage = 'url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/icons/geo-alt-fill.svg")';
  locationInput.style.backgroundRepeat = 'no-repeat';
  locationInput.style.backgroundPosition = '10px center';
  locationInput.style.backgroundSize = '16px';
  locationInput.style.paddingLeft = '35px';

  locationInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const matches = locations.filter(location =>
      location.toLowerCase().includes(searchTerm)
    );

    if (searchTerm && matches.length > 0) {
      dropdownContainer.innerHTML = matches
        .map(location => `
          <div class="location-item">
            <i class="bi bi-geo-alt-fill"></i>
            ${location}
          </div>
        `)
        .join('');
      dropdownContainer.style.display = 'block';
    } else {
      dropdownContainer.style.display = 'none';
    }
  });

  const searchForm = document.querySelector('.search-box form');
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const propertyType = document.querySelector('select[aria-label="Property Type"]').value;
    const preference = document.querySelector('select[aria-label="Preference"]').value;
    const location = locationInput.value;

    const isPropertyTypeDefault = propertyType === 'Property Type';
    const isPreferenceDefault = preference === 'For Whom';
    const isLocationEmpty = !location.trim();

    if (isPropertyTypeDefault && isPreferenceDefault && isLocationEmpty) {
      window.location.href = 'Rooms.html';
      return;
    }

    const params = new URLSearchParams();
    if (!isPropertyTypeDefault) params.append('type', propertyType);
    if (!isPreferenceDefault) params.append('for', preference);
    if (!isLocationEmpty) params.append('location', location);

    window.location.href = `Rooms.html${params.toString() ? '?' + params.toString() : ''}`;
  });

  document.addEventListener('click', function(e) {
    if (!locationInput.contains(e.target)) {
      dropdownContainer.style.display = 'none';
    }
  });
});