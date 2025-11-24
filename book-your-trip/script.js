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

// Add scroll effect to header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Conditional Form Fields Based on Service Type
document.addEventListener('DOMContentLoaded', function () {
    const serviceTypeSelect = document.getElementById('serviceType');
    const flightFields = document.getElementById('flightFields');
    const hotelFields = document.getElementById('hotelFields');
    const tourFields = document.getElementById('tourFields');
    const cruiseFields = document.getElementById('cruiseFields');
    const visaFields = document.getElementById('visaFields');

    if (serviceTypeSelect) {
        serviceTypeSelect.addEventListener('change', function () {
            const selectedService = this.value;

            // Hide all conditional sections first
            flightFields.style.display = 'none';
            hotelFields.style.display = 'none';
            tourFields.style.display = 'none';
            cruiseFields.style.display = 'none';
            visaFields.style.display = 'none';

            // Show relevant section based on selection
            if (selectedService === 'flight') {
                flightFields.style.display = 'block';
            } else if (selectedService === 'hotel') {
                hotelFields.style.display = 'block';
            } else if (selectedService === 'tour') {
                tourFields.style.display = 'block';
            } else if (selectedService === 'cruise') {
                cruiseFields.style.display = 'block';
            } else if (selectedService === 'visa') {
                visaFields.style.display = 'block';
            }
        });
    }

    // Form submission handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            // Check if Formspree is configured
            const formAction = this.getAttribute('action');

            if (!formAction || formAction.includes('YOUR_FORM_ID')) {
                // Formspree not configured - use WhatsApp fallback
                e.preventDefault();

                // Collect form data
                const formData = new FormData(this);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });

                // Create WhatsApp message
                let message = `*New Booking Inquiry*\n\n`;
                message += `*Personal Information:*\n`;
                message += `Name: ${formObject.firstName} ${formObject.middleName || ''} ${formObject.lastName}\n`;
                message += `DOB: ${formObject.dateOfBirth}\n`;
                message += `Gender: ${formObject.gender}\n`;
                message += `Email: ${formObject.email}\n`;
                message += `Phone: ${formObject.phone}\n`;
                if (formObject.alternateContact) message += `Alt Contact: ${formObject.alternateContact}\n`;

                message += `\n*Trip Details:*\n`;
                message += `Service: ${formObject.serviceType}\n`;
                message += `Destination: ${formObject.destination}\n`;
                message += `Start Date: ${formObject.travelDateStart}\n`;
                message += `End Date: ${formObject.travelDateEnd}\n`;
                message += `Travelers: ${formObject.numAdults} Adults, ${formObject.numChildren} Children\n`;

                if (formObject.additionalDetails) {
                    message += `\n*Additional Details:*\n${formObject.additionalDetails}\n`;
                }

                // Encode message for WhatsApp
                const whatsappMessage = encodeURIComponent(message);
                const whatsappURL = `https://wa.me/639369418559?text=${whatsappMessage}`;

                // Open WhatsApp
                window.open(whatsappURL, '_blank');

                // Show confirmation
                alert('Redirecting to WhatsApp to send your inquiry. Please click Send in WhatsApp to complete your booking request.');
            } else {
                // Formspree is configured - let it submit normally
                // Show loading message
                const submitBtn = this.querySelector('.btn-submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Form will submit to Formspree
                // On success, Formspree will show a thank you page
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // Travelers Dropdown Logic
    const travelersInput = document.getElementById('travelersInput');
    const travelersDropdown = document.getElementById('travelersDropdown');
    const closeTravelersBtn = document.getElementById('closeTravelers');
    const travelersSelector = document.getElementById('travelersSelector');

    // Toggle dropdown
    if (travelersInput) {
        travelersInput.addEventListener('click', function (e) {
            e.stopPropagation();
            travelersDropdown.classList.toggle('active');
        });
    }

    // Close on 'Done' button
    if (closeTravelersBtn) {
        closeTravelersBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            travelersDropdown.classList.remove('active');
        });
    }

    // Close when clicking outside
    document.addEventListener('click', function (e) {
        if (travelersSelector && !travelersSelector.contains(e.target)) {
            travelersDropdown.classList.remove('active');
        }
    });
});

// Global function for traveler updates
window.updateTraveler = function (type, change) {
    const adultsCountSpan = document.getElementById('adultsCount');
    const childrenCountSpan = document.getElementById('childrenCount');
    const numAdultsInput = document.getElementById('numAdults');
    const numChildrenInput = document.getElementById('numChildren');
    const travelersInput = document.getElementById('travelersInput');

    let currentAdults = parseInt(adultsCountSpan.innerText);
    let currentChildren = parseInt(childrenCountSpan.innerText);

    if (type === 'adults') {
        currentAdults += change;
        if (currentAdults < 1) currentAdults = 1; // Minimum 1 adult
        adultsCountSpan.innerText = currentAdults;
        numAdultsInput.value = currentAdults;
    } else if (type === 'children') {
        currentChildren += change;
        if (currentChildren < 0) currentChildren = 0; // Minimum 0 children
        childrenCountSpan.innerText = currentChildren;
        numChildrenInput.value = currentChildren;
    }

    // Update summary text
    const adultText = currentAdults === 1 ? '1 Adult' : `${currentAdults} Adults`;
    const childText = currentChildren === 1 ? '1 Child' : `${currentChildren} Children`;

    if (currentChildren > 0) {
        travelersInput.value = `${adultText}, ${childText}`;
    } else {
        travelersInput.value = adultText;
    }
};
