document.addEventListener('DOMContentLoaded', () => {
  // Popup handling
  const popups = document.querySelectorAll('.popup');
  
  // Close all popups initially
  const closeAllPopups = () => {
    popups.forEach(popup => popup.classList.add('hidden'));
  };
  
  closeAllPopups();

  // Event delegation for popups
  document.body.addEventListener('click', (e) => {
    const openButton = e.target.closest('.open-popup');
    if (openButton) {
      e.preventDefault();
      closeAllPopups(); // Close any open popup first
      const popupId = openButton.getAttribute('data-popup');
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.classList.remove('hidden');
      }
    }

    const closeButton = e.target.closest('.close-popup');
    if (closeButton) {
      e.preventDefault();
      const popup = closeButton.closest('.popup');
      if (popup) {
        popup.classList.add('hidden');
      }
    }
  });

  // Slideshow functionality
  class Slideshow {
    constructor() {
      this.container = document.getElementById('slideshow');
      this.slides = Array.from(this.container.querySelectorAll('.slide'));
      this.currentIndex = 0;
      this.isTransitioning = false;
      this.emojis = ['🌍', '🥂', '🍷', '🧳', '🗺️', '🧭', '⚓', '⛵', '🏔️', '🚞', '⛺', '🚶', '🏃‍♀️'];
      this.emojiElement = this.createEmojiElement();
      
      // Show first slide
      this.slides[0].classList.add('active');
      
      // Add click handler to entire document
      document.addEventListener('click', (e) => {
        // Ignore clicks on links, buttons, and other interactive elements
        if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.popup')) {
          return;
        }
        this.handleClick(e);
      });

      // Start automatic slideshow
      this.startAutoSlide();
    }

    createEmojiElement() {
      const emoji = document.createElement('div');
      emoji.style.cssText = `
        position: fixed;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        font-size: 2rem;
        z-index: 9999;
      `;
      document.body.appendChild(emoji);
      return emoji;
    }

    showEmoji(x, y) {
      const randomEmoji = this.emojis[Math.floor(Math.random() * this.emojis.length)];
      this.emojiElement.textContent = randomEmoji;
      this.emojiElement.style.left = `${x - 15}px`;
      this.emojiElement.style.top = `${y - 15}px`;
      this.emojiElement.style.opacity = '1';

      // Animate emoji
      const keyframes = [
        { transform: 'translateY(0) scale(.5)', opacity: 1 },
        { transform: 'translateY(-50px) scale(1.5)', opacity: 0 }
      ];
      
      const animation = this.emojiElement.animate(keyframes, {
        duration: 600,
        easing: 'ease-out'
      });

      animation.onfinish = () => {
        this.emojiElement.style.opacity = '0';
      };
    }

    handleClick(e) {
      if (this.isTransitioning) return;
      
      // Show emoji at click position
      this.showEmoji(e.clientX, e.clientY);
      
      // Change slide
      this.nextSlide();
    }

    nextSlide() {
      if (this.isTransitioning) return;
      this.isTransitioning = true;

      // Remove active class from current slide
      this.slides[this.currentIndex].classList.remove('active');

      // Update index
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;

      // Add active class to next slide
      this.slides[this.currentIndex].classList.add('active');

      // Reset transition flag
      setTimeout(() => {
        this.isTransitioning = false;
      }, 800); // Match this with your CSS transition duration
    }

    startAutoSlide() {
      setInterval(() => {
        if (!document.hidden && !this.isTransitioning) {
          this.nextSlide();
        }
      }, 6000);
    }
  }

  // Initialize slideshow
  new Slideshow();

  // Illustrations scroll functionality
  class IllustrationsScroller {
    constructor() {
      this.container = document.querySelector('.illustrations-container');
      this.wrapper = document.querySelector('.illustration-wrapper');
      this.isDragging = false;
      this.startPos = { x: 0, y: 0 };
      this.scrollPos = { left: 0, top: 0 };
      this.animationPaused = false;

      this.initScroll();
      this.setupInfiniteScroll();
    }

    setupInfiniteScroll() {
      // Clone illustrations for infinite scroll
      const illustrations = Array.from(this.wrapper.children);
      illustrations.forEach(ill => {
        const clone = ill.cloneNode(true);
        this.wrapper.appendChild(clone);
      });
    }

    initScroll() {
      // Mouse events
      this.container.addEventListener('mousedown', (e) => this.startDragging(e));
      window.addEventListener('mousemove', (e) => this.drag(e));
      window.addEventListener('mouseup', () => this.stopDragging());

      // Touch events
      this.container.addEventListener('touchstart', (e) => this.startDragging(e));
      this.container.addEventListener('touchmove', (e) => this.drag(e));
      this.container.addEventListener('touchend', () => this.stopDragging());

      // Prevent context menu
      this.container.addEventListener('contextmenu', e => e.preventDefault());

      // Handle scroll reset for infinite loop
      this.container.addEventListener('scroll', () => this.handleScroll());
    }

    startDragging(e) {
      this.isDragging = true;
      this.container.style.cursor = 'grabbing';
      this.wrapper.style.animationPlayState = 'paused';
      
      const point = e.type === 'mousedown' ? e : e.touches[0];
      this.startPos = {
        x: point.pageX - this.container.offsetLeft,
        y: point.pageY - this.container.offsetTop
      };
      
      this.scrollPos = {
        left: this.container.scrollLeft,
        top: this.container.scrollTop
      };
    }

    drag(e) {
      if (!this.isDragging) return;
      e.preventDefault();

      const point = e.type === 'mousemove' ? e : e.touches[0];
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        const walkX = (point.pageX - this.container.offsetLeft - this.startPos.x) * 2;
        this.container.scrollLeft = this.scrollPos.left - walkX;
      } else {
        const walkY = (point.pageY - this.container.offsetTop - this.startPos.y) * 2;
        this.container.scrollTop = this.scrollPos.top - walkY;
      }
    }

    handleScroll() {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        if (this.container.scrollLeft >= this.wrapper.offsetWidth / 2) {
          this.container.scrollLeft = 0;
        } else if (this.container.scrollLeft <= 0) {
          this.container.scrollLeft = this.wrapper.offsetWidth / 2;
        }
      } else {
        if (this.container.scrollTop >= this.wrapper.offsetHeight / 2) {
          this.container.scrollTop = 0;
        } else if (this.container.scrollTop <= 0) {
          this.container.scrollTop = this.wrapper.offsetHeight / 2;
        }
      }
    }

    stopDragging() {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.container.style.cursor = 'grab';
      this.wrapper.style.animationPlayState = 'running';
    }
  }

  // Initialize illustrations scroller
  new IllustrationsScroller();

  // Update the illustrations container to not block clicks
  const updateIllustrationsContainer = () => {
    const container = document.querySelector('.illustrations-container');
    if (container) {
      container.style.pointerEvents = 'none';
      
      // Allow pointer events only for dragging the illustrations
      const wrapper = container.querySelector('.illustration-wrapper');
      if (wrapper) {
        wrapper.style.pointerEvents = 'auto';
      }
    }
  };

  // Initialize components
  updateIllustrationsContainer();
});
