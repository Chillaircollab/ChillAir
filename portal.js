// ===== Chill Air Portal JavaScript =====

// Demo Data
const demoData = {
    // Admin credentials
    admin: {
        username: 'Hicks',
        password: 'frank1e',
        name: 'Greg Hicks',
        role: 'Administrator'
    },
    
    // Demo clients
    clients: [
        { id: 1, name: 'John Smith', email: 'john@example.com', phone: '027 123 4567', address: '123 Bealey Ave, Christchurch Central', password: 'demo123', jobs: 5 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '027 234 5678', address: '45 Riccarton Rd, Riccarton', password: 'demo123', jobs: 3 },
        { id: 3, name: 'Mike Thompson', email: 'mike@example.com', phone: '027 345 6789', address: '78 Memorial Ave, Burnside', password: 'demo123', jobs: 2 },
        { id: 4, name: 'Lisa Wilson', email: 'lisa@example.com', phone: '027 456 7890', address: '22 Papanui Rd, Merivale', password: 'demo123', jobs: 4 },
        { id: 5, name: 'David Brown', email: 'david@example.com', phone: '027 567 8901', address: '156 Rolleston Dr, Rolleston', password: 'demo123', jobs: 1 },
        { id: 6, name: 'Emma Davis', email: 'emma@example.com', phone: '027 678 9012', address: '89 Lincoln Rd, Lincoln', password: 'demo123', jobs: 2 },
        { id: 7, name: 'James Martin', email: 'james@example.com', phone: '027 789 0123', address: '34 High St, Rangiora', password: 'demo123', jobs: 3 },
        { id: 8, name: 'Olivia Taylor', email: 'olivia@example.com', phone: '027 890 1234', address: '67 Tancred St, Ashburton', password: 'demo123', jobs: 1 }
    ],
    
    // Demo jobs
    jobs: [
        { id: 'JOB-001', clientId: 1, client: 'John Smith', service: 'Heat Pump Installation', description: 'Install new Daikin 7.1kW heat pump in living room', status: 'progress', progress: 75, date: '2026-01-02', checklist: [true, true, true, false, false] },
        { id: 'JOB-002', clientId: 2, client: 'Sarah Johnson', service: 'Annual Service', description: 'Annual maintenance service for Mitsubishi heat pump', status: 'pending', progress: 20, date: '2026-01-05', checklist: [true, false, false, false, false] },
        { id: 'JOB-003', clientId: 3, client: 'Mike Thompson', service: 'Repair', description: 'Heat pump not cooling properly, making unusual noise', status: 'completed', progress: 100, date: '2025-12-28', checklist: [true, true, true, true, true] },
        { id: 'JOB-004', clientId: 4, client: 'Lisa Wilson', service: 'Ventilation System', description: 'Install ducted ventilation system for whole house', status: 'pending', progress: 10, date: '2026-01-08', checklist: [true, false, false, false, false] },
        { id: 'JOB-005', clientId: 5, client: 'David Brown', service: 'Heat Pump Installation', description: 'New Fujitsu 5kW heat pump for bedroom', status: 'progress', progress: 50, date: '2026-01-03', checklist: [true, true, false, false, false] },
        { id: 'JOB-006', clientId: 1, client: 'John Smith', service: 'Repair', description: 'Remote control not working, check electrical connection', status: 'completed', progress: 100, date: '2025-12-20', checklist: [true, true, true, true, true] },
        { id: 'JOB-007', clientId: 6, client: 'Emma Davis', service: 'Heat Pump Installation', description: 'Install two split systems - bedroom and office', status: 'progress', progress: 35, date: '2026-01-04', checklist: [true, true, false, false, false] },
        { id: 'JOB-008', clientId: 7, client: 'James Martin', service: 'Pool Heat Pump', description: 'Install pool heating system', status: 'pending', progress: 5, date: '2026-01-15', checklist: [false, false, false, false, false] },
        { id: 'JOB-009', clientId: 2, client: 'Sarah Johnson', service: 'Hot Water Heat Pump', description: 'Replace electric hot water with heat pump system', status: 'completed', progress: 100, date: '2025-12-15', checklist: [true, true, true, true, true] },
        { id: 'JOB-010', clientId: 8, client: 'Olivia Taylor', service: 'Maintenance', description: 'Filter clean and system check', status: 'pending', progress: 0, date: '2026-01-10', checklist: [false, false, false, false, false] }
    ],
    
    // Demo quotes
    quotes: [
        { id: 'QTE-001', clientId: 1, client: 'John Smith', description: 'Daikin 7.1kW Heat Pump Installation - includes unit, installation, and 5-year warranty', amount: 4500, status: 'pending', expiry: '2026-01-15' },
        { id: 'QTE-002', clientId: 2, client: 'Sarah Johnson', description: 'Annual Service Package - 2 services per year, priority booking', amount: 350, status: 'pending', expiry: '2026-01-20' },
        { id: 'QTE-003', clientId: 4, client: 'Lisa Wilson', description: 'Whole house ventilation system with 4 rooms, includes HRV unit', amount: 6800, status: 'accepted', expiry: '2026-01-10' },
        { id: 'QTE-004', clientId: 5, client: 'David Brown', description: 'Fujitsu 5kW bedroom heat pump with WiFi control', amount: 3200, status: 'accepted', expiry: '2026-01-05' },
        { id: 'QTE-005', clientId: 7, client: 'James Martin', description: 'Pool heat pump system - 15kW capacity, includes installation', amount: 8500, status: 'pending', expiry: '2026-01-25' },
        { id: 'QTE-006', clientId: 3, client: 'Mike Thompson', description: 'Repair diagnostic and fix - compressor issue', amount: 450, status: 'accepted', expiry: '2025-12-30' }
    ],
    
    // Demo invoices
    invoices: [
        { id: 'INV-001', clientId: 3, client: 'Mike Thompson', description: 'Repair service - compressor replacement', amount: 450, status: 'paid', due: '2026-01-05' },
        { id: 'INV-002', clientId: 2, client: 'Sarah Johnson', description: 'Hot water heat pump installation', amount: 5200, status: 'paid', due: '2025-12-30' },
        { id: 'INV-003', clientId: 1, client: 'John Smith', description: 'Remote control repair', amount: 120, status: 'paid', due: '2025-12-25' },
        { id: 'INV-004', clientId: 4, client: 'Lisa Wilson', description: 'Deposit - Ventilation system', amount: 2040, status: 'pending', due: '2026-01-08' },
        { id: 'INV-005', clientId: 5, client: 'David Brown', description: 'Deposit - Fujitsu heat pump', amount: 960, status: 'pending', due: '2026-01-10' }
    ],
    
    // Demo bookings
    bookings: [
        { id: 1, clientId: 1, client: 'John Smith', date: '2026-01-06', time: '9:00 AM', service: 'Heat Pump Installation (Completion)', status: 'confirmed' },
        { id: 2, clientId: 2, client: 'Sarah Johnson', date: '2026-01-05', time: '2:00 PM', service: 'Annual Service', status: 'confirmed' },
        { id: 3, clientId: 6, client: 'Emma Davis', date: '2026-01-07', time: '10:00 AM', service: 'Installation - Day 2', status: 'confirmed' },
        { id: 4, clientId: 8, client: 'Olivia Taylor', date: '2026-01-10', time: '11:00 AM', service: 'Maintenance Check', status: 'pending' },
        { id: 5, clientId: 7, client: 'James Martin', date: '2026-01-15', time: '8:30 AM', service: 'Pool Heat Pump Install', status: 'confirmed' }
    ],
    
    // Demo products
    products: [
        { id: 1, name: 'Daikin 6kW Split System', description: 'Efficient inverter heat pump, perfect for medium rooms', price: 3200, image: '❄️' },
        { id: 2, name: 'Mitsubishi 7.1kW Heat Pump', description: 'High-capacity unit for large living areas', price: 3800, image: '🌡️' },
        { id: 3, name: 'Fujitsu 5kW Compact', description: 'Compact design ideal for bedrooms', price: 2900, image: '💨' },
        { id: 4, name: 'Panasonic 8kW Premium', description: 'Premium unit with advanced air purification', price: 4200, image: '✨' },
        { id: 5, name: 'Hitachi 6.5kW Inverter', description: 'Quiet operation with smart WiFi control', price: 3400, image: '📱' },
        { id: 6, name: 'Filter Replacement Kit', description: 'Genuine replacement filters for most brands', price: 45, image: '🔧' },
        { id: 7, name: 'WiFi Controller Module', description: 'Add smart control to any compatible unit', price: 185, image: '📶' },
        { id: 8, name: 'Remote Control', description: 'Universal replacement remote', price: 85, image: '🎮' },
        { id: 9, name: 'Service Package - 2 Year', description: 'Bi-annual service with priority booking', price: 599, image: '📋' },
        { id: 10, name: 'Extended Warranty - 5 Year', description: 'Additional warranty coverage', price: 350, image: '🛡️' }
    ],
    
    // Calendar events
    calendarEvents: [
        { date: '2026-01-03', title: 'David Brown - Installation', time: '9:00 AM' },
        { date: '2026-01-05', title: 'Sarah Johnson - Service', time: '2:00 PM' },
        { date: '2026-01-06', title: 'John Smith - Completion', time: '9:00 AM' },
        { date: '2026-01-07', title: 'Emma Davis - Install Day 2', time: '10:00 AM' },
        { date: '2026-01-08', title: 'Lisa Wilson - Start', time: '8:30 AM' },
        { date: '2026-01-10', title: 'Olivia Taylor - Maintenance', time: '11:00 AM' },
        { date: '2026-01-15', title: 'James Martin - Pool HP', time: '8:30 AM' }
    ]
};

