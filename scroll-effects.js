// Scroll Effects for Cafe-Lab Website
document.addEventListener('DOMContentLoaded', function() {
    // Select all sections and items that need animation
    const sections = document.querySelectorAll('section');
    const menuItems = document.querySelectorAll('.menu-item');
    const coffeeCards = document.querySelectorAll('.coffee-card');
    const dessertCards = document.querySelectorAll('.dessert-card');
    const drinkCards = document.querySelectorAll('.drink-card');
    const contactItems = document.querySelectorAll('.contact-item');
    
    // Add animation classes and staggered delays
    function addAnimationClasses() {
        // Add will-change property to improve performance
        sections.forEach(section => {
            section.style.willChange = 'transform, opacity';
        });
        
        // Add animation classes to sections
        sections.forEach((section, index) => {
            section.classList.add('animate-section');
            section.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Add animation classes to menu items
        menuItems.forEach((item, index) => {
            item.classList.add('animate-item');
            item.style.transitionDelay = `${0.2 + (index * 0.1)}s`;
        });
        
        // Add animation classes to coffee cards
        coffeeCards.forEach((card, index) => {
            card.classList.add('animate-item');
            card.style.transitionDelay = `${0.3 + (index * 0.1)}s`;
        });
        
        // Add animation classes to dessert cards
        dessertCards.forEach((card, index) => {
            card.classList.add('animate-item');
            card.style.transitionDelay = `${0.4 + (index * 0.1)}s`;
        });
        
        // Add animation classes to drink cards
        drinkCards.forEach((card, index) => {
            card.classList.add('animate-item');
            card.style.transitionDelay = `${0.5 + (index * 0.1)}s`;
        });
        
        // Add animation classes to contact items
        contactItems.forEach((item, index) => {
            item.classList.add('animate-item');
            item.style.transitionDelay = `${0.6 + (index * 0.1)}s`;
        });
    }
    
    // Initialize animations
    addAnimationClasses();
    
    // Use Intersection Observer to trigger animations when elements come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Remove will-change after animation to improve performance
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 1000);
            }
        });
    }, observerOptions);
    
    // Observe all sections and items
    sections.forEach(section => observer.observe(section));
    menuItems.forEach(item => observer.observe(item));
    coffeeCards.forEach(card => observer.observe(card));
    dessertCards.forEach(card => observer.observe(card));
    drinkCards.forEach(card => observer.observe(card));
    contactItems.forEach(item => observer.observe(item));
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links
            if (href.startsWith('#') || href.startsWith('/') || href.includes(window.location.hostname)) {
                e.preventDefault();
                
                let targetId = href;
                if (href.includes('#')) {
                    targetId = href.split('#')[1];
                }
                
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    // Calculate header height for offset
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    
                    // Smooth scroll to target with offset
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                } else if (href.startsWith('/') || href.includes(window.location.hostname)) {
                    // For external links, navigate normally
                    window.location.href = href;
                }
            }
        });
    });
    
    // Parallax effect for header
    const header = document.querySelector('header');
    if (header) {
        // Add will-change to improve performance
        header.style.willChange = 'background-position';
        
        // Debounce function to limit how often the scroll event fires
        function debounce(func, wait) {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    func.apply(context, args);
                }, wait);
            };
        }
        
        // Parallax scroll effect
        const parallaxScroll = debounce(() => {
            const scrollPosition = window.scrollY;
            header.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }, 10);
        
        window.addEventListener('scroll', parallaxScroll, { passive: true });
        
        // Remove will-change after initial load
        setTimeout(() => {
            header.style.willChange = 'auto';
        }, 1000);
    }
    
    // Scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    const updateProgress = debounce(() => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = `${progress}%`;
    }, 10);
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotionChange(e) {
        if (e.matches) {
            // Disable animations for users who prefer reduced motion
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
    }
    
    // Initial check
    handleReducedMotionChange(prefersReducedMotion);
    
    // Listen for changes
    prefersReducedMotion.addEventListener('change', handleReducedMotionChange);
    
    // Clean up event listeners when page is unloaded
    window.addEventListener('unload', () => {
        window.removeEventListener('scroll', parallaxScroll);
        window.removeEventListener('scroll', updateProgress);
        prefersReducedMotion.removeEventListener('change', handleReducedMotionChange);
    });
}); 