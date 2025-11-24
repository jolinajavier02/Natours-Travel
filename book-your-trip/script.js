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

    // Form submission handler with EmailJS
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Show loading state
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Collect form data
            const formData = new FormData(this);
            const templateParams = {
                firstName: formData.get('firstName'),
                middleName: formData.get('middleName') || 'N/A',
                lastName: formData.get('lastName'),
                dateOfBirth: formData.get('dateOfBirth'),
                gender: formData.get('gender'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                alternateContact: formData.get('alternateContact') || 'N/A',
                serviceType: formData.get('serviceType'),
                destination: formData.get('destination'),
                travelDateStart: formData.get('travelDateStart'),
                travelDateEnd: formData.get('travelDateEnd'),
                numAdults: formData.get('numAdults'),
                numChildren: formData.get('numChildren'),
                // Service-specific fields
                departureCity: formData.get('departureCity') || 'N/A',
                arrivalCity: formData.get('arrivalCity') || 'N/A',
                flightClass: formData.get('flightClass') || 'N/A',
                flightType: formData.get('flightType') || 'N/A',
                roomType: formData.get('roomType') || 'N/A',
                bedPreference: formData.get('bedPreference') || 'N/A',
                numNights: formData.get('numNights') || 'N/A',
                numRooms: formData.get('numRooms') || 'N/A',
                preferredLocation: formData.get('preferredLocation') || 'N/A',
                tourType: formData.get('tourType') || 'N/A',
                tourPackage: formData.get('tourPackage') || 'N/A',
                tourActivities: formData.get('tourActivities') || 'N/A',
                tourBudget: formData.get('tourBudget') || 'N/A',
                cruiseLine: formData.get('cruiseLine') || 'N/A',
                cabinType: formData.get('cabinType') || 'N/A',
                cruiseDestination: formData.get('cruiseDestination') || 'N/A',
                visaCountry: formData.get('visaCountry') || 'N/A',
                visaType: formData.get('visaType') || 'N/A',
                visaAppointment: formData.get('visaAppointment') || 'N/A',
                additionalDetails: formData.get('additionalDetails') || 'None'
            };

            // Send email using EmailJS
            // Explicitly passing public key 'r3zhCF9T2VEWag5c4' to ensure it's picked up
            emailjs.send('service_wwjqu3l', 'template_booking', templateParams, 'r3zhCF9T2VEWag5c4')
                .then(function (response) {
                    console.log('SUCCESS!', response.status, response.text);

                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // Show success message
                    alert('Thank you for your booking inquiry! We have received your request and will contact you shortly via email or phone to confirm your booking details and provide a quotation.');

                    // Reset form
                    bookingForm.reset();

                    // Reset travelers display
                    const travelersInput = document.getElementById('travelersInput');
                    if (travelersInput) {
                        travelersInput.value = '1 Adult, 0 Children';
                    }
                    const adultsCount = document.getElementById('adultsCount');
                    const childrenCount = document.getElementById('childrenCount');
                    if (adultsCount) adultsCount.innerText = '1';
                    if (childrenCount) childrenCount.innerText = '0';

                }, function (error) {
                    console.log('FAILED...', error);

                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // Show error and offer WhatsApp fallback
                    // Display the actual error text to help debugging
                    const errorMessage = error.text || 'Unknown error';
                    if (confirm(`There was an error sending your inquiry via email: ${errorMessage}. \n\nWould you like to send it via WhatsApp instead?`)) {
                        // Create WhatsApp message
                        let message = `*New Booking Inquiry*\n\n`;
                        message += `*Personal Information:*\n`;
                        message += `Name: ${templateParams.firstName} ${templateParams.middleName} ${templateParams.lastName}\n`;
                        message += `DOB: ${templateParams.dateOfBirth}\n`;
                        message += `Gender: ${templateParams.gender}\n`;
                        message += `Email: ${templateParams.email}\n`;
                        message += `Phone: ${templateParams.phone}\n`;
                        if (templateParams.alternateContact !== 'N/A') message += `Alt Contact: ${templateParams.alternateContact}\n`;

                        message += `\n*Trip Details:*\n`;
                        message += `Service: ${templateParams.serviceType}\n`;
                        message += `Destination: ${templateParams.destination}\n`;
                        message += `Start Date: ${templateParams.travelDateStart}\n`;
                        message += `End Date: ${templateParams.travelDateEnd}\n`;
                        message += `Travelers: ${templateParams.numAdults} Adults, ${templateParams.numChildren} Children\n`;

                        if (templateParams.additionalDetails !== 'None') {
                            message += `\n*Additional Details:*\n${templateParams.additionalDetails}\n`;
                        }

                        // Encode and open WhatsApp
                        const whatsappMessage = encodeURIComponent(message);
                        const whatsappURL = `https://wa.me/639369418559?text=${whatsappMessage}`;
                        window.open(whatsappURL, '_blank');
                    }
                });
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