// State management
let currentUser = null;
let isAdmin = false;
let currentPage = 'dashboard';
let currentCalendarDate = new Date();
let calendarView = 'month';

// Checklist items
const checklistItems = [
    'Quote Sent',
    'Appointment Scheduled',
    'Parts Ordered',
    'Work Completed',
    'Invoice Sent'
];

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initLogin();
    initNavigation();
    initMobileMenu();
    initModals();
});

// ===== Login System =====
function initLogin() {
    const loginTabs = document.querySelectorAll('.login-tab');
    const loginForm = document.getElementById('login-form');
    const loginType = document.getElementById('login-type');

    // Tab switching
    loginTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            loginTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            loginType.value = tab.dataset.tab;
        });
    });

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const type = loginType.value;

        if (type === 'admin') {
            // Admin login
            if (email === demoData.admin.username && password === demoData.admin.password) {
                loginAsAdmin();
            } else {
                showNotification('Invalid admin credentials', 'error');
            }
        } else {
            // Client login
            const client = demoData.clients.find(c => 
                (c.email === email || c.name.toLowerCase() === email.toLowerCase()) && 
                c.password === password
            );
            
            if (client) {
                loginAsClient(client);
            } else {
                // Demo: allow any login for demo purposes
                if (password === 'demo123' || password === 'demo') {
                    loginAsClient(demoData.clients[0]);
                } else {
                    showNotification('Invalid credentials. Try demo123 as password.', 'error');
                }
            }
        }
    });
}

