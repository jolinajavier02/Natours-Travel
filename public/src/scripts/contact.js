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
    if (!header) return;

    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// --- 2. Image Slider Functionality (Automatic and Manual) ---
const sliders = document.querySelectorAll('.service-slider');

sliders.forEach(slider => {
    let currentIndex = 0;
    const images = slider.querySelectorAll('.hero-img');
    const totalImages = images.length;
    const sliderId = slider.id.split('-')[1];

    const updateSlider = () => {
        const offset = -currentIndex * images[0].offsetWidth;
        slider.style.transform = `translateX(${offset}px)`;
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        updateSlider();
    };

    // Automatic sliding (every 4 seconds)
    setInterval(nextSlide, 3000);

    // Handle resizing (if the window resizes, recalculate offset)
    window.addEventListener('resize', updateSlider);
});
// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const budgetSlider = document.getElementById('budget');
const budgetValue = document.getElementById('budget-value');

if (budgetSlider && budgetValue) {
    budgetSlider.addEventListener('input', function () {
        budgetValue.textContent = parseInt(this.value).toLocaleString();
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const destination = document.getElementById('destination').value.trim();
        const travelDate = document.getElementById('travel-date').value;
        const travelers = document.getElementById('travelers').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value.trim();
        const newsletter = document.getElementById('newsletter').checked;

        // Validation
        if (!fullname || !email || !service || !message) {
            alert('Please fill in all required fields (Name, Email, Service, and Message)');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Create WhatsApp message
        let whatsappMsg = `*Contact Form Inquiry*\n\n`;
        whatsappMsg += `*From:* ${fullname}\n`;
        whatsappMsg += `*Email:* ${email}\n`;
        if (phone) whatsappMsg += `*Phone:* ${phone}\n`;
        whatsappMsg += `\n*Service Interest:* ${service}\n`;
        if (destination) whatsappMsg += `*Destination:* ${destination}\n`;
        if (travelDate) whatsappMsg += `*Travel Date:* ${travelDate}\n`;
        if (travelers) whatsappMsg += `*Number of Travelers:* ${travelers}\n`;
        if (budget) whatsappMsg += `*Budget:* ₱${parseInt(budget).toLocaleString()}\n`;
        whatsappMsg += `\n*Message:*\n${message}\n`;
        if (newsletter) whatsappMsg += `\n✓ Subscribed to newsletter`;

        // Encode and open WhatsApp
        const encodedMessage = encodeURIComponent(whatsappMsg);
        const whatsappURL = `https://wa.me/639369418559?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');

        // Show success message
        contactForm.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';

        // Reset form after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            document.getElementById('form-success').style.display = 'none';
            budgetValue.textContent = '50,000';
        }, 3000);
    });
}
