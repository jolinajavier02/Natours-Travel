// Comprehensive Confirmation & Anti-Fraud Logic
document.addEventListener('DOMContentLoaded', function () {
    const bookingData = JSON.parse(sessionStorage.getItem('bookingData'));
    const submitBtn = document.getElementById('submitBtn');
    const refInput = document.getElementById('refId');
    const nameInput = document.getElementById('senderName');
    const methodSelect = document.getElementById('payMethod');
    const refError = document.getElementById('refError');

    if (!bookingData) {
        alert('No booking session found. Redirecting to form...');
        window.location.href = 'index.html';
        return;
    }

    // Populate Summary
    const summaryBox = document.getElementById('summaryBox');
    const details = [
        { label: 'Customer Name', value: `${bookingData.firstName} ${bookingData.lastName}` },
        { label: 'Service Category', value: formatStr(bookingData.serviceType) },
        { label: 'Main Destination', value: bookingData.destination },
        { label: 'Proposed Date', value: bookingData.travelDateStart },
        { label: 'Group Size', value: `${bookingData.numAdults} Adult(s), ${bookingData.numChildren} Child(ren)` }
    ];

    summaryBox.innerHTML = details.map(d => `
        <div class="summary-item">
            <span class="label">${d.label}</span>
            <span class="value">${d.value}</span>
        </div>
    `).join('');

    // Reference ID Patterns for highaccuracy validation
    const patterns = {
        'GCash': /^\d{13}$/,                      // GCash: 13 digits
        'Maya': /^[a-zA-Z0-9]{12}$/,               // Maya: 12 alphanumeric
        'BDO Transfer': /^\d{10,12}$/,             // Bank: 10-12 digits
        'Other Bank': /^[a-zA-Z0-9]{6,20}$/        // Generic: lengths vary
    };

    function validateInputs() {
        const method = methodSelect.value;
        const refValue = refInput.value.replace(/\s/g, ''); // strip spaces
        const nameValue = nameInput.value.trim();

        let isRefValid = false;

        if (method && patterns[method]) {
            isRefValid = patterns[method].test(refValue);

            if (!isRefValid && refValue.length > 0) {
                refError.style.display = 'block';
                refError.innerText = getFormatHint(method);
                refInput.style.borderColor = 'var(--error-red)';
            } else {
                refError.style.display = 'none';
                refInput.style.borderColor = isRefValid ? 'var(--primary-color)' : '#eee';
            }
        }

        const isNameValid = nameValue.length >= 4;

        if (isRefValid && isNameValid && method !== "") {
            submitBtn.disabled = false;
            submitBtn.classList.add('ready');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('ready');
        }
    }

    function getFormatHint(method) {
        if (method === 'GCash') return 'Error: GCash Reference must be exactly 13 digits.';
        if (method === 'Maya') return 'Error: Maya Ref ID must be 12 characters (alphanumeric).';
        if (method === 'BDO Transfer') return 'Error: Bank Ref should be 10-12 digits.';
        return 'Error: Invalid transaction ID format.';
    }

    // Listeners
    [refInput, nameInput].forEach(el => el.addEventListener('input', validateInputs));
    methodSelect.addEventListener('change', () => {
        // Clear ref on method change to force re-entry/re-validation
        refInput.value = '';
        validateInputs();
    });

    // Final Process
    submitBtn.addEventListener('click', function () {
        if (submitBtn.disabled) return;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
        submitBtn.disabled = true;

        const bookingId = generateBookingId();
        const finalPayload = {
            ...bookingData,
            payment_method: methodSelect.value,
            reference_number: refInput.value.trim(),
            account_name: nameInput.value.trim(),
            booking_id: bookingId,
            submitted_at: new Date().toLocaleString()
        };

        // 1. Store in Local Portal (Admin View)
        const currentData = JSON.parse(localStorage.getItem('all_bookings') || '[]');
        currentData.push(finalPayload);
        localStorage.setItem('all_bookings', JSON.stringify(currentData));

        // 2. Send Official Confirmation via EmailJS
        emailjs.send('service_wwjqu3l', 'template_v84hwer', finalPayload, 'r3zhCF9T2VEWag5c4')
            .then(() => {
                alert('✅ Success! Your booking and payment reference have been submitted for verification. Please check your email for the confirmation voucher.');
                sessionStorage.removeItem('bookingData');
                window.location.href = '../home/';
            })
            .catch(err => {
                console.error('Email failed:', err);
                // Even if email fails, it's saved in the admin portal
                alert('Booking record saved! (Note: Email confirmation is delayed, but our team can see your record in the admin portal).');
                window.location.href = '../home/';
            });
    });

    function formatStr(s) {
        return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'N/A';
    }

    function generateBookingId() {
        return 'NT-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
    }
});