function loginAsAdmin() {
    currentUser = demoData.admin;
    isAdmin = true;
    
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('portal').classList.add('active');
    
    // Update UI for admin
    document.querySelectorAll('.client-nav').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.admin-nav').forEach(el => el.classList.remove('hidden'));
    
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role').textContent = currentUser.role;
    document.getElementById('user-avatar').textContent = 'GH';
    
    document.getElementById('new-job-btn').style.display = 'none';
    
    // Update mobile nav for admin
    updateMobileNavForAdmin();
    
    navigateTo('dashboard');
    loadAdminDashboard();
    
    showNotification(`Welcome back, ${currentUser.name}!`, 'success');
}

function loginAsClient(client) {
    currentUser = client;
    isAdmin = false;
    
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('portal').classList.add('active');
    
    // Update UI for client
    document.querySelectorAll('.client-nav').forEach(el => el.classList.remove('hidden'));
    document.querySelectorAll('.admin-nav').forEach(el => el.classList.add('hidden'));
    
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role').textContent = 'Client';
    document.getElementById('user-avatar').textContent = getInitials(currentUser.name);
    
    document.getElementById('new-job-btn').style.display = 'inline-flex';
    
    // Reset mobile nav for client
    updateMobileNavForClient();
    
    navigateTo('dashboard');
    loadClientDashboard();
    
    showNotification(`Welcome back, ${currentUser.name}!`, 'success');
}

function logout() {
    currentUser = null;
    isAdmin = false;
    
    document.getElementById('portal').classList.remove('active');
    document.getElementById('login-screen').style.display = 'flex';
    
    // Reset form
    document.getElementById('login-form').reset();
    document.querySelectorAll('.login-tab').forEach((t, i) => {
        t.classList.toggle('active', i === 0);
    });
    document.getElementById('login-type').value = 'client';
}

// ===== Navigation =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
            closeSidebar();
        });
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateTo(page);
        });
    });
    
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('new-job-btn').addEventListener('click', () => openModal('new-job-modal'));
}

function navigateTo(page) {
    currentPage = page;
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });
    
    // Update page sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const pageSection = document.getElementById(`page-${page}`);
    if (pageSection) {
        pageSection.classList.add('active');
    }
    
    // Update header
    updateHeader(page);
    
    // Load page data
    loadPageData(page);
}

function updateHeader(page) {
    const titles = {
        'dashboard': { title: 'Dashboard', subtitle: 'Welcome back!' },
        'jobs': { title: 'My Jobs', subtitle: 'Track your service requests' },
        'quotes': { title: 'Quotes', subtitle: 'Review and accept quotes' },
        'products': { title: 'Products', subtitle: 'Browse available products' },
        'bookings': { title: 'Bookings', subtitle: 'Your upcoming appointments' },
        'profile': { title: 'My Profile', subtitle: 'Manage your account' },
        'admin-jobs': { title: 'Job Requests', subtitle: 'Manage all customer jobs' },
        'admin-quotes': { title: 'Quote Management', subtitle: 'Send and track quotes' },
        'admin-invoices': { title: 'Invoices', subtitle: 'Manage billing' },
        'admin-clients': { title: 'Clients', subtitle: 'Customer management' },
        'admin-calendar': { title: 'Work Calendar', subtitle: 'View scheduled work' }
    };
    
    const pageInfo = titles[page] || { title: 'Dashboard', subtitle: '' };
    document.getElementById('page-title').textContent = pageInfo.title;
    document.getElementById('page-subtitle').textContent = pageInfo.subtitle;
}

