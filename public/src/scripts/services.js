// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });
}

// Image Sliders
function initSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    if (!slider) return;

    const images = slider.querySelectorAll('.hero-img');
    if (images.length === 0) return;

    let currentIndex = 0;

    // Set first image as active initially
    images[0].classList.add('active');

    setInterval(() => {
        // Remove active class from current
        images[currentIndex].classList.remove('active');

        // Move to next index
        currentIndex = (currentIndex + 1) % images.length;

        // Add active class to new current
        images[currentIndex].classList.add('active');
    }, 3000); // Change every 3 seconds
}

// Initialize all sliders
document.addEventListener('DOMContentLoaded', () => {
    initSlider('slider-flights');
    initSlider('slider-hotels');
    initSlider('slider-tours');
    initSlider('slider-cruise');
    initSlider('slider-visa');
});
