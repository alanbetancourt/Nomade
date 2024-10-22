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
    if (popupId === 'menu-popup') {
      openPopup('menuPopup'); // Match the ID in your HTML
    } else {
      openPopup(popupId);
    }
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
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Smooth scroll effect
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