function loadPageData(page) {
    switch(page) {
        case 'dashboard':
            isAdmin ? loadAdminDashboard() : loadClientDashboard();
            break;
        case 'jobs':
            loadClientJobs();
            break;
        case 'quotes':
            loadClientQuotes();
            break;
        case 'products':
            loadProducts();
            break;
        case 'bookings':
            loadClientBookings();
            break;
        case 'profile':
            loadProfile();
            break;
        case 'admin-jobs':
            loadAdminJobs();
            break;
        case 'admin-quotes':
            loadAdminQuotes();
            break;
        case 'admin-invoices':
            loadAdminInvoices();
            break;
        case 'admin-clients':
            loadAdminClients();
            break;
        case 'admin-calendar':
            loadCalendar();
            break;
    }
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    overlay.addEventListener('click', closeSidebar);
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebar-overlay').classList.remove('active');
}

function updateMobileNavForAdmin() {
    const mobileNav = document.querySelector('.mobile-nav__list');
    mobileNav.innerHTML = `
        <li><a href="#" class="mobile-nav__link active" data-page="dashboard"><span class="mobile-nav__icon">🏠</span><span>Home</span></a></li>
        <li><a href="#" class="mobile-nav__link" data-page="admin-jobs"><span class="mobile-nav__icon">📋</span><span>Jobs</span></a></li>
        <li><a href="#" class="mobile-nav__link" data-page="admin-quotes"><span class="mobile-nav__icon">💰</span><span>Quotes</span></a></li>
        <li><a href="#" class="mobile-nav__link" data-page="admin-calendar"><span class="mobile-nav__icon">📆</span><span>Calendar</span></a></li>
        <li><a href="#" class="mobile-nav__link" data-page="admin-clients"><span class="mobile-nav__icon">👥</span><span>Clients</span></a></li>
    `;
    
    // Re-attach event listeners
    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });
}

function updateMobileNavForClient() {
    const mobileNav = document.querySelector('.mobile-nav__list');
    mobileNav.innerHTML = `
        <li><a href="#" class="mobile-nav__link active" data-page="dashboard"><span class="mobile-nav__icon">🏠</span><span>Home</span></a></li>
        <li><a href="#" class="mobile-nav__link" data-page="jobs"><span class="mobile-nav__icon">📋</span><span>Jobs</span></a></li>
        <li><a href="#" class="mobile-nav__link" data-page="quotes"><span class="mobile-nav__icon">📝</span><span>Quotes</span></a></li>
        <li><a href="#" class="mobile-nav__link" data-page="bookings"><span class="mobile-nav__icon">📅</span><span>Bookings</span></a></li>
        <li><a href="#" class="mobile-nav__link" data-page="profile"><span class="mobile-nav__icon">👤</span><span>Profile</span></a></li>
    `;
    
    // Re-attach event listeners
    document.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(link.dataset.page);
        });
    });
}

// ===== Client Dashboard =====
function loadClientDashboard() {
    const clientJobs = demoData.jobs.filter(j => j.clientId === currentUser.id);
    const clientQuotes = demoData.quotes.filter(q => q.clientId === currentUser.id);
    const clientBookings = demoData.bookings.filter(b => b.clientId === currentUser.id);
    
    // Update stats
    document.getElementById('stat-active-jobs').textContent = clientJobs.filter(j => j.status !== 'completed').length;
    document.getElementById('stat-completed').textContent = clientJobs.filter(j => j.status === 'completed').length;
    document.getElementById('stat-pending-quotes').textContent = clientQuotes.filter(q => q.status === 'pending').length;
    document.getElementById('stat-upcoming').textContent = clientBookings.filter(b => b.status === 'confirmed').length;
    
    // Load recent activity
    const recentActivity = document.getElementById('recent-activity');
    recentActivity.innerHTML = clientJobs.slice(0, 5).map(job => `
        <tr>
            <td><strong>${job.id}</strong><br><small>${job.service}</small></td>
            <td><span class="badge badge-${job.status === 'completed' ? 'completed' : job.status === 'progress' ? 'progress' : 'pending'}">${formatStatus(job.status)}</span></td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="progress-bar" style="width: 100px;">
                        <div class="progress-bar__fill" style="width: ${job.progress}%"></div>
                    </div>
                    <span style="font-size: 12px;">${job.progress}%</span>
                </div>
            </td>
            <td>${formatDate(job.date)}</td>
        </tr>
    `).join('');
}

