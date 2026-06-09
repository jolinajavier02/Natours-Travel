
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

    // Flight Type Logic (One-way vs Round-trip)
    const flightTypeSelect = document.getElementById('flightType');
    const flightReturnDateInput = document.getElementById('flightReturnDate');

    if (flightTypeSelect && flightReturnDateInput) {
        function updateFlightTypeState() {
            const type = flightTypeSelect.value;

            if (type === 'one-way') {
                // One-way: Disable return date
                flightReturnDateInput.disabled = true;
                flightReturnDateInput.style.opacity = '0.5';
                flightReturnDateInput.style.cursor = 'not-allowed';
                flightReturnDateInput.value = '';
            } else {
                // Round-trip (default): Enable return date
                flightReturnDateInput.disabled = false;
                flightReturnDateInput.style.opacity = '1';
                flightReturnDateInput.style.cursor = 'default';
            }
        }

        // Run on change
        flightTypeSelect.addEventListener('change', updateFlightTypeState);

        // Run on init
        updateFlightTypeState();
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
            const serviceType = formData.get('serviceType');

            // Determine dynamic fields based on service type
            let startDate = 'N/A';
            let endDate = 'N/A';
            let details = 'None';

            if (serviceType === 'flight') {
                startDate = formData.get('flightDepartureDate') || 'N/A';
                endDate = formData.get('flightReturnDate') || 'N/A';
                details = formData.get('flightSpecialRequests') || 'None';
            } else if (serviceType === 'hotel') {
                startDate = formData.get('checkInDate') || 'N/A';
                endDate = formData.get('checkOutDate') || 'N/A';
                details = formData.get('hotelSpecialRequests') || 'None';
            } else if (serviceType === 'tour') {
                startDate = formData.get('tourDate') || 'N/A';
                details = formData.get('tourSpecialRequests') || 'None';
            } else if (serviceType === 'cruise') {
                startDate = formData.get('cruiseDate') || 'N/A';
                details = formData.get('cruiseSpecialRequests') || 'None';
            } else if (serviceType === 'visa') {
                startDate = formData.get('visaAppointment') || 'N/A';
                details = formData.get('visaSpecialRequests') || 'None';
            }

            // Explicitly capture traveler counts based on active section
            let numAdults = '1';
            let numChildren = '0';

            if (serviceType === 'flight') {
                numAdults = formData.get('numAdults_f') || '1';
                numChildren = formData.get('numChildren_f') || '0';
            } else if (serviceType === 'hotel') {
                numAdults = formData.get('numAdults_h') || '1';
                numChildren = formData.get('numChildren_h') || '0';
            } else if (serviceType === 'tour') {
                numAdults = formData.get('numAdults_t') || '1';
                numChildren = formData.get('numChildren_t') || '0';
            } else if (serviceType === 'cruise') {
                numAdults = formData.get('numAdults_c') || '1';
                numChildren = formData.get('numChildren_c') || '0';
            } else if (serviceType === 'visa') {
                numAdults = formData.get('numAdults_v') || '1';
                numChildren = formData.get('numChildren_v') || '0';
            }

            // Append traveler counts to details
            const travelerInfo = `Travelers: ${numAdults} Adults, ${numChildren} Children`;

            if (details === 'None' || !details) {
                details = travelerInfo;
            } else {
                details += `\n\n${travelerInfo}`;
            }

            const templateParams = {
                firstName: formData.get('firstName'),
                middleName: formData.get('middleName') || 'N/A',
                lastName: formData.get('lastName'),
                dateOfBirth: formData.get('dateOfBirth'),
                gender: formData.get('gender'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                alternateContact: formData.get('alternateContact') || 'N/A',
                serviceType: serviceType,
                destination: formData.get('destination'),
                travelDateStart: startDate,
                travelDateEnd: endDate,
                numAdults: numAdults,
                numChildren: numChildren,
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
                additionalDetails: details
            };

            // Save booking data to sessionStorage and redirect to confirmation page
            sessionStorage.setItem('bookingData', JSON.stringify(templateParams));

            // Redirect to confirmation page
            window.location.href = 'confirm.html';
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

    // Handle "Select This Package" buttons
    const packageButtons = document.querySelectorAll('.btn-select-package');
    packageButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const service = this.getAttribute('data-service');
            const destination = this.getAttribute('data-destination');
            const pkgName = this.getAttribute('data-package');

            // 1. Set Service Type
            if (serviceTypeSelect) {
                serviceTypeSelect.value = service;
                // Trigger change event to show correct fields
                serviceTypeSelect.dispatchEvent(new Event('change'));
            }

            // 2. Set Destination (General field)
            const destInput = document.getElementById('destination');
            if (destInput) destInput.value = destination;

            // 3. Set Specific Fields based on service
            if (service === 'tour') {
                const tourPkgInput = document.getElementById('tourPackage');
                if (tourPkgInput) tourPkgInput.value = pkgName;
            } else if (service === 'cruise') {
                const cruiseDestInput = document.getElementById('cruiseDestination');
                if (cruiseDestInput) cruiseDestInput.value = destination;
            } else if (service === 'hotel') {
                const prefLocInput = document.getElementById('preferredLocation');
                if (prefLocInput) prefLocInput.value = destination;
            }

            // 4. Scroll to form
            const formSection = document.getElementById('bookingForm');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
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
