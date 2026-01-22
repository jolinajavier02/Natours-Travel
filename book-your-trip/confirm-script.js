// Enhanced Confirmation & Payment Script
document.addEventListener('DOMContentLoaded', function () {
    const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
    const btnDone = document.getElementById('btnDone');
    const refInput = document.getElementById('refNum');
    const nameInput = document.getElementById('payorName');
    const methodInput = document.getElementById('payMethod');

    if (!bookingData) {
        alert('No booking data found. Please fill out the booking form first.');
        window.location.href = 'index.html';
        return;
    }

    // Populate Summary
    const summaryDiv = document.getElementById('summaryContent');
    const items = [
        { label: 'Customer', value: `${bookingData.firstName} ${bookingData.lastName}` },
        { label: 'Service', value: formatServiceType(bookingData.serviceType) },
        { label: 'Destination', value: bookingData.destination },
        { label: 'Travel Date', value: bookingData.travelDateStart },
        { label: 'Travelers', value: `${bookingData.numAdults} Adult(s), ${bookingData.numChildren} Child(ren)` }
    ];

    summaryDiv.innerHTML = items.map(item => `
        <div class="summary-item">
            <span class="label">${item.label}</span>
            <span class="value">${item.value}</span>
        </div>
    `).join('');

    // Form Validation (Enable button only when reference is input)
    function validateForm() {
        const isRefValid = refInput.value.trim().length >= 6;
        const isNameValid = nameInput.value.trim().length >= 3;
        const isMethodValid = methodInput.value !== "";

        if (isRefValid && isNameValid && isMethodValid) {
            btnDone.disabled = false;
            btnDone.classList.add('active');
        } else {
            btnDone.disabled = true;
            btnDone.classList.remove('active');
        }
    }

    refInput.addEventListener('input', validateForm);
    nameInput.addEventListener('input', validateForm);
    methodInput.addEventListener('change', validateForm);

    // Final Submission
    btnDone.addEventListener('click', function () {
        if (btnDone.disabled) return;

        btnDone.innerText = 'Processing...';
        btnDone.disabled = true;

        const paymentData = {
            payment_method: methodInput.value,
            reference_number: refInput.value,
            account_name: nameInput.value,
            submitted_at: new Date().toLocaleString()
        };

        // Combine data
        const finalData = { ...bookingData, ...paymentData };

        // Save to Local Admin Portal
        const allBookings = JSON.parse(localStorage.getItem('all_bookings') || '[]');
        allBookings.push({
            ...finalData,
            booking_id: generateBookingId()
        });
        localStorage.setItem('all_bookings', JSON.stringify(allBookings));

        // Send Email via EmailJS
        emailjs.send('service_wwjqu3l', 'template_v84hwer', {
            ...finalData,
            booking_id: generateBookingId()
        }, 'r3zhCF9T2VEWag5c4')
            .then(() => {
                alert('🎉 Booking Successfully Submitted! Please check your email for confirmation. Our team will contact you shortly.');
                sessionStorage.removeItem('bookingData');
                window.location.href = '../home/';
            })
            .catch(err => {
                console.error('Email error:', err);
                alert('There was a problem sending the confirmation email, but your booking has been saved in our system.');
                window.location.href = '../home/';
            });
    });

    function formatServiceType(type) {
        const types = { 'flight': 'Flight', 'hotel': 'Hotel', 'tour': 'Tour', 'cruise': 'Cruise', 'visa': 'Visa' };
        return types[type] || type;
    }

    function generateBookingId() {
        return 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    }
});