// ===== Admin Dashboard =====
function loadAdminDashboard() {
    // Update stats for admin (all data)
    document.getElementById('stat-active-jobs').textContent = demoData.jobs.filter(j => j.status !== 'completed').length;
    document.getElementById('stat-completed').textContent = demoData.jobs.filter(j => j.status === 'completed').length;
    document.getElementById('stat-pending-quotes').textContent = demoData.quotes.filter(q => q.status === 'pending').length;
    document.getElementById('stat-upcoming').textContent = demoData.bookings.filter(b => b.status === 'confirmed').length;
    
    // Load recent activity (all jobs)
    const recentActivity = document.getElementById('recent-activity');
    recentActivity.innerHTML = demoData.jobs.slice(0, 5).map(job => `
        <tr>
            <td><strong>${job.id}</strong><br><small>${job.client} - ${job.service}</small></td>
            <td><span class="badge badge-${job.status === 'completed' ? 'completed' : job.status === 'progress' ? 'progress' : 'pending'}">${formatStatus(job.status)}</span></td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="progress-bar" style="width: 100px;">
                        <div class="progress-bar__fill" style="width: ${job.progress}%"></div>
                    </div>
                    <span style="font-size: 12px;">${job.progress}%</span>
                </div>
            </td>
            <td>${formatDate(job.date)}</td>
        </tr>
    `).join('');
}

// ===== Client Jobs =====
function loadClientJobs() {
    const clientJobs = demoData.jobs.filter(j => j.clientId === currentUser.id);
    const jobsTable = document.getElementById('jobs-table');
    
    jobsTable.innerHTML = clientJobs.map(job => `
        <tr>
            <td><strong>${job.id}</strong></td>
            <td>${job.service}<br><small style="color: #64748B;">${job.description.substring(0, 50)}...</small></td>
            <td><span class="badge badge-${job.status === 'completed' ? 'completed' : job.status === 'progress' ? 'progress' : 'pending'}">${formatStatus(job.status)}</span></td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="progress-bar" style="width: 80px;">
                        <div class="progress-bar__fill" style="width: ${job.progress}%"></div>
                    </div>
                    <span style="font-size: 12px;">${job.progress}%</span>
                </div>
            </td>
            <td><button class="btn btn-secondary btn-sm" onclick="viewJobDetails('${job.id}')">View</button></td>
        </tr>
    `).join('');
}

