// Admin Portal Functionality
document.addEventListener('DOMContentLoaded', function () {
    // State management
    const state = {
        bookings: JSON.parse(localStorage.getItem('all_bookings') || '[]'),
        quotations: JSON.parse(localStorage.getItem('quotations') || '{}'),
        activeTab: 'overview'
    };

    // DOM Elements
    const tabButtons = document.querySelectorAll('.nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabTitle = document.getElementById('tabTitle');
    const tabSubtitle = document.getElementById('tabSubtitle');
    const refreshBtn = document.getElementById('refreshData');

    // Stats Elements
    const totalBookingsEl = document.getElementById('totalBookingsCount');
    const totalQuotesEl = document.getElementById('totalQuotesCount');
    const visaRequestsEl = document.getElementById('visaRequestsCount');
    const totalRevenueEl = document.getElementById('totalRevenue');

    // Initialize
    function init() {
        renderStats();
        renderRecentBookings();
        renderAllBookings();
        renderAllQuotations();
        setupEventListeners();
    }

    function setupEventListeners() {
        // Tab switching
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = btn.getAttribute('data-tab');
                switchTab(tab);
            });
        });

        // Refresh data
        refreshBtn.addEventListener('click', () => {
            state.bookings = JSON.parse(localStorage.getItem('all_bookings') || '[]');
            state.quotations = JSON.parse(localStorage.getItem('quotations') || '{}');
            renderStats();
            renderRecentBookings();
            renderAllBookings();
            renderAllQuotations();

            const icon = refreshBtn.querySelector('i');
            icon.classList.add('fa-spin');
            setTimeout(() => icon.classList.remove('fa-spin'), 1000);
        });

        // Search functionality
        document.getElementById('bookingSearch').addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = state.bookings.filter(b =>
                `${b.firstName} ${b.lastName}`.toLowerCase().includes(term) ||
                b.serviceType.toLowerCase().includes(term)
            );
            renderBookingsTable('allBookingsTable', filtered);
        });

        document.getElementById('quoteSearch').addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const quotesArray = Object.values(state.quotations);
            const filtered = quotesArray.filter(q =>
                q.customerName.toLowerCase().includes(term) ||
                q.id.toLowerCase().includes(term)
            );
            renderQuotesTable(filtered);
        });
    }

    function switchTab(tabId) {
        state.activeTab = tabId;

        // Update UI
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });

        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === `${tabId}Tab`);
        });

        // Update Titles
        const titles = {
            overview: ['Dashboard Overview', 'Welcome back, Admin!'],
            bookings: ['Booking Management', 'Track and manage user bookings'],
            quotations: ['Quotation Management', 'View and track generated quotes']
        };

        [tabTitle.innerText, tabSubtitle.innerText] = titles[tabId];
    }

    function renderStats() {
        const bookings = state.bookings;
        const quotes = Object.values(state.quotations);

        totalBookingsEl.innerText = bookings.length;
        totalQuotesEl.innerText = quotes.length;

        const visaCount = bookings.filter(b => b.serviceType === 'visa').length;
        visaRequestsEl.innerText = visaCount;

        // Roughly estimate revenue from paid bookings (mock logic)
        // In a real app, this would come from the database
        totalRevenueEl.innerText = '₱' + (bookings.length * 5500).toLocaleString();
    }

    function renderRecentBookings() {
        const recent = [...state.bookings].reverse().slice(0, 5);
        renderBookingsTable('recentBookingsTable', recent, true);
    }

    function renderAllBookings() {
        renderBookingsTable('allBookingsTable', [...state.bookings].reverse());
    }

    function renderBookingsTable(tableId, data, isCompact = false) {
        const tbody = document.getElementById(tableId);
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No records found</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(b => `
            <tr>
                <td>${new Date(b.submitted_at || Date.now()).toLocaleDateString()}</td>
                <td>
                    <div style="font-weight:600">${b.firstName} ${b.lastName}</div>
                    <div style="font-size:0.8rem;color:#888">${b.email}</div>
                </td>
                <td><span class="service-type-tag">${capitalize(b.serviceType)}</span></td>
                ${isCompact ? '' : `<td>${b.destination || 'N/A'}</td>`}
                ${isCompact ? '' : `<td>${b.payment_method || 'N/A'}</td>`}
                <td><span class="status-badge status-pending">Pending</span></td>
                ${isCompact ? '' : `
                <td>
                    <button class="btn-action" onclick="viewBookingDetail('${b.booking_id}')"><i class="fas fa-eye"></i></button>
                    <button class="btn-action" onclick="deleteBooking('${b.booking_id}')"><i class="fas fa-trash"></i></button>
                </td>
                `}
            </tr>
        `).join('');
    }

    function renderAllQuotations() {
        const quotes = Object.values(state.quotations).reverse();
        renderQuotesTable(quotes);
    }

    function renderQuotesTable(data) {
        const tbody = document.getElementById('allQuotesTable');
        if (!tbody) return;

        tbody.innerHTML = data.map(q => `
            <tr>
                <td><code style="background:#f0f0f0;padding:2px 5px;border-radius:4px">${q.id}</code></td>
                <td>${q.customerName}</td>
                <td>${capitalize(q.serviceType)}</td>
                <td>₱${q.total.toLocaleString()}</td>
                <td>${new Date(q.validUntil).toLocaleDateString()}</td>
                <td>
                    <button class="btn-action" onclick="window.open('../../quotation/?id=${q.id}', '_blank')"><i class="fas fa-external-link-alt"></i></button>
                    <button class="btn-action" onclick="deleteQuote('${q.id}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    function capitalize(s) {
        return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'N/A';
    }

    // Global actions for onclick
    window.viewBookingDetail = (id) => {
        const booking = state.bookings.find(b => b.booking_id === id);
        if (!booking) return;

        const modal = document.getElementById('bookingModal');
        const content = document.getElementById('bookingDetailContent');

        content.innerHTML = `
            <h2 style="margin-bottom:1.5rem;color:var(--primary-color)">Booking Details: ${id}</h2>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                <div>
                    <h4 style="border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:10px">Customer</h4>
                    <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
                    <p><strong>Email:</strong> ${booking.email}</p>
                    <p><strong>Phone:</strong> ${booking.phone}</p>
                </div>
                <div>
                    <h4 style="border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:10px">Trip</h4>
                    <p><strong>Service:</strong> ${capitalize(booking.serviceType)}</p>
                    <p><strong>Destination:</strong> ${booking.destination}</p>
                    <p><strong>Travelers:</strong> ${booking.numAdults} Adults, ${booking.numChildren} Children</p>
                </div>
            </div>
            <div style="margin-top:20px;padding:15px;background:#f9f9f9;border-radius:8px">
                <h4 style="margin-bottom:10px">Payment Information</h4>
                <p><strong>Method:</strong> ${booking.payment_method}</p>
                <p><strong>Reference:</strong> ${booking.reference_number}</p>
                <p><strong>Account:</strong> ${booking.account_name}</p>
            </div>
            <div style="margin-top:20px">
                 <h4 style="margin-bottom:10px">Additional Details</h4>
                 <p style="white-space:pre-line;color:#666">${booking.additionalDetails || 'No additional notes provided.'}</p>
            </div>
        `;

        modal.style.display = 'block';
    };

    window.deleteBooking = (id) => {
        if (confirm('Are you sure you want to delete this booking record?')) {
            state.bookings = state.bookings.filter(b => b.booking_id !== id);
            localStorage.setItem('all_bookings', JSON.stringify(state.bookings));
            renderStats();
            renderRecentBookings();
            renderAllBookings();
        }
    };

    window.deleteQuote = (id) => {
        if (confirm('Are you sure you want to delete this quotation?')) {
            delete state.quotations[id];
            localStorage.setItem('quotations', JSON.stringify(state.quotations));
            renderStats();
            renderAllQuotations();
        }
    };

    // Close Modal
    document.querySelector('.close-modal').onclick = () => {
        document.getElementById('bookingModal').style.display = 'none';
    };

    window.onclick = (event) => {
        const modal = document.getElementById('bookingModal');
        if (event.target == modal) modal.style.display = 'none';
    };

    init();
});
