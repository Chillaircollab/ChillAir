// ===== Chill Air Main JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(function() {
        initNavigation();
        initReviewsSlider();
        initGalleryLightbox();
        initContactForm();
        initSmoothScroll();
        initScrollEffects();
    }, 100);
});

// ===== Navigation =====
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    if (!navToggle || !navMenu) {
        console.log('Navigation elements not found, skipping nav init');
        return;
    }

    // Remove any existing listeners by cloning
    const newNavToggle = navToggle.cloneNode(true);
    navToggle.parentNode.replaceChild(newNavToggle, navToggle);
    
    // Toggle menu (hamburger transforms to X)
    newNavToggle.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = navMenu.classList.contains('active');
        
        if (isOpen) {
            // Close menu
            navMenu.classList.remove('active');
            newNavToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open menu
            navMenu.classList.add('active');
            newNavToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close button (backup, hidden by default now)
    if (navClose) {
        navClose.onclick = function(e) {
            e.preventDefault();
            navMenu.classList.remove('active');
            document.getElementById('nav-toggle').classList.remove('active');
            document.body.style.overflow = '';
        };
    }

    // Close on link click
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            document.getElementById('nav-toggle').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            const toggle = document.getElementById('nav-toggle');
            if (!navMenu.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
                navMenu.classList.remove('active');
                if (toggle) toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ===== Reviews Slider =====
function initReviewsSlider() {
    const slider = document.getElementById('reviews-slider');
    if (!slider) return;

    const track = slider.querySelector('.reviews__track');
    const cards = Array.from(slider.querySelectorAll('.review-card'));
    const prevBtn = document.getElementById('reviews-prev');
    const nextBtn = document.getElementById('reviews-next');
    const dotsContainer = document.getElementById('reviews-dots');

    if (!track || cards.length === 0) {
        console.log('Reviews slider elements not found');
        return;
    }

    console.log('Initializing reviews slider with ' + cards.length + ' cards');

    let currentIndex = 0;
    let autoPlayTimer = null;

    // Get cards per view based on screen width
    function getCardsPerView() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    // Calculate total slides
    function getTotalSlides() {
        return Math.ceil(cards.length / getCardsPerView());
    }

    // Create dots
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const total = getTotalSlides();
        
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('button');
            dot.className = 'reviews__dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.onclick = function() {
                goToSlide(i);
                resetAutoPlay();
            };
            dotsContainer.appendChild(dot);
        }
    }

    // Update slider position
    function updateSlider() {
        const cardsPerView = getCardsPerView();
        const cardEl = cards[0];
        const cardStyle = window.getComputedStyle(cardEl);
        const cardWidth = cardEl.offsetWidth;
        const gap = 32; // Matches CSS --space-xl (2rem)
        
        const offset = currentIndex * cardsPerView * (cardWidth + gap);
        track.style.transform = 'translateX(-' + offset + 'px)';
        
        // Update dots
        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.reviews__dot');
            dots.forEach(function(dot, i) {
                dot.classList.toggle('active', i === currentIndex);
            });
        }
        
        console.log('Slider updated to index ' + currentIndex);
    }

    // Go to slide
    function goToSlide(index) {
        const total = getTotalSlides();
        currentIndex = Math.max(0, Math.min(index, total - 1));
        updateSlider();
    }

    // Next slide
    function nextSlide() {
        const total = getTotalSlides();
        currentIndex = (currentIndex + 1) % total;
        updateSlider();
    }

    // Previous slide
    function prevSlide() {
        const total = getTotalSlides();
        currentIndex = (currentIndex - 1 + total) % total;
        updateSlider();
    }

    // Auto play
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Button event listeners - using onclick for reliability
    if (prevBtn) {
        prevBtn.onclick = function(e) {
            e.preventDefault();
            prevSlide();
            resetAutoPlay();
        };
    }

    if (nextBtn) {
        nextBtn.onclick = function(e) {
            e.preventDefault();
            nextSlide();
            resetAutoPlay();
        };
    }

    // Touch support
    let touchStartX = 0;
    
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoPlay();
    }, { passive: true });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);

    // Handle resize
    window.addEventListener('resize', function() {
        createDots();
        currentIndex = 0;
        updateSlider();
    });

    // Initialize
    createDots();
    updateSlider();
    startAutoPlay();
}

// ===== Gallery Lightbox =====
function initGalleryLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    const galleryItems = document.querySelectorAll('.gallery__item');
    
    if (!lightbox || galleryItems.length === 0) {
        console.log('Gallery elements not found');
        return;
    }

    console.log('Initializing gallery with ' + galleryItems.length + ' items');

    const lightboxImg = lightbox.querySelector('.gallery__lightbox-img');
    const closeBtn = lightbox.querySelector('.gallery__lightbox-close');

    // Open lightbox on image click
    galleryItems.forEach(function(item) {
        item.onclick = function(e) {
            e.preventDefault();
            const img = this.querySelector('img');
            const src = this.getAttribute('data-src') || (img ? img.src : null);
            
            if (src && lightboxImg) {
                lightboxImg.src = src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Lightbox opened with: ' + src);
            }
        };
    });

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        console.log('Lightbox closed');
    }

    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.preventDefault();
            closeLightbox();
        };
    }

    // Close on backdrop click
    lightbox.onclick = function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    };

    // Close on escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.onsubmit = function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        showNotification('Thanks for your message! We\'ll be in touch soon.', 'success');
        form.reset();
    };
}

// Notification helper
function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification notification--' + type;
    notification.innerHTML = '<span>' + message + '</span><button onclick="this.parentElement.remove()">×</button>';
    
    document.body.appendChild(notification);
    
    setTimeout(function() {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Scroll Effects =====
function initScrollEffects() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .about__content, .about__image').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}