// ===== Client Quotes =====
function loadClientQuotes() {
    const clientQuotes = demoData.quotes.filter(q => q.clientId === currentUser.id);
    const quotesList = document.getElementById('quotes-list');
    
    if (clientQuotes.length === 0) {
        quotesList.innerHTML = '<p style="text-align: center; color: #64748B; padding: 40px;">No quotes available</p>';
        return;
    }
    
    quotesList.innerHTML = clientQuotes.map(quote => `
        <div class="quote-card">
            <div class="quote-card__header">
                <div>
                    <div class="quote-card__title">${quote.id}</div>
                    <span class="badge badge-${quote.status === 'accepted' ? 'completed' : 'pending'}">${quote.status === 'accepted' ? 'Accepted' : 'Pending'}</span>
                </div>
                <div class="quote-card__amount">$${quote.amount.toLocaleString()}</div>
            </div>
            <div class="quote-card__details">
                <p>${quote.description}</p>
                <p style="margin-top: 8px;"><strong>Valid until:</strong> ${formatDate(quote.expiry)}</p>
            </div>
            ${quote.status === 'pending' ? `
                <div class="quote-card__actions">
                    <button class="btn btn-success btn-sm" onclick="acceptQuote('${quote.id}')">Accept Quote</button>
                    <button class="btn btn-secondary btn-sm" onclick="declineQuote('${quote.id}')">Decline</button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// ===== Products =====
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    
    productsGrid.innerHTML = demoData.products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                    <button class="btn btn-primary btn-sm" onclick="addToEnquiry(${product.id})">Enquire</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Client Bookings =====
function loadClientBookings() {
    const clientBookings = demoData.bookings.filter(b => b.clientId === currentUser.id);
    const bookingsTable = document.getElementById('bookings-table');
    
    if (clientBookings.length === 0) {
        bookingsTable.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #64748B;">No upcoming bookings</td></tr>';
        return;
    }
    
    bookingsTable.innerHTML = clientBookings.map(booking => `
        <tr>
            <td>${formatDate(booking.date)}</td>
            <td>${booking.time}</td>
            <td>${booking.service}</td>
            <td><span class="badge badge-${booking.status === 'confirmed' ? 'completed' : 'pending'}">${booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}</span></td>
        </tr>
    `).join('');
}

// ===== Profile =====
function loadProfile() {
    if (!currentUser || isAdmin) return;
    
    document.getElementById('profile-name').value = currentUser.name;
    document.getElementById('profile-email').value = currentUser.email;
    document.getElementById('profile-phone').value = currentUser.phone;
    document.getElementById('profile-address').value = currentUser.address;
    
    // Handle form submission
    const profileForm = document.getElementById('profile-form');
    profileForm.onsubmit = (e) => {
        e.preventDefault();
        currentUser.name = document.getElementById('profile-name').value;
        currentUser.email = document.getElementById('profile-email').value;
        currentUser.phone = document.getElementById('profile-phone').value;
        currentUser.address = document.getElementById('profile-address').value;
        
        document.getElementById('user-name').textContent = currentUser.name;
        document.getElementById('user-avatar').textContent = getInitials(currentUser.name);
        
        showNotification('Profile updated successfully!', 'success');
    };
}

// ===== Admin Jobs =====
function loadAdminJobs() {
    const adminJobsTable = document.getElementById('admin-jobs-table');
    
    adminJobsTable.innerHTML = demoData.jobs.map(job => `
        <tr>
            <td><strong>${job.id}</strong></td>
            <td>${job.client}</td>
            <td>${job.service}<br><small style="color: #64748B;">${job.description.substring(0, 40)}...</small></td>
            <td>
                <select class="form-input" style="padding: 6px; font-size: 13px;" onchange="updateJobStatus('${job.id}', this.value)">
                    <option value="pending" ${job.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="progress" ${job.status === 'progress' ? 'selected' : ''}>In Progress</option>
                    <option value="completed" ${job.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${job.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="viewJobDetails('${job.id}')">View</button>
            </td>
        </tr>
    `).join('');
}

// ===== Admin Quotes =====
function loadAdminQuotes() {
    const adminQuotesTable = document.getElementById('admin-quotes-table');
    
    // Populate client dropdown
    const quoteClient = document.getElementById('quote-client');
    quoteClient.innerHTML = '<option value="">Select client</option>' + 
        demoData.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    
    adminQuotesTable.innerHTML = demoData.quotes.map(quote => `
        <tr>
            <td><strong>${quote.id}</strong></td>
            <td>${quote.client}</td>
            <td>$${quote.amount.toLocaleString()}</td>
            <td><span class="badge badge-${quote.status === 'accepted' ? 'completed' : 'pending'}">${quote.status === 'accepted' ? 'Accepted' : 'Pending'}</span></td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="resendQuote('${quote.id}')">Resend</button>
            </td>
        </tr>
    `).join('');
}

// ===== Admin Invoices =====
function loadAdminInvoices() {
    const adminInvoicesTable = document.getElementById('admin-invoices-table');
    
    // Populate client dropdown
    const invoiceClient = document.getElementById('invoice-client');
    invoiceClient.innerHTML = '<option value="">Select client</option>' + 
        demoData.clients.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    
    adminInvoicesTable.innerHTML = demoData.invoices.map(invoice => `
        <tr>
            <td><strong>${invoice.id}</strong></td>
            <td>${invoice.client}</td>
            <td>$${invoice.amount.toLocaleString()}</td>
            <td><span class="badge badge-${invoice.status === 'paid' ? 'completed' : 'pending'}">${invoice.status === 'paid' ? 'Paid' : 'Pending'}</span></td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="resendInvoice('${invoice.id}')">Resend</button>
                ${invoice.status === 'pending' ? `<button class="btn btn-success btn-sm" onclick="markPaid('${invoice.id}')">Mark Paid</button>` : ''}
            </td>
        </tr>
    `).join('');
}

// ===== Admin Clients =====
function loadAdminClients() {
    const adminClientsTable = document.getElementById('admin-clients-table');
    
    adminClientsTable.innerHTML = demoData.clients.map(client => `
        <tr>
            <td><strong>${client.name}</strong></td>
            <td>${client.email}</td>
            <td>${client.phone}</td>
            <td>${client.jobs}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editClient(${client.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteClient(${client.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// ===== Calendar =====
function loadCalendar() {
    const calendarEl = document.getElementById('calendar');
    renderCalendar(calendarEl);
    
    // View toggle buttons
    document.getElementById('view-week').onclick = () => {
        calendarView = 'week';
        document.getElementById('view-week').classList.remove('btn-secondary');
        document.getElementById('view-week').classList.add('btn-primary');
        document.getElementById('view-month').classList.remove('btn-primary');
        document.getElementById('view-month').classList.add('btn-secondary');
        renderCalendar(calendarEl);
    };
    
    document.getElementById('view-month').onclick = () => {
        calendarView = 'month';
        document.getElementById('view-month').classList.remove('btn-secondary');
        document.getElementById('view-month').classList.add('btn-primary');
        document.getElementById('view-week').classList.remove('btn-primary');
        document.getElementById('view-week').classList.add('btn-secondary');
        renderCalendar(calendarEl);
    };
}

function renderCalendar(container) {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    let html = `
        <div class="calendar-header">
            <button class="calendar-nav" onclick="prevMonth()">← Prev</button>
            <h3>${monthNames[month]} ${year}</h3>
            <button class="calendar-nav" onclick="nextMonth()">Next →</button>
        </div>
        <div class="calendar-grid">
    `;
    
    // Day headers
    dayNames.forEach(day => {
        html += `<div class="calendar-day-header">${day}</div>`;
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day" style="background: #f8fafc;"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
        const events = demoData.calendarEvents.filter(e => e.date === dateStr);
        
        html += `<div class="calendar-day ${isToday ? 'today' : ''} ${events.length ? 'has-event' : ''}">
            <div style="font-weight: ${isToday ? '700' : '400'};">${day}</div>
            ${events.map(e => `<div class="calendar-event" title="${e.title}">${e.time}</div>`).join('')}
        </div>`;
    }
    
    html += '</div>';
    container.innerHTML = html;
}

function prevMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar(document.getElementById('calendar'));
}

function nextMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar(document.getElementById('calendar'));
}

// ===== Modals =====
function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// ===== Job Details =====
function viewJobDetails(jobId) {
    const job = demoData.jobs.find(j => j.id === jobId);
    if (!job) return;
    
    const content = document.getElementById('job-details-content');
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <h4 style="color: #0F172A; margin-bottom: 8px;">${job.id} - ${job.service}</h4>
            <p style="color: #64748B;">${job.description}</p>
            <p style="margin-top: 8px;"><strong>Client:</strong> ${job.client}</p>
            <p><strong>Date:</strong> ${formatDate(job.date)}</p>
            <p><strong>Status:</strong> <span class="badge badge-${job.status === 'completed' ? 'completed' : job.status === 'progress' ? 'progress' : 'pending'}">${formatStatus(job.status)}</span></p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h4 style="color: #0F172A; margin-bottom: 12px;">Progress (${job.progress}%)</h4>
            <div class="progress-bar" style="height: 12px; margin-bottom: 16px;">
                <div class="progress-bar__fill" style="width: ${job.progress}%"></div>
            </div>
            
            <div class="progress-checklist">
                ${checklistItems.map((item, i) => `
                    <div class="progress-item ${job.checklist[i] ? 'completed' : ''}">
                        <div class="progress-checkbox ${job.checklist[i] ? 'checked' : ''}" onclick="toggleChecklist('${job.id}', ${i})"></div>
                        <span class="progress-text">${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    openModal('job-details-modal');
}

function toggleChecklist(jobId, index) {
    const job = demoData.jobs.find(j => j.id === jobId);
    if (!job || !isAdmin) return;
    
    job.checklist[index] = !job.checklist[index];
    
    // Recalculate progress
    const completedSteps = job.checklist.filter(Boolean).length;
    job.progress = Math.round((completedSteps / checklistItems.length) * 100);
    
    // Update status based on progress
    if (job.progress === 100) {
        job.status = 'completed';
    } else if (job.progress > 0) {
        job.status = 'progress';
    }
    
    viewJobDetails(jobId);
}

// ===== Actions =====
function submitNewJob() {
    const service = document.getElementById('job-service').value;
    const description = document.getElementById('job-description').value;
    const date = document.getElementById('job-date').value;
    
    if (!service || !description) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const newJob = {
        id: `JOB-${String(demoData.jobs.length + 1).padStart(3, '0')}`,
        clientId: currentUser.id,
        client: currentUser.name,
        service: document.getElementById('job-service').options[document.getElementById('job-service').selectedIndex].text,
        description: description,
        status: 'pending',
        progress: 0,
        date: date || new Date().toISOString().split('T')[0],
        checklist: [false, false, false, false, false]
    };
    
    demoData.jobs.unshift(newJob);
    
    closeModal('new-job-modal');
    document.getElementById('new-job-form').reset();
    
    showNotification('Job request submitted successfully!', 'success');
    loadClientJobs();
}

function acceptQuote(quoteId) {
    const quote = demoData.quotes.find(q => q.id === quoteId);
    if (quote) {
        quote.status = 'accepted';
        showNotification('Quote accepted! We will be in touch shortly.', 'success');
        loadClientQuotes();
    }
}

function declineQuote(quoteId) {
    const quote = demoData.quotes.find(q => q.id === quoteId);
    if (quote) {
        quote.status = 'declined';
        showNotification('Quote declined.', 'success');
        loadClientQuotes();
    }
}

function addToEnquiry(productId) {
    const product = demoData.products.find(p => p.id === productId);
    if (product) {
        showNotification(`Enquiry for ${product.name} submitted! We'll contact you soon.`, 'success');
    }
}

function updateJobStatus(jobId, status) {
    const job = demoData.jobs.find(j => j.id === jobId);
    if (job) {
        job.status = status;
        if (status === 'completed') {
            job.progress = 100;
            job.checklist = [true, true, true, true, true];
        }
        showNotification(`Job ${jobId} updated to ${formatStatus(status)}`, 'success');
    }
}

function sendQuote() {
    const clientId = document.getElementById('quote-client').value;
    const description = document.getElementById('quote-description').value;
    const amount = document.getElementById('quote-amount').value;
    const expiry = document.getElementById('quote-expiry').value;
    
    if (!clientId || !description || !amount || !expiry) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const client = demoData.clients.find(c => c.id == clientId);
    
    const newQuote = {
        id: `QTE-${String(demoData.quotes.length + 1).padStart(3, '0')}`,
        clientId: parseInt(clientId),
        client: client.name,
        description: description,
        amount: parseFloat(amount),
        status: 'pending',
        expiry: expiry
    };
    
    demoData.quotes.unshift(newQuote);
    
    closeModal('send-quote-modal');
    document.getElementById('send-quote-form').reset();
    
    showNotification(`Quote sent to ${client.name}!`, 'success');
    loadAdminQuotes();
}

function sendInvoice() {
    const clientId = document.getElementById('invoice-client').value;
    const description = document.getElementById('invoice-description').value;
    const amount = document.getElementById('invoice-amount').value;
    const due = document.getElementById('invoice-due').value;
    
    if (!clientId || !description || !amount || !due) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const client = demoData.clients.find(c => c.id == clientId);
    
    const newInvoice = {
        id: `INV-${String(demoData.invoices.length + 1).padStart(3, '0')}`,
        clientId: parseInt(clientId),
        client: client.name,
        description: description,
        amount: parseFloat(amount),
        status: 'pending',
        due: due
    };
    
    demoData.invoices.unshift(newInvoice);
    
    closeModal('send-invoice-modal');
    document.getElementById('send-invoice-form').reset();
    
    showNotification(`Invoice sent to ${client.name}!`, 'success');
    loadAdminInvoices();
}

function markPaid(invoiceId) {
    const invoice = demoData.invoices.find(i => i.id === invoiceId);
    if (invoice) {
        invoice.status = 'paid';
        showNotification(`Invoice ${invoiceId} marked as paid`, 'success');
        loadAdminInvoices();
    }
}

function resendQuote(quoteId) {
    showNotification(`Quote ${quoteId} resent!`, 'success');
}

function resendInvoice(invoiceId) {
    showNotification(`Invoice ${invoiceId} resent!`, 'success');
}

function addClient() {
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const phone = document.getElementById('client-phone').value;
    const address = document.getElementById('client-address').value;
    const password = document.getElementById('client-password').value;
    
    if (!name || !email || !phone || !password) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    const newClient = {
        id: demoData.clients.length + 1,
        name: name,
        email: email,
        phone: phone,
        address: address || '',
        password: password,
        jobs: 0
    };
    
    demoData.clients.push(newClient);
    
    closeModal('add-client-modal');
    document.getElementById('add-client-form').reset();
    
    showNotification(`Client ${name} added successfully!`, 'success');
    loadAdminClients();
}

function editClient(clientId) {
    const client = demoData.clients.find(c => c.id === clientId);
    if (!client) return;
    
    // For demo, just show notification
    showNotification(`Edit functionality for ${client.name} - would open edit modal`, 'success');
}

function deleteClient(clientId) {
    const client = demoData.clients.find(c => c.id === clientId);
    if (!client) return;
    
    if (confirm(`Are you sure you want to delete ${client.name}?`)) {
        const index = demoData.clients.findIndex(c => c.id === clientId);
        demoData.clients.splice(index, 1);
        showNotification(`Client ${client.name} deleted`, 'success');
        loadAdminClients();
    }
}

// ===== Utility Functions =====
function formatStatus(status) {
    const statuses = {
        'pending': 'Pending',
        'progress': 'In Progress',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statuses[status] || status;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;color:white;font-size:18px;cursor:pointer;padding:0;margin-left:12px;">×</button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;

    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 4000);
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.viewJobDetails = viewJobDetails;
window.toggleChecklist = toggleChecklist;
window.submitNewJob = submitNewJob;
window.acceptQuote = acceptQuote;
window.declineQuote = declineQuote;
window.addToEnquiry = addToEnquiry;
window.updateJobStatus = updateJobStatus;
window.sendQuote = sendQuote;
window.sendInvoice = sendInvoice;
window.markPaid = markPaid;
window.resendQuote = resendQuote;
window.resendInvoice = resendInvoice;
window.addClient = addClient;
window.editClient = editClient;
window.deleteClient = deleteClient;
window.prevMonth = prevMonth;
window.nextMonth = nextMonth;
