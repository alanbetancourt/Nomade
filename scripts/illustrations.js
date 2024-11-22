class IllustrationScroller {
  constructor() {
    this.container = document.querySelector('.illustrations-container');
    this.wrapper = document.querySelector('.illustration-wrapper');
    
    if (!this.container || !this.wrapper) {
      console.error('Required elements not found');
      return;
    }

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

// Don't initialize here - it's now handled in script.js 