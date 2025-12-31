// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for anchor links
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}


// Add scroll effect to header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 2. Image Slider Functionality with Staggered Timing ---
// Configuration for each slider with unique delays
const sliderConfigs = [
    { selector: '#slider-flights', delay: 0 },      // Starts immediately
    { selector: '#slider-hotels', delay: 2000 },    // Starts after 2 seconds
    { selector: '#slider-tours', delay: 4000 },     // Starts after 4 seconds
    { selector: '#slider-cruising', delay: 6000 },  // Starts after 6 seconds
    { selector: '#slider-visa', delay: 8000 }       // Starts after 8 seconds
];

sliderConfigs.forEach(config => {
    const slider = document.querySelector(config.selector);
    if (!slider) {
        console.error(`Slider not found: ${config.selector}`);
        return;
    }
    console.log(`Initializing slider: ${config.selector}`);

    let currentIndex = 0;
    const images = slider.querySelectorAll('.hero-img');
    const totalImages = images.length;

    if (totalImages === 0) return;

    const updateSlider = () => {
        const offset = -currentIndex * images[0].offsetWidth;
        slider.style.transform = `translateX(${offset}px)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    };

    // Start the slider after the configured delay
    setTimeout(() => {
        // Initial update
        updateSlider();

        // Auto-advance every 3 seconds
        setInterval(nextSlide, 3000);
    }, config.delay);

    // Handle window resizing
    window.addEventListener('resize', updateSlider);
});
// Homepage Checklist Generator - Redirect to Guidelines Page
document.addEventListener('DOMContentLoaded', function() {
    const homeGenerateBtn = document.getElementById('home-generate-checklist-btn');
    
    if (homeGenerateBtn) {
        homeGenerateBtn.addEventListener('click', function() {
            const origin = document.getElementById('home-origin-country').value;
            const destination = document.getElementById('home-destination-country').value;
            
            if (!origin || !destination) {
                alert('Please select both origin and destination countries.');
                return;
            }
            
            // Redirect to guidelines page with parameters
            window.location.href = `/guidelines?origin=${origin}&destination=${destination}`;
        });
    }
});
