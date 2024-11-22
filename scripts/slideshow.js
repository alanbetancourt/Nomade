class Slideshow {
  constructor() {
    this.container = document.querySelector('#slideshow');
    if (!this.container) {
      console.error('Slideshow container not found');
      return;
    }
    
    this.slides = Array.from(this.container.querySelectorAll('.slide'));
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

// Don't initialize here - it's now handled in script.js 