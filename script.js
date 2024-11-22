// Selección de todos los pop-ups
const popups = document.querySelectorAll('.popup');

// Function to close all popups
function closeAllPopups() {
  popups.forEach(popup => popup.classList.add('hidden'));
}

// Function to open a specific popup
function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    closeAllPopups(); // Close any open popups first
    popup.classList.remove('hidden');
  }
}

// Event delegation for opening popups
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('open-popup')) {
    e.preventDefault();
    const popupId = e.target.getAttribute('data-popup');
    openPopup(popupId);
  }
});

// Event delegation for closing popups
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('close-popup')) {
    e.preventDefault();
    const popup = e.target.closest('.popup');
    if (popup) {
      popup.classList.add('hidden');
    }
  }
});

// Close all popups when the page loads
document.addEventListener('DOMContentLoaded', closeAllPopups);

// Slideshow functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Back to top button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Loading indicator
function showLoading() {
  const loadingDiv = document.createElement('div');
  loadingDiv.classList.add('loading');
  document.body.appendChild(loadingDiv);
}

function hideLoading() {
  const loadingDiv = document.querySelector('.loading');
  if (loadingDiv) {
    loadingDiv.remove();
  }
}

// Show loading indicator before loading images
showLoading();

// Hide loading indicator when all images are loaded
window.addEventListener('load', hideLoading);

// Keyboard navigation for popups
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllPopups();
  }
});

// Progressive enhancement
if (window.addEventListener) {
  document.body.classList.remove('no-js');
}

class Slideshow {
  constructor(container) {
    this.container = container;
    this.slides = Array.from(container.querySelectorAll('.slide'));
    this.currentIndex = 0;
    
    // Initialize click/tap handler
    this.container.addEventListener('click', () => this.showNextSlide());
  }

  showNextSlide() {
    // Hide current slide
    this.slides[this.currentIndex].classList.remove('active');
    
    // Update index (loop back to start if needed)
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    
    // Show next slide
    this.slides[this.currentIndex].classList.add('active');
  }
}

class IllustrationScroller {
  constructor() {
    this.container = document.querySelector('.illustrations-container');
    this.wrapper = document.querySelector('.illustration-wrapper');
    
    // Clone illustrations for infinite loop
    const originalContent = this.wrapper.innerHTML;
    this.wrapper.innerHTML = originalContent + originalContent;

    // Handle scroll position
    this.container.addEventListener('scroll', () => {
      if (window.innerWidth <= 768) {
        this.handleHorizontalScroll();
      } else {
        this.handleVerticalScroll();
      }
    });
  }

  handleVerticalScroll() {
    const maxScroll = this.wrapper.offsetHeight / 2;
    if (this.container.scrollTop >= maxScroll) {
      this.container.scrollTop = 0;
    } else if (this.container.scrollTop <= 0) {
      this.container.scrollTop = maxScroll;
    }
  }

  handleHorizontalScroll() {
    const maxScroll = this.wrapper.offsetWidth / 2;
    if (this.container.scrollLeft >= maxScroll) {
      this.container.scrollLeft = 0;
    } else if (this.container.scrollLeft <= 0) {
      this.container.scrollLeft = maxScroll;
    }
  }
}

// Initialize both components
document.addEventListener('DOMContentLoaded', () => {
  new IllustrationScroller();
  new Slideshow();
});
