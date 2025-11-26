// Admin Panel Script - Quotation Generator

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('quotationForm');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemsContainer = document.getElementById('itemsContainer');
    const resetBtn = document.getElementById('resetBtn');
    const generatedLinkDiv = document.getElementById('generatedLink');
    const quotationLinkInput = document.getElementById('quotationLink');
    const copyLinkBtn = document.getElementById('copyLinkBtn');

    // Calculate totals
    function calculateTotals() {
        let subtotal = 0;
        const amounts = document.querySelectorAll('.item-amount');

        amounts.forEach(input => {
            const value = parseFloat(input.value) || 0;
            subtotal += value;
        });

        const serviceFee = parseFloat(document.getElementById('serviceFee').value) || 0;
        const total = subtotal + serviceFee;

        document.getElementById('subtotal').textContent = `₱${subtotal.toFixed(2)}`;
        document.getElementById('totalAmount').textContent = `₱${total.toFixed(2)}`;
    }

    // Add event listeners to existing amount inputs
    function attachAmountListeners() {
        document.querySelectorAll('.item-amount').forEach(input => {
            input.addEventListener('input', calculateTotals);
        });
        document.getElementById('serviceFee').addEventListener('input', calculateTotals);
    }

    // Add new pricing item
    addItemBtn.addEventListener('click', function () {
        const newItem = document.createElement('div');
        newItem.className = 'price-item';
        newItem.innerHTML = `
            <button type="button" class="btn-remove-item">Remove</button>
            <div class="form-row">
                <div class="form-group">
                    <label>Item Description *</label>
                    <input type="text" class="item-description" placeholder="e.g., Hotel accommodation" required>
                </div>
                <div class="form-group" style="max-width: 200px;">
                    <label>Amount (PHP) *</label>
                    <input type="number" class="item-amount" placeholder="0.00" step="0.01" required>
                </div>
            </div>
        `;

        itemsContainer.appendChild(newItem);
        attachAmountListeners();

        // Remove item functionality
        newItem.querySelector('.btn-remove-item').addEventListener('click', function () {
            newItem.remove();
            calculateTotals();
        });
    });

    // Form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect form data
        const quotationData = {
            id: generateQuotationId(),
            customerName: document.getElementById('customerName').value,
            customerEmail: document.getElementById('customerEmail').value,
            customerPhone: document.getElementById('customerPhone').value,
            serviceType: document.getElementById('serviceType').value,
            destination: document.getElementById('destination').value,
            travelDates: document.getElementById('travelDates').value,
            numTravelers: document.getElementById('numTravelers').value,
            validUntil: document.getElementById('validUntil').value,
            items: [],
            serviceFee: parseFloat(document.getElementById('serviceFee').value) || 0,
            notes: document.getElementById('notes').value,
            createdAt: new Date().toISOString()
        };

        // Collect pricing items
        const descriptions = document.querySelectorAll('.item-description');
        const amounts = document.querySelectorAll('.item-amount');

        descriptions.forEach((desc, index) => {
            quotationData.items.push({
                description: desc.value,
                amount: parseFloat(amounts[index].value) || 0
            });
        });

        // Calculate totals
        quotationData.subtotal = quotationData.items.reduce((sum, item) => sum + item.amount, 0);
        quotationData.total = quotationData.subtotal + quotationData.serviceFee;

        // Save to localStorage
        saveQuotation(quotationData);

        // Generate link
        const baseUrl = window.location.origin + window.location.pathname.replace('admin.html', 'index.html');
        const quotationUrl = `${baseUrl}?id=${quotationData.id}`;

        quotationLinkInput.value = quotationUrl;
        generatedLinkDiv.style.display = 'block';

        // Scroll to link
        generatedLinkDiv.scrollIntoView({ behavior: 'smooth' });

        // Show success message
        alert('Quotation generated successfully! Share the link with your customer.');
    });

    // Copy link functionality
    copyLinkBtn.addEventListener('click', function () {
        quotationLinkInput.select();
        document.execCommand('copy');

        copyLinkBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyLinkBtn.textContent = 'Copy Link';
        }, 2000);
    });

    // Reset form
    resetBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to reset the form?')) {
            form.reset();
            generatedLinkDiv.style.display = 'none';

            // Remove extra items, keep only first one
            const items = itemsContainer.querySelectorAll('.price-item');
            for (let i = 1; i < items.length; i++) {
                items[i].remove();
            }

            calculateTotals();
        }
    });

    // Generate unique quotation ID
    function generateQuotationId() {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 7);
        return `QT-${timestamp}-${randomStr}`.toUpperCase();
    }

    // Save quotation to localStorage
    function saveQuotation(data) {
        const quotations = JSON.parse(localStorage.getItem('quotations') || '{}');
        quotations[data.id] = data;
        localStorage.setItem('quotations', JSON.stringify(quotations));
    }

    // Set default valid until date (7 days from now)
    const validUntilInput = document.getElementById('validUntil');
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    validUntilInput.value = defaultDate.toISOString().split('T')[0];

    // Initialize
    attachAmountListeners();
});
