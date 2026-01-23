// Admin Portal Functionality
document.addEventListener('DOMContentLoaded', function () {
    // State management
    const state = {
        bookings: JSON.parse(localStorage.getItem('all_bookings') || '[]'),
        messages: JSON.parse(localStorage.getItem('contact_messages') || '[]'),
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
    const visaRequestsEl = document.getElementById('visaRequestsCount');
    const totalRevenueEl = document.getElementById('totalRevenue');

    // Initialize
    function init() {
        renderStats();
        renderRecentBookings();
        renderAllBookings();
        renderMessages();
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
            state.messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
            renderStats();
            renderRecentBookings();
            renderAllBookings();
            renderMessages();

            const icon = refreshBtn.querySelector('i');
            icon.classList.add('fa-spin');
            setTimeout(() => icon.classList.remove('fa-spin'), 1000);
        });

        // Search functionality for bookings
        const bookingSearch = document.getElementById('bookingSearch');
        if (bookingSearch) {
            bookingSearch.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const filtered = state.bookings.filter(b =>
                    `${b.firstName} ${b.lastName}`.toLowerCase().includes(term) ||
                    b.serviceType.toLowerCase().includes(term)
                );
                renderBookingsTable('allBookingsTable', filtered);
            });
        }

        // Search functionality for messages
        const messageSearch = document.getElementById('messageSearch');
        if (messageSearch) {
            messageSearch.addEventListener('input', (e) => {
                const term = e.target.value.toLowerCase();
                const filtered = state.messages.filter(m =>
                    m.name.toLowerCase().includes(term) ||
                    m.subject.toLowerCase().includes(term) ||
                    m.email.toLowerCase().includes(term)
                );
                renderMessagesTable(filtered);
            });
        }

        // Send Reply Button
        const sendReplyBtn = document.getElementById('sendReplyBtn');
        if (sendReplyBtn) {
            sendReplyBtn.addEventListener('click', () => {
                const replyText = document.getElementById('replyText').value;
                if (!replyText.trim()) {
                    alert('Please enter a reply message.');
                    return;
                }

                alert('Reply sent successfully! (Simulated)');
                document.getElementById('replyText').value = '';
                document.getElementById('messageModal').style.display = 'none';

                // Mark current viewing message as read/replied if we tracked ID
                // For now, just a simulation
            });
        }
    }

    function switchTab(tabId) {
        state.activeTab = tabId;

        // Update UI Sidebars
        tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });

        // Determine Content Section
        let contentId = 'bookingsTab'; // Default for sub-categories
        if (tabId === 'overview') contentId = 'overviewTab';
        if (tabId === 'messages') contentId = 'messagesTab';

        // Hide all, show target
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === contentId);
        });

        // Update Titles
        const titles = {
            overview: ['Dashboard Overview', 'Welcome back, Admin!'],
            bookings: ['All Bookings', 'Manage all travel reservations'],
            flight: ['Flight Bookings', 'Manage flight reservations'],
            hotel: ['Hotel Bookings', 'Manage hotel & stay reservations'],
            tour: ['Tour Packages', 'Manage tour bookings'],
            cruise: ['Cruise Bookings', 'Manage cruise reservations'],
            messages: ['Message Center', 'View and reply to customer inquiries']
        };

        if (titles[tabId]) {
            [tabTitle.innerText, tabSubtitle.innerText] = titles[tabId];
        }

        // Re-render table if showing bookings
        if (contentId === 'bookingsTab') {
            renderAllBookings();
        }
    }

    function renderStats() {
        const bookings = state.bookings;
        totalBookingsEl.innerText = bookings.length;

        const visaCount = bookings.filter(b => b.serviceType === 'visa').length;
        visaRequestsEl.innerText = visaCount;

        // Roughly estimate revenue from paid bookings (mock logic)
        totalRevenueEl.innerText = '₱' + (bookings.length * 5500).toLocaleString();
    }

    function renderRecentBookings() {
        const recent = [...state.bookings].reverse().slice(0, 5);
        renderBookingsTable('recentBookingsTable', recent, true);
    }

    function renderAllBookings() {
        const data = filterBookingsByTab();
        renderBookingsTable('allBookingsTable', data);
    }

    function renderMessages() {
        renderMessagesTable([...state.messages].reverse());
    }

    function renderBookingsTable(tableId, data, isCompact = false) {
        const tbody = document.getElementById(tableId);
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center">No records found</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(b => {
            // Status Badge Color
            let statusClass = 'status-pending';
            if (b.status === 'Confirmed') statusClass = 'status-paid'; // reusing paid style
            if (b.status === 'Completed') statusClass = 'status-completed';

            // Payment Column
            const paymentDisplay = isCompact ? (b.payment_method || 'N/A') : `
                <div style="font-weight:600">${b.payment_method || 'N/A'}</div>
                <div style="font-size:0.75rem;color:#555;font-family:monospace;margin-top:2px;" title="Reference Number">
                   Ref: ${b.reference_number || 'N/A'}
                </div>
            `;

            // Customer Column (Enhanced)
            const customerDisplay = `
                <div style="font-weight:600; cursor:pointer;" onclick="filterByUser('${b.email}')" title="Filter by this user">${b.firstName} ${b.lastName}</div>
                <div style="font-size:0.8rem;color:#888">${b.email}</div>
            `;

            // Status Column with Action (for full table)
            const statusDisplay = isCompact ?
                `<span class="status-badge ${statusClass}">${b.status || 'Pending'}</span>` :
                `<select onchange="updateStatus('${b.booking_id}', this.value)" style="padding:4px;border-radius:12px;border:1px solid #ddd;font-size:0.8rem;background:${getStatusColor(b.status)}">
                    <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="Completed" ${b.status === 'Completed' ? 'selected' : ''}>Completed</option>
                    <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                 </select>`;

            return `
            <tr>
                <td>${new Date(b.submitted_at || Date.now()).toLocaleDateString()}</td>
                <td>${customerDisplay}</td>
                <td><span class="service-type-tag">${capitalize(b.serviceType)}</span></td>
                ${isCompact ? '' : `<td>${b.destination || 'N/A'}</td>`}
                <td>${paymentDisplay}</td>
                <td>${statusDisplay}</td>
                ${isCompact ? '' : `
                <td>
                    <button class="btn-action" onclick="viewBookingDetail('${b.booking_id}')" title="View Details"><i class="fas fa-eye"></i></button>
                    <button class="btn-action" onclick="deleteBooking('${b.booking_id}')" title="Delete Record"><i class="fas fa-trash"></i></button>
                </td>
                `}
            </tr>
        `}).join('');
    }

    function getStatusColor(status) {
        if (status === 'Confirmed') return '#d4edda';
        if (status === 'Completed') return '#cce5ff';
        if (status === 'Cancelled') return '#f8d7da';
        return '#fff3cd'; // Pending
    }

    function renderMessagesTable(data) {
        const tbody = document.getElementById('messagesTable');
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">No messages found</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(m => `
            <tr>
                <td>${new Date(m.date).toLocaleDateString()}</td>
                <td>
                    <div style="font-weight:600">${m.name}</div>
                    <div style="font-size:0.8rem;color:#888">${m.email}</div>
                </td>
                <td>${m.subject}</td>
                <td><span class="status-badge status-${m.status.toLowerCase()}">${m.status}</span></td>
                <td>
                    <button class="btn-action" onclick="viewMessage('${m.id}')" title="View & Reply"><i class="fas fa-reply"></i></button>
                    <button class="btn-action" onclick="deleteMessage('${m.id}')" title="Delete"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    function capitalize(s) {
        return s ? s.charAt(0).toUpperCase() + s.slice(1) : 'N/A';
    }

    // Global actions for onclick
    window.updateStatus = (id, newStatus) => {
        const booking = state.bookings.find(b => b.booking_id === id);
        if (booking) {
            booking.status = newStatus;
            localStorage.setItem('all_bookings', JSON.stringify(state.bookings));
            renderAllBookings(); // re-render to update color
            renderRecentBookings();
        }
    };

    window.filterByUser = (email) => {
        const searchInput = document.getElementById('bookingSearch');
        if (searchInput) {
            searchInput.value = email;
            searchInput.dispatchEvent(new Event('input'));
            switchTab('bookings'); // Switch to main tab to see results
        }
    };

    window.viewBookingDetail = (id) => {
        const booking = state.bookings.find(b => b.booking_id === id);
        if (!booking) return;

        const modal = document.getElementById('bookingModal');
        const content = document.getElementById('bookingDetailContent');
        const status = booking.status || 'Pending';

        content.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem">
                <h2 style="margin:0;color:var(--primary-color)">Booking Details</h2>
                <span class="status-badge" style="background:${getStatusColor(status)};font-size:1rem">${status}</span>
            </div>
            
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                <div>
                    <h4 style="border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:10px">Customer Profile</h4>
                    <p><strong>Name:</strong> ${booking.firstName} ${booking.lastName}</p>
                    <p><strong>Email:</strong> ${booking.email}</p>
                    <p><strong>Phone:</strong> ${booking.phone}</p>
                </div>
                <div>
                    <h4 style="border-bottom:1px solid #eee;padding-bottom:5px;margin-bottom:10px">Trip Details</h4>
                    <p><strong>Service:</strong> ${capitalize(booking.serviceType)}</p>
                    <p><strong>Destination:</strong> ${booking.destination}</p>
                    <p><strong>Travelers:</strong> ${booking.numAdults} Adults, ${booking.numChildren} Children</p>
                </div>
            </div>
            <div style="margin-top:20px;padding:15px;background:#f9f9f9;border-radius:8px">
                <h4 style="margin-bottom:10px">Payment Verification</h4>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
                    <p><strong>Method:</strong> ${booking.payment_method}</p>
                    <p><strong>Reference No:</strong> <span style="font-family:monospace;background:#fff;padding:2px 5px;border:1px solid #ccc;border-radius:4px">${booking.reference_number}</span></p>
                    <p><strong>Account Name:</strong> ${booking.account_name}</p>
                    <p><strong>Date Submitted:</strong> ${new Date(booking.submitted_at).toLocaleString()}</p>
                </div>
            </div>
            <div style="margin-top:20px">
                 <h4 style="margin-bottom:10px">Additional Notes</h4>
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

    window.viewMessage = (id) => {
        const message = state.messages.find(m => m.id === id);
        if (!message) return;

        const modal = document.getElementById('messageModal');
        const content = document.getElementById('messageDetailContent');

        // Mark as read
        if (message.status === 'Unread') {
            message.status = 'Read';
            localStorage.setItem('contact_messages', JSON.stringify(state.messages));
            renderMessages();
        }

        content.innerHTML = `
            <h2 style="margin-bottom:1.5rem;color:var(--primary-color)">Message Details</h2>
            <div style="background:#f9f9f9;padding:15px;border-radius:8px;margin-bottom:20px;">
                <p><strong>From:</strong> ${message.name} (${message.email})</p>
                <p><strong>Phone:</strong> ${message.phone || 'N/A'}</p>
                <p><strong>Date:</strong> ${new Date(message.date).toLocaleString()}</p>
                <p><strong>Subject:</strong> ${message.subject}</p>
            </div>
            <div style="padding:15px;border:1px solid #eee;border-radius:8px;min-height:100px;">
                <p style="white-space:pre-line;">${message.message}</p>
            </div>
        `;

        // Clear previous reply text
        document.getElementById('replyText').value = '';
        modal.style.display = 'block';
    };

    window.deleteMessage = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            state.messages = state.messages.filter(m => m.id !== id);
            localStorage.setItem('contact_messages', JSON.stringify(state.messages));
            renderMessages();
        }
    };

    // Close Modal Logic
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            const modalId = btn.getAttribute('data-modal') || 'bookingModal'; // Fallback
            document.getElementById(modalId).style.display = 'none';
        };
    });

    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    init();
});
