// Customer Quotation View Script

document.addEventListener('DOMContentLoaded', function () {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const quotationContent = document.getElementById('quotationContent');
    const paymentProofForm = document.getElementById('paymentProofForm');
    const uploadSuccess = document.getElementById('uploadSuccess');

    // Get quotation ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const quotationId = urlParams.get('id');

    if (!quotationId) {
        showError();
        return;
    }

    // Load quotation data
    loadQuotation(quotationId);

    function loadQuotation(id) {
        // Simulate loading delay
        setTimeout(() => {
            const quotations = JSON.parse(localStorage.getItem('quotations') || '{}');
            const quotation = quotations[id];

            if (!quotation) {
                showError();
                return;
            }

            // Check if quotation is still valid
            const validUntil = new Date(quotation.validUntil);
            const today = new Date();

            if (today > validUntil) {
                showError('This quotation has expired.');
                return;
            }

            // Display quotation
            displayQuotation(quotation);
            loadingState.style.display = 'none';
            quotationContent.style.display = 'block';
        }, 800);
    }

    function displayQuotation(data) {
        // Customer Info
        document.getElementById('customerName').textContent = data.customerName;
        document.getElementById('customerEmail').textContent = data.customerEmail;
        document.getElementById('customerPhone').textContent = data.customerPhone;
        document.getElementById('serviceType').textContent = formatServiceType(data.serviceType);

        // Trip Details
        document.getElementById('destination').textContent = data.destination;
        document.getElementById('travelDates').textContent = data.travelDates;
        document.getElementById('numTravelers').textContent = data.numTravelers;
        document.getElementById('validUntil').textContent = formatDate(data.validUntil);

        // Pricing Items
        const pricingItems = document.getElementById('pricingItems');
        pricingItems.innerHTML = '';

        data.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.description}</td>
                <td>₱${item.amount.toFixed(2)}</td>
            `;
            pricingItems.appendChild(row);
        });

        // Totals
        document.getElementById('subtotalDisplay').textContent = `₱${data.subtotal.toFixed(2)}`;
        document.getElementById('totalDisplay').textContent = `₱${data.total.toFixed(2)}`;

        // Service Fee (show only if exists)
        if (data.serviceFee > 0) {
            document.getElementById('serviceFeeRow').style.display = 'table-row';
            document.getElementById('serviceFeeDisplay').textContent = `₱${data.serviceFee.toFixed(2)}`;
        }

        // Notes (show only if exists)
        if (data.notes && data.notes.trim()) {
            document.getElementById('notesSection').style.display = 'block';
            document.getElementById('notesContent').textContent = data.notes;
        }
    }

    function showError(message = 'The quotation you\'re looking for doesn\'t exist or has expired.') {
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        errorState.querySelector('p').textContent = message;
    }

    function formatServiceType(type) {
        const types = {
            'flight': 'Flight Booking',
            'hotel': 'Hotel Reservation',
            'tour': 'Tour Package',
            'cruise': 'Cruise Booking',
            'visa': 'Visa Assistance',
            'package': 'Complete Package'
        };
        return types[type] || type;
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Payment Proof Upload
    paymentProofForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const fileInput = document.getElementById('paymentProof');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        // Simulate upload (in real implementation, you'd upload to a server or cloud storage)
        const reader = new FileReader();
        reader.onload = function (e) {
            // Store payment proof info
            const paymentData = {
                quotationId: quotationId,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                uploadedAt: new Date().toISOString(),
                fileData: e.target.result // Base64 encoded file
            };

            // Save to localStorage (in production, send to server)
            const payments = JSON.parse(localStorage.getItem('paymentProofs') || '[]');
            payments.push(paymentData);
            localStorage.setItem('paymentProofs', JSON.stringify(payments));

            // Send notification email (you would integrate EmailJS here)
            sendPaymentNotification(paymentData);

            // Show success message
            uploadSuccess.style.display = 'block';
            paymentProofForm.style.display = 'none';

            // Scroll to success message
            uploadSuccess.scrollIntoView({ behavior: 'smooth' });
        };

        reader.readAsDataURL(file);
    });

    function sendPaymentNotification(paymentData) {
        // TODO: Integrate with EmailJS to send notification to admin
        // For now, just log to console
        console.log('Payment proof uploaded:', paymentData);

        // You can add EmailJS integration here similar to the booking form
        // emailjs.send('service_id', 'template_id', {
        //     quotation_id: paymentData.quotationId,
        //     file_name: paymentData.fileName,
        //     uploaded_at: paymentData.uploadedAt
        // });
    }
});
