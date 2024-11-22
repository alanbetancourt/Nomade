class IllustrationScroller {
  constructor() {
    this.container = document.querySelector('.illustrations-container');
    this.wrapper = document.querySelector('.illustration-wrapper');
    
    // Clone illustrations for infinite loop
    const originalContent = this.wrapper.innerHTML;
    this.wrapper.innerHTML = originalContent + originalContent;

    // Handle scroll position
    this.container.addEventListener('scroll', () => {
      const maxScroll = this.wrapper.offsetHeight / 2; // Half because we duplicated content
      
      if (this.container.scrollTop >= maxScroll) {
        // Reset to top when reaching the middle (seamless loop)
        this.container.scrollTop = 0;
      } else if (this.container.scrollTop <= 0) {
        // Jump to middle when scrolling up too far
        this.container.scrollTop = maxScroll;
      }
    });
  }
}

// For mobile horizontal scrolling
@media (max-width: 768px) {
  // Update scroll logic for horizontal scrolling
  handleScroll() {
    const maxScroll = this.wrapper.offsetWidth / 2;
    
    if (this.container.scrollLeft >= maxScroll) {
      this.container.scrollLeft = 0;
    } else if (this.container.scrollLeft <= 0) {
      this.container.scrollLeft = maxScroll;
    }
  }
} 