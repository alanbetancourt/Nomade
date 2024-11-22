class Slideshow {
  constructor() {
    this.currentIndex = 0;
    this.container = document.querySelector('.slideshow-container');
    this.images = this.container.querySelectorAll('.slideshow-image');
    
    // Add click/tap handler
    this.container.addEventListener('click', () => this.showNextImage());
  }

  showNextImage() {
    // Hide current image
    this.images[this.currentIndex].classList.remove('active');
    
    // Update index
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    
    // Show next image
    this.images[this.currentIndex].classList.add('active');
  }
}

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
  const slideshowContainer = document.querySelector('.slideshow-container');
  if (slideshowContainer) {
    new Slideshow(slideshowContainer);
  }
}); 