// Confirmation Page Script

document.addEventListener('DOMContentLoaded', function () {
    // Get booking data from sessionStorage
    const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));

    if (!bookingData) {
        alert('No booking data found. Please fill out the booking form first.');
        window.location.href = 'index.html';
        return;
    }

    // Display booking information
    displayBookingInfo(bookingData);

    // File upload handling
    const fileInput = document.getElementById('paymentProof');
    const fileWrapper = document.getElementById('fileUploadWrapper');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const uploadSuccess = document.getElementById('uploadSuccess');
    const submitButton = document.getElementById('submitBooking');
    const fileNameDisplay = document.getElementById('fileName');

    let uploadedFile = null;

    // Click wrapper to trigger file input
    fileWrapper.addEventListener('click', function () {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', function (e) {
        const file = e.target.files[0];

        if (!file) return;

        // Validate file
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG, etc.)');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            alert('File size must be less than 5MB');
            return;
        }

        uploadedFile = file;

        // Show success state
        uploadPlaceholder.style.display = 'none';
        uploadSuccess.style.display = 'block';
        fileNameDisplay.textContent = file.name;
        fileWrapper.classList.add('has-file');

        // Enable submit button
        submitButton.disabled = false;
    });

    // Submit booking
    submitButton.addEventListener('click', function () {
        // Validate payment details
        const paymentMethod = document.getElementById('paymentMethod').value;
        const referenceNumber = document.getElementById('referenceNumber').value;
        const accountName = document.getElementById('accountName').value;

        if (!paymentMethod) {
            alert('Please select the payment method you used.');
            return;
        }

        if (!referenceNumber || referenceNumber.trim() === '') {
            alert('Please enter the payment reference number.');
            return;
        }

        if (!accountName || accountName.trim() === '') {
            alert('Please enter the account name you used for payment.');
            return;
        }

        if (!uploadedFile) {
            alert('Please upload payment proof before submitting.');
            return;
        }

        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;

        // Read file as base64
        const reader = new FileReader();
        reader.onload = function (e) {
            const paymentProofData = e.target.result;

            // Send emails with payment details
            sendBookingEmails(bookingData, uploadedFile.name, paymentProofData, paymentMethod, referenceNumber, accountName);
        };

        reader.readAsDataURL(uploadedFile);
    });

    function displayBookingInfo(data) {
        // Personal Info
        document.getElementById('fullName').textContent = `${data.firstName} ${data.middleName || ''} ${data.lastName}`.trim();
        document.getElementById('dob').textContent = data.dateOfBirth;
        document.getElementById('gender').textContent = data.gender;
        document.getElementById('email').textContent = data.email;
        document.getElementById('phone').textContent = data.phone;
        document.getElementById('altContact').textContent = data.alternateContact || 'N/A';

        // Trip Details
        document.getElementById('serviceType').textContent = formatServiceType(data.serviceType);
        document.getElementById('destination').textContent = data.destination;

        // Format dates
        let dateText = '';
        if (data.travelDateStart && data.travelDateStart !== 'N/A') {
            dateText = data.travelDateStart;
            if (data.travelDateEnd && data.travelDateEnd !== 'N/A') {
                dateText += ` to ${data.travelDateEnd}`;
            }
        } else {
            dateText = 'To be confirmed';
        }
        document.getElementById('travelDates').textContent = dateText;
        document.getElementById('travelers').textContent = `${data.numAdults} Adults, ${data.numChildren} Children`;

        // Service-specific details
        const specificDetails = document.getElementById('serviceSpecificDetails');
        let detailsHTML = '<div class="info-grid" style="margin-top: 1rem;">';

        if (data.serviceType === 'flight') {
            detailsHTML += `
                <div class="info-item"><span class="label">Departure</span><span class="value">${data.departureCity || 'N/A'}</span></div>
                <div class="info-item"><span class="label">Arrival</span><span class="value">${data.arrivalCity || 'N/A'}</span></div>
                <div class="info-item"><span class="label">Class</span><span class="value">${data.flightClass || 'N/A'}</span></div>
                <div class="info-item"><span class="label">Type</span><span class="value">${data.flightType || 'N/A'}</span></div>
            `;
        } else if (data.serviceType === 'hotel') {
            detailsHTML += `
                <div class="info-item"><span class="label">Room Type</span><span class="value">${data.roomType || 'N/A'}</span></div>
                <div class="info-item"><span class="label">Nights</span><span class="value">${data.numNights || 'N/A'}</span></div>
                <div class="info-item"><span class="label">Rooms</span><span class="value">${data.numRooms || 'N/A'}</span></div>
            `;
        }

        detailsHTML += '</div>';
        specificDetails.innerHTML = detailsHTML;
    }

    function formatServiceType(type) {
        const types = {
            'flight': 'Flight Booking',
            'hotel': 'Hotel Reservation',
            'tour': 'Tour Package',
            'cruise': 'Cruise Booking',
            'visa': 'Visa Assistance'
        };
        return types[type] || type;
    }

    function sendBookingEmails(bookingData, fileName, fileData, paymentMethod, referenceNumber, accountName) {
        // Prepare email parameters
        const emailParams = {
            customer_name: `${bookingData.firstName} ${bookingData.lastName}`,
            customer_email: bookingData.email,
            customer_phone: bookingData.phone,
            service_type: formatServiceType(bookingData.serviceType),
            destination: bookingData.destination,
            travel_dates: document.getElementById('travelDates').textContent,
            num_travelers: `${bookingData.numAdults} Adults, ${bookingData.numChildren} Children`,
            payment_method: paymentMethod,
            reference_number: referenceNumber,
            account_name: accountName,
            payment_file: fileName,
            booking_id: generateBookingId(),
            submitted_at: new Date().toLocaleString()
        };

        // Send customer confirmation email
        const customerEmail = emailjs.send('service_wwjqu3l', 'template_v84hwer', emailParams, { publicKey: 'r3zhCF9T2VEWag5c4' });

        // Send admin notification email
        const adminEmail = emailjs.send('service_wwjqu3l', 'template_3fo9q8j', {
            ...emailParams,
            ...bookingData,
            additionalDetails: bookingData.additionalDetails || 'None'
        }, { publicKey: 'r3zhCF9T2VEWag5c4' });

        Promise.all([customerEmail, adminEmail])
            .then(function () {
                // Clear session storage
                sessionStorage.removeItem('bookingData');

                // Show success message
                alert('Thank you! Your booking and payment proof have been submitted successfully. We will review your information and send you a confirmation email within 24 hours.');

                // Redirect to home
                window.location.href = '../home/index.html';
            })
            .catch(function (error) {
                console.error('Email sending failed:', error);
                submitButton.textContent = 'Submit Booking & Payment Proof';
                submitButton.disabled = false;
                alert('There was an error submitting your booking. Please try again or contact us directly.');
            });
    }

    function generateBookingId() {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 7);
        return `BK-${timestamp}-${randomStr}`.toUpperCase();
    }
});
