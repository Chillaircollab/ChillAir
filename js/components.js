// ===== Shared Components - Header & Footer =====

// Header HTML - used across all pages
function getHeader(isSubpage = false) {
    const prefix = isSubpage ? '../' : '';
    const homeLink = isSubpage ? '../index.html' : '#home';
    const servicesLink = isSubpage ? '../index.html#services' : '#services';
    const aboutLink = isSubpage ? '../index.html#about' : '#about';
    const reviewsLink = isSubpage ? '../index.html#reviews' : '#reviews';
    const contactLink = isSubpage ? '../index.html#contact' : '#contact';
    const portalLink = isSubpage ? '../portal.html' : 'portal.html';
    
    return `
    <header class="header" id="header">
        <nav class="nav container">
            <a href="${homeLink}" class="nav__logo">
                <img src="${prefix}images/logo.png" alt="Chill Air Logo" class="nav__logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span class="nav__logo-text" style="display:none;">❄️ <span>Chill Air</span></span>
            </a>
            
            <div class="nav__menu" id="nav-menu">
                <ul class="nav__list">
                    <li class="nav__item"><a href="${homeLink}" class="nav__link">Home</a></li>
                    <li class="nav__item"><a href="${servicesLink}" class="nav__link">Services</a></li>
                    <li class="nav__item"><a href="${aboutLink}" class="nav__link">About</a></li>
                    <li class="nav__item"><a href="${reviewsLink}" class="nav__link">Reviews</a></li>
                    <li class="nav__item"><a href="${contactLink}" class="nav__link">Contact</a></li>
                    <li class="nav__item"><a href="${portalLink}" class="nav__link nav__link--portal">Client Portal</a></li>
                </ul>
                <button type="button" class="nav__close" id="nav-close" aria-label="Close menu">✕</button>
            </div>
            
            <div class="nav__actions">
                <a href="tel:+64272065345" class="nav__phone">
                    <span class="nav__phone-icon">📞</span>
                    <span class="nav__phone-text">027 206 5345</span>
                </a>
                <button type="button" class="nav__toggle" id="nav-toggle" aria-label="Open menu">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    </header>`;
}

// Footer HTML - used across all pages
function getFooter(isSubpage = false) {
    const prefix = isSubpage ? '../' : '';
    const homeLink = isSubpage ? '../index.html' : '#home';
    const servicesLink = isSubpage ? '../index.html#services' : '#services';
    const aboutLink = isSubpage ? '../index.html#about' : '#about';
    const reviewsLink = isSubpage ? '../index.html#reviews' : '#reviews';
    const contactLink = isSubpage ? '../index.html#contact' : '#contact';
    const portalLink = isSubpage ? '../portal.html' : 'portal.html';
    const servicesPrefix = isSubpage ? '' : 'services/';
    
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer__grid">
                <div class="footer__brand">
                    <a href="${homeLink}" class="footer__logo">
                        <img src="${prefix}images/logowhite.png" alt="Chill Air" class="footer__logo-img">
                    </a>
                    <p class="footer__tagline">Canterbury's Trusted Heat Pump Specialists</p>
                    <p class="footer__description">Professional installation, maintenance, and repairs for all your heating and cooling needs.</p>
                </div>
                
                <div class="footer__links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="${homeLink}">Home</a></li>
                        <li><a href="${servicesLink}">Services</a></li>
                        <li><a href="${aboutLink}">About Us</a></li>
                        <li><a href="${reviewsLink}">Reviews</a></li>
                        <li><a href="${contactLink}">Contact</a></li>
                        <li><a href="${portalLink}">Client Portal</a></li>
                    </ul>
                </div>
                
                <div class="footer__links">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="${servicesPrefix}heat-pump-installation.html">Heat Pump Installation</a></li>
                        <li><a href="${servicesPrefix}air-conditioning.html">Air Conditioning</a></li>
                        <li><a href="${servicesPrefix}maintenance-repairs.html">Maintenance & Repairs</a></li>
                        <li><a href="${servicesPrefix}ventilation.html">Ventilation Systems</a></li>
                        <li><a href="${servicesPrefix}hot-water-heat-pumps.html">Hot Water Heat Pumps</a></li>
                        <li><a href="${servicesPrefix}pool-heat-pumps.html">Pool Heat Pumps</a></li>
                    </ul>
                </div>
                
                <div class="footer__contact">
                    <h4>Contact</h4>
                    <p>📞 <a href="tel:+64272065345">027 206 5345</a></p>
                    <p>📍 Christchurch, Canterbury NZ</p>
                    <p>🕐 Mon-Fri: 8am - 5pm</p>
                </div>
            </div>
            
            <div class="footer__bottom">
                <p>&copy; 2026 Chill Air Limited. All rights reserved. <span class="footer__credit">Site crafted by <a href="https://tempero.nz" target="_blank" rel="noopener">Tempero Creative</a></span></p>
                <div class="footer__legal">
                    <a href="${prefix}terms.html">Terms & Conditions</a>
                    <a href="${prefix}privacy.html">Privacy Policy</a>
                </div>
            </div>
        </div>
    </footer>`;
}

// Inject header and footer into page
function initComponents() {
    // Detect if this is a subpage (in services folder or other subfolder)
    const path = window.location.pathname;
    const isSubpage = path.includes('/services/') || 
                      path.includes('/terms') || 
                      path.includes('/privacy') || 
                      path.includes('/promo-terms');
    const isServicesPage = path.includes('/services/');
    
    // Find placeholder elements
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');
    
    if (headerPlaceholder) {
        headerPlaceholder.outerHTML = getHeader(isServicesPage);
    }
    
    if (footerPlaceholder) {
        footerPlaceholder.outerHTML = getFooter(isServicesPage);
    }
    
    // Initialize navigation after injecting
    initNavigation();
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    if (!navToggle || !navMenu) {
        console.log('Nav elements not found');
        return;
    }

    // Open mobile menu
    navToggle.onclick = function(e) {
        e.preventDefault();
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Close mobile menu
    if (navClose) {
        navClose.onclick = function(e) {
            e.preventDefault();
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        };
    }

    // Close on link click
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
        link.onclick = function() {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        };
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
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

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponents);
} else {
    initComponents();
}
