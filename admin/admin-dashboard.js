// Admin Portal Functionality
document.addEventListener('DOMContentLoaded', function () {
    // State management
    const state = {
        bookings: JSON.parse(localStorage.getItem('all_bookings') || '[]'),
        messages: JSON.parse(localStorage.getItem('contact_messages') || '[]'),
        activeTab: 'overview',
        activeFilter: 'all',
        lastMessageCount: 0,
        currentMessageId: null
    };

    // Initialize last message count to avoid instant notification on load
    state.lastMessageCount = state.messages.length;

    // DOM Elements
    const tabButtons = document.querySelectorAll('.nav-item[data-tab]');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabTitle = document.getElementById('tabTitle');
    const tabSubtitle = document.getElementById('tabSubtitle');
    const refreshBtn = document.getElementById('refreshData');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Stats Elements
    const totalBookingsEl = document.getElementById('totalBookingsCount');
    const visaRequestsEl = document.getElementById('visaRequestsCount');
    const totalRevenueEl = document.getElementById('totalRevenue');

    // Initialize
    function init() {
        renderStats();
        renderRecentBookings();
        renderFilteredBookings(); // Uses activeFilter
        renderMessages();
        setupEventListeners();

        // Polling for auto-refresh (Real-time effect)
        setInterval(refreshData, 5000);
    }

    function refreshData() {
        // Read from storage without clearing state if not needed, but here we want fresh data
        const newBookings = JSON.parse(localStorage.getItem('all_bookings') || '[]');
        const newMessages = JSON.parse(localStorage.getItem('contact_messages') || '[]');

        // Check for new messages
        if (newMessages.length > state.lastMessageCount) {
            const diff = newMessages.length - state.lastMessageCount;
            showNotification('New Message Received', `You have ${diff} new inquiry.`);
            state.lastMessageCount = newMessages.length;
        }

        // Update State
        state.bookings = newBookings;
        state.messages = newMessages;

        renderStats();
        renderRecentBookings();
        renderFilteredBookings(); // Uses activeFilter
        renderMessages();
    }

    function showNotification(title, message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = 'toast new-message';
        toast.innerHTML = `
            <div style="font-size: 1.5rem; color: #007bff;"><i class="fas fa-bell"></i></div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;

        container.appendChild(toast);

        // Remove after 5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 5000);
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

        // Filter buttons
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active class
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Update state and render
                state.activeFilter = btn.getAttribute('data-filter');
                renderFilteredBookings();
            });
        });

        // Manual Refresh
        refreshBtn.addEventListener('click', () => {
            refreshData();
            const icon = refreshBtn.querySelector('i');
            icon.classList.add('fa-spin');
            setTimeout(() => icon.classList.remove('fa-spin'), 1000);
        });

        // Search functionality for bookings
        const bookingSearch = document.getElementById('bookingSearch');
        if (bookingSearch) {
            bookingSearch.addEventListener('input', (e) => {
                renderFilteredBookings(); // This will use the search term inside
            });
        }

        // Search functionality for messages
        const messageSearch = document.getElementById('messageSearch');
        if (messageSearch) {
            messageSearch.addEventListener('input', (e) => {
                renderMessages(); // This will use the search term inside
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

                if (state.currentMessageId) {
                    // Update Message in Local Storage
                    const msgIndex = state.messages.findIndex(m => m.id === state.currentMessageId);
                    if (msgIndex !== -1) {
                        state.messages[msgIndex].reply = replyText;
                        state.messages[msgIndex].status = 'Replied';
                        state.messages[msgIndex].repliedAt = new Date().toISOString();

                        localStorage.setItem('contact_messages', JSON.stringify(state.messages));

                        showNotification('Reply Sent', 'Message status updated to Replied.');
                        refreshData();
                    }
                }

                document.getElementById('replyText').value = '';
                document.getElementById('messageModal').style.display = 'none';
                state.currentMessageId = null;
            });
        }
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
            messages: ['Message Center', 'View and reply to customer inquiries']
        };

        if (titles[tabId]) {
            [tabTitle.innerText, tabSubtitle.innerText] = titles[tabId];
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

    function renderFilteredBookings() {
        const filter = state.activeFilter;
        const searchTerm = document.getElementById('bookingSearch') ? document.getElementById('bookingSearch').value.toLowerCase() : '';

        let filtered = state.bookings;

        // 1. Filter by Type
        if (filter !== 'all') {
            filtered = filtered.filter(b => b.serviceType === filter);
        }

        // 2. Filter by Search
        if (searchTerm) {
            filtered = filtered.filter(b =>
                `${b.firstName} ${b.lastName}`.toLowerCase().includes(searchTerm) ||
                (b.reference_number && b.reference_number.toLowerCase().includes(searchTerm)) ||
                b.destination.toLowerCase().includes(searchTerm)
            );
        }

        renderBookingsTable('allBookingsTable', [...filtered].reverse());
    }

    function renderMessages() {
        const searchTerm = document.getElementById('messageSearch') ? document.getElementById('messageSearch').value.toLowerCase() : '';
        let filtered = state.messages;

        if (searchTerm) {
            filtered = filtered.filter(m =>
                m.name.toLowerCase().includes(searchTerm) ||
                m.email.toLowerCase().includes(searchTerm) ||
                m.subject.toLowerCase().includes(searchTerm)
            );
        }

        renderMessagesTable([...filtered].reverse());
    }

    function renderBookingsTable(tableId, data, isCompact = false) {
        const tbody = document.getElementById(tableId);
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center">No records found</td></tr>';
            return;
        }

        tbody.innerHTML = data.map(b => `
            <tr>
                <td>${new Date(b.submitted_at || Date.now()).toLocaleDateString()}</td>
                ${isCompact ? '' : `<td><span style="font-family:monospace;background:#eee;padding:2px 5px;border-radius:4px">${b.reference_number || 'N/A'}</span></td>`}
                <td>
                    <div style="font-weight:600">${b.firstName} ${b.lastName}</div>
                    <div style="font-size:0.8rem;color:#888">${b.email}</div>
                </td>
                <td><span class="service-type-tag">${capitalize(b.serviceType)}</span></td>
                ${isCompact ? '' : `<td>${b.destination || 'N/A'}</td>`}
                ${isCompact ? '' : `<td>${b.payment_method || 'N/A'}</td>`}
                <td><span class="status-badge status-pending">Verified</span></td>
                ${isCompact ? '' : `
                <td>
                    <button class="btn-action" onclick="viewBookingDetail('${b.booking_id}')"><i class="fas fa-eye"></i></button>
                    <button class="btn-action" onclick="deleteBooking('${b.booking_id}')"><i class="fas fa-trash"></i></button>
                </td>
                `}
            </tr>
        `).join('');
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
            refreshData(); // Triggers re-render
        }
    };

    window.viewMessage = (id) => {
        const message = state.messages.find(m => m.id === id);
        if (!message) return;

        state.currentMessageId = id; // Track ID for replying

        const modal = document.getElementById('messageModal');
        const content = document.getElementById('messageDetailContent');

        // Mark as read
        if (message.status === 'Unread') {
            const index = state.messages.findIndex(m => m.id === id);
            if (index !== -1) {
                state.messages[index].status = 'Read';
                localStorage.setItem('contact_messages', JSON.stringify(state.messages));
                refreshData();
            }
        }

        // Show previous reply if exists
        const replyHtml = message.reply ?
            `<div style="margin-top:15px;padding:10px;background:#e8f5e9;border-left:4px solid var(--primary-color);border-radius:4px;">
                <strong>Admin Reply:</strong>
                <p style="margin:5px 0;">${message.reply}</p>
                <small style="color:#666">Sent on ${new Date(message.repliedAt || Date.now()).toLocaleString()}</small>
             </div>` : '';

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
            ${replyHtml}
        `;

        // Clear previous reply text (unless you want to allow multiple replies, but usually one is enough for simple sys)
        document.getElementById('replyText').value = '';
        modal.style.display = 'block';
    };

    window.deleteMessage = (id) => {
        if (confirm('Are you sure you want to delete this message?')) {
            state.messages = state.messages.filter(m => m.id !== id);
            localStorage.setItem('contact_messages', JSON.stringify(state.messages));
            refreshData(); // Trigger re-render
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
