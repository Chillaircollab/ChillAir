// ===== Chill Air Portal - Professional Dark Mode =====

// Demo Data
const demoData = {
    admin: {
        username: 'Hicks',
        password: 'frank1e',
        name: 'Greg Hicks',
        role: 'Administrator',
        initials: 'GH'
    },
    
    clients: [
        { id: 1, name: 'John Smith', email: 'john@example.com', phone: '027 123 4567', address: '123 Bealey Ave, Christchurch', password: 'demo123', jobs: 5 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '027 234 5678', address: '45 Riccarton Rd, Riccarton', password: 'demo123', jobs: 3 },
        { id: 3, name: 'Mike Thompson', email: 'mike@example.com', phone: '027 345 6789', address: '78 Memorial Ave, Burnside', password: 'demo123', jobs: 2 },
        { id: 4, name: 'Lisa Wilson', email: 'lisa@example.com', phone: '027 456 7890', address: '22 Papanui Rd, Merivale', password: 'demo123', jobs: 4 },
        { id: 5, name: 'David Brown', email: 'david@example.com', phone: '027 567 8901', address: '156 Rolleston Dr, Rolleston', password: 'demo123', jobs: 1 },
        { id: 6, name: 'Emma Davis', email: 'emma@example.com', phone: '027 678 9012', address: '89 Lincoln Rd, Lincoln', password: 'demo123', jobs: 2 },
        { id: 7, name: 'James Martin', email: 'james@example.com', phone: '027 789 0123', address: '34 High St, Rangiora', password: 'demo123', jobs: 3 },
        { id: 8, name: 'Olivia Taylor', email: 'olivia@example.com', phone: '027 890 1234', address: '67 Tancred St, Ashburton', password: 'demo123', jobs: 1 }
    ],
    
    jobs: [
        { id: 'JOB-001', clientId: 1, client: 'John Smith', service: 'Heat Pump Installation', description: 'Install new Daikin 7.1kW heat pump in living room', status: 'progress', progress: 75, date: '2026-01-08', checklist: ['Site inspection', 'Equipment ordered', 'Installation started', 'Testing', 'Handover'] },
        { id: 'JOB-002', clientId: 2, client: 'Sarah Johnson', service: 'Annual Service', description: 'Annual maintenance service for Mitsubishi heat pump', status: 'pending', progress: 20, date: '2026-01-10', checklist: ['Booking confirmed', 'Filter check', 'Gas levels', 'Electrical test', 'Report'] },
        { id: 'JOB-003', clientId: 3, client: 'Mike Thompson', service: 'Repair', description: 'Heat pump not cooling properly, making unusual noise', status: 'completed', progress: 100, date: '2025-12-28', checklist: ['Diagnosis', 'Parts ordered', 'Repair complete', 'Testing', 'Warranty'] },
        { id: 'JOB-004', clientId: 4, client: 'Lisa Wilson', service: 'Ventilation System', description: 'Install ducted ventilation system for whole house', status: 'pending', progress: 10, date: '2026-01-15', checklist: ['Design', 'Quote accepted', 'Installation', 'Commissioning', 'Training'] },
        { id: 'JOB-005', clientId: 1, client: 'John Smith', service: 'Repair', description: 'Remote control not working, check electrical connection', status: 'completed', progress: 100, date: '2025-12-20', checklist: ['Call received', 'Site visit', 'Repair', 'Testing', 'Invoice'] },
        { id: 'JOB-006', clientId: 6, client: 'Emma Davis', service: 'Heat Pump Installation', description: 'Install two split systems - bedroom and office', status: 'progress', progress: 50, date: '2026-01-09', checklist: ['Quote', 'Equipment', 'Bedroom install', 'Office install', 'Complete'] },
        { id: 'JOB-007', clientId: 7, client: 'James Martin', service: 'Pool Heat Pump', description: 'Install pool heating system', status: 'pending', progress: 5, date: '2026-01-20', checklist: ['Site assessment', 'Quote', 'Order equipment', 'Installation', 'Commissioning'] },
        { id: 'JOB-008', clientId: 8, client: 'Olivia Taylor', service: 'Maintenance', description: 'Filter clean and system check', status: 'pending', progress: 0, date: '2026-01-12', checklist: ['Booking', 'Service', 'Report', 'Invoice', 'Follow-up'] }
    ],
    
    quotes: [
        { id: 'QTE-001', clientId: 1, client: 'John Smith', description: 'Daikin 7.1kW Heat Pump Installation - includes unit, installation, and 5-year warranty', amount: 4500, status: 'accepted', expiry: '2026-01-15' },
        { id: 'QTE-002', clientId: 2, client: 'Sarah Johnson', description: 'Annual Service Package - 2 services per year, priority booking', amount: 350, status: 'pending', expiry: '2026-01-20' },
        { id: 'QTE-003', clientId: 4, client: 'Lisa Wilson', description: 'Whole house ventilation system with 4 rooms, includes HRV unit', amount: 6800, status: 'pending', expiry: '2026-01-25' },
        { id: 'QTE-004', clientId: 7, client: 'James Martin', description: 'Pool heat pump system - 15kW capacity, includes installation', amount: 8500, status: 'pending', expiry: '2026-01-30' }
    ],
    
    invoices: [
        { id: 'INV-001', clientId: 1, client: 'John Smith', description: 'Heat Pump Installation - Deposit', amount: 2250, status: 'paid', due: '2026-01-05', paid: '2026-01-03' },
        { id: 'INV-002', clientId: 3, client: 'Mike Thompson', description: 'Heat Pump Repair - Parts & Labour', amount: 450, status: 'pending', due: '2026-01-15' },
        { id: 'INV-003', clientId: 1, client: 'John Smith', description: 'Remote Control Repair', amount: 120, status: 'paid', due: '2025-12-28', paid: '2025-12-27' },
        { id: 'INV-004', clientId: 6, client: 'Emma Davis', description: 'Heat Pump Installation - Progress Payment', amount: 3200, status: 'pending', due: '2026-01-20' },
        { id: 'INV-005', clientId: 2, client: 'Sarah Johnson', description: 'Annual Service', amount: 175, status: 'overdue', due: '2025-12-30' }
    ],
    
    events: [
        { id: 1, title: 'Installation - John Smith', date: '2026-01-08', time: '09:00', clientId: 1, type: 'job' },
        { id: 2, title: 'Service - Sarah Johnson', date: '2026-01-10', time: '10:00', clientId: 2, type: 'job' },
        { id: 3, title: 'Team Meeting', date: '2026-01-06', time: '08:00', clientId: null, type: 'meeting' },
        { id: 4, title: 'Quote follow-up - Lisa', date: '2026-01-07', time: '14:00', clientId: 4, type: 'reminder' }
    ],
    
    bookings: [
        { id: 1, clientId: 1, service: 'Annual Service', date: '2026-02-15', time: 'Morning', status: 'confirmed' },
        { id: 2, clientId: 2, service: 'Filter Clean', date: '2026-01-25', time: 'Afternoon', status: 'pending' }
    ]
};

// State
let currentUser = null;
let isAdmin = false;
let currentPage = 'dashboard';
let currentMonth = new Date();
let currentEditingJob = null;
let currentEditingClient = null;

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initLogin();
    initNavigation();
    initMobileMenu();
    initModals();
    initFilters();
    initForms();
});

// ===== Login System =====
function initLogin() {
    const loginTabs = document.querySelectorAll('.login-tab');
    const loginForm = document.getElementById('login-form');
    const loginType = document.getElementById('login-type');

    if (!loginTabs.length || !loginForm || !loginType) return;

    // Tab switching
    loginTabs.forEach(function(tab) {
        tab.onclick = function(e) {
            e.preventDefault();
            loginTabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            loginType.value = this.getAttribute('data-tab');
        };
    });

    // Login form
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const type = loginType.value;

        if (type === 'admin') {
            if (email === demoData.admin.username && password === demoData.admin.password) {
                loginAsAdmin();
            } else {
                showNotification('Invalid admin credentials', 'error');
            }
        } else {
            const client = demoData.clients.find(function(c) {
                return (c.email === email || c.name.toLowerCase() === email.toLowerCase()) && c.password === password;
            });
            
            if (client) {
                loginAsClient(client);
            } else {
                showNotification('Invalid credentials. Check demo credentials below.', 'error');
            }
        }
    };
}

function loginAsAdmin() {
    currentUser = demoData.admin;
    isAdmin = true;
    
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('portal').classList.add('active');
    
    document.querySelectorAll('.client-nav').forEach(function(el) { el.classList.add('hidden'); });
    document.querySelectorAll('.admin-nav').forEach(function(el) { el.classList.remove('hidden'); });
    
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role').textContent = currentUser.role;
    document.getElementById('user-avatar').textContent = currentUser.initials;
    
    updateMobileNavForAdmin();
    navigateTo('dashboard');
    loadAdminDashboard();
    
    showNotification('Welcome back, ' + currentUser.name + '!', 'success');
}

function loginAsClient(client) {
    currentUser = client;
    currentUser.initials = client.name.split(' ').map(function(n) { return n[0]; }).join('');
    isAdmin = false;
    
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('portal').classList.add('active');
    
    document.querySelectorAll('.client-nav').forEach(function(el) { el.classList.remove('hidden'); });
    document.querySelectorAll('.admin-nav').forEach(function(el) { el.classList.add('hidden'); });
    
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role').textContent = 'Client';
    document.getElementById('user-avatar').textContent = currentUser.initials;
    
    updateMobileNavForClient();
    navigateTo('dashboard');
    loadClientDashboard();
    
    showNotification('Welcome back, ' + currentUser.name + '!', 'success');
}

function logout() {
    currentUser = null;
    isAdmin = false;
    
    document.getElementById('portal').classList.remove('active');
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('login-form').reset();
    
    // Reset to client tab
    document.querySelectorAll('.login-tab').forEach(function(t, i) {
        t.classList.toggle('active', i === 0);
    });
    document.getElementById('login-type').value = 'client';
    
    showNotification('You have been signed out', 'info');
}

// ===== Navigation =====
function initNavigation() {
    document.querySelectorAll('.nav-link:not(.mobile-nav__logout)').forEach(function(link) {
        link.onclick = function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) navigateTo(page);
        };
    });
}

function navigateTo(page) {
    currentPage = page;
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('data-page') === page);
    });
    
    document.querySelectorAll('.mobile-nav__link').forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('data-page') === page);
    });
    
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(function(section) {
        section.classList.remove('active');
    });
    
    // Show target page
    const pageMap = {
        'dashboard': isAdmin ? 'page-admin-dashboard' : 'page-dashboard',
        'jobs': isAdmin ? 'page-admin-jobs' : 'page-jobs',
        'quotes': isAdmin ? 'page-admin-quotes' : 'page-quotes',
        'invoices': isAdmin ? 'page-admin-invoices' : 'page-invoices',
        'bookings': 'page-bookings',
        'request-quote': 'page-request-quote',
        'book-service': 'page-book-service',
        'admin-jobs': 'page-admin-jobs',
        'admin-quotes': 'page-admin-quotes',
        'admin-invoices': 'page-admin-invoices',
        'admin-calendar': 'page-admin-calendar',
        'admin-clients': 'page-admin-clients'
    };
    
    const targetId = pageMap[page] || 'page-dashboard';
    const targetPage = document.getElementById(targetId);
    if (targetPage) targetPage.classList.add('active');
    
    // Update header title
    const titles = {
        'dashboard': 'Dashboard',
        'jobs': 'My Jobs',
        'quotes': 'Quotes',
        'invoices': 'Invoices',
        'bookings': 'Bookings',
        'request-quote': 'Request Quote',
        'book-service': 'Book Service',
        'admin-jobs': 'All Jobs',
        'admin-quotes': 'Manage Quotes',
        'admin-invoices': 'Manage Invoices',
        'admin-calendar': 'Calendar',
        'admin-clients': 'Clients'
    };
    
    document.getElementById('page-title').textContent = titles[page] || 'Dashboard';
    
    // Load page data
    loadPageData(page);
    
    // Close mobile sidebar
    closeMobileSidebar();
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
        case 'invoices':
            loadClientInvoices();
            break;
        case 'bookings':
            loadClientBookings();
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
        case 'admin-calendar':
            loadCalendar();
            break;
        case 'admin-clients':
            loadAdminClients();
            break;
    }
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (menuBtn) {
        menuBtn.onclick = function() {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        };
    }
    
    if (overlay) {
        overlay.onclick = closeMobileSidebar;
    }
    
    // Mobile nav links
    document.querySelectorAll('.mobile-nav__link:not(.mobile-nav__logout)').forEach(function(link) {
        link.onclick = function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) navigateTo(page);
        };
    });
}

function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebar-overlay').classList.remove('active');
}

function updateMobileNavForAdmin() {
    const nav = document.getElementById('mobile-nav-list');
    nav.innerHTML = '<li><a href="#" class="mobile-nav__link active" data-page="dashboard"><span class="mobile-nav__icon">🏠</span><span>Home</span></a></li>' +
        '<li><a href="#" class="mobile-nav__link" data-page="admin-jobs"><span class="mobile-nav__icon">📋</span><span>Jobs</span></a></li>' +
        '<li><a href="#" class="mobile-nav__link" data-page="admin-calendar"><span class="mobile-nav__icon">📆</span><span>Calendar</span></a></li>' +
        '<li><a href="#" class="mobile-nav__link" data-page="admin-clients"><span class="mobile-nav__icon">👥</span><span>Clients</span></a></li>' +
        '<li><a href="#" class="mobile-nav__link mobile-nav__logout" onclick="logout(); return false;"><span class="mobile-nav__icon">🚪</span><span>Out</span></a></li>';
    
    initMobileNavLinks();
}

function updateMobileNavForClient() {
    const nav = document.getElementById('mobile-nav-list');
    nav.innerHTML = '<li><a href="#" class="mobile-nav__link active" data-page="dashboard"><span class="mobile-nav__icon">🏠</span><span>Home</span></a></li>' +
        '<li><a href="#" class="mobile-nav__link" data-page="jobs"><span class="mobile-nav__icon">📋</span><span>Jobs</span></a></li>' +
        '<li><a href="#" class="mobile-nav__link" data-page="quotes"><span class="mobile-nav__icon">💰</span><span>Quotes</span></a></li>' +
        '<li><a href="#" class="mobile-nav__link" data-page="invoices"><span class="mobile-nav__icon">📄</span><span>Bills</span></a></li>' +
        '<li><a href="#" class="mobile-nav__link mobile-nav__logout" onclick="logout(); return false;"><span class="mobile-nav__icon">🚪</span><span>Out</span></a></li>';
    
    initMobileNavLinks();
}

function initMobileNavLinks() {
    document.querySelectorAll('.mobile-nav__link:not(.mobile-nav__logout)').forEach(function(link) {
        link.onclick = function(e) {
            e.preventDefault();
            navigateTo(this.getAttribute('data-page'));
        };
    });
}

// ===== Client Dashboard =====
function loadClientDashboard() {
    const clientJobs = demoData.jobs.filter(function(j) { return j.clientId === currentUser.id; });
    const clientQuotes = demoData.quotes.filter(function(q) { return q.clientId === currentUser.id; });
    const clientInvoices = demoData.invoices.filter(function(i) { return i.clientId === currentUser.id; });
    
    const activeJobs = clientJobs.filter(function(j) { return j.status !== 'completed'; }).length;
    const completedJobs = clientJobs.filter(function(j) { return j.status === 'completed'; }).length;
    const pendingQuotes = clientQuotes.filter(function(q) { return q.status === 'pending'; }).length;
    const unpaidAmount = clientInvoices.filter(function(i) { return i.status !== 'paid'; }).reduce(function(sum, i) { return sum + i.amount; }, 0);
    
    document.getElementById('stat-active-jobs').textContent = activeJobs;
    document.getElementById('stat-completed').textContent = completedJobs;
    document.getElementById('stat-pending-quotes').textContent = pendingQuotes;
    document.getElementById('stat-unpaid').textContent = '$' + unpaidAmount.toLocaleString();
    
    // Recent jobs
    const jobsContainer = document.getElementById('dashboard-jobs');
    const recentJobs = clientJobs.filter(function(j) { return j.status !== 'completed'; }).slice(0, 3);
    
    if (recentJobs.length === 0) {
        jobsContainer.innerHTML = '<div class="empty-state" style="padding: 40px;"><p style="color: var(--color-text-muted);">No active jobs</p></div>';
    } else {
        jobsContainer.innerHTML = recentJobs.map(function(job) {
            return '<div style="padding: 16px 20px; border-bottom: 1px solid var(--color-border);">' +
                '<div style="display: flex; justify-content: space-between; margin-bottom: 8px;">' +
                '<span style="font-weight: 600; color: var(--color-text);">' + job.service + '</span>' +
                '<span class="badge badge--' + job.status + '">' + capitalizeFirst(job.status) + '</span>' +
                '</div>' +
                '<div style="margin-bottom: 8px;"><div class="progress"><div class="progress-bar" style="width: ' + job.progress + '%;"></div></div></div>' +
                '<span style="font-size: 12px; color: var(--color-text-dim);">' + job.progress + '% complete</span>' +
                '</div>';
        }).join('');
    }
    
    // Timeline
    const timeline = document.getElementById('dashboard-timeline');
    const activities = [
        { date: 'Today', title: 'Quote received', description: 'New quote for ventilation system' },
        { date: 'Yesterday', title: 'Job progress updated', description: 'Heat pump installation at 75%' },
        { date: 'Jan 3', title: 'Invoice paid', description: 'Deposit payment confirmed' }
    ];
    
    timeline.innerHTML = activities.map(function(a) {
        return '<div class="timeline-item">' +
            '<div class="timeline-item__date">' + a.date + '</div>' +
            '<div class="timeline-item__title">' + a.title + '</div>' +
            '<div class="timeline-item__description">' + a.description + '</div>' +
            '</div>';
    }).join('');
}

// ===== Client Jobs =====
function loadClientJobs(filter) {
    filter = filter || 'all';
    let jobs = demoData.jobs.filter(function(j) { return j.clientId === currentUser.id; });
    
    if (filter !== 'all') {
        jobs = jobs.filter(function(j) { return j.status === filter; });
    }
    
    const container = document.getElementById('jobs-list');
    
    if (jobs.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state__icon">📋</div><div class="empty-state__title">No jobs found</div><div class="empty-state__description">You don\'t have any jobs matching this filter.</div></div>';
        return;
    }
    
    container.innerHTML = jobs.map(function(job) {
        return '<div class="job-card">' +
            '<div class="job-card__header">' +
            '<div><div class="job-card__id">' + job.id + '</div><div class="job-card__title">' + job.service + '</div></div>' +
            '<span class="badge badge--' + job.status + '">' + capitalizeFirst(job.status) + '</span>' +
            '</div>' +
            '<div class="job-card__description">' + job.description + '</div>' +
            '<div class="job-card__progress">' +
            '<div class="job-card__progress-label"><span>Progress</span><span>' + job.progress + '%</span></div>' +
            '<div class="progress"><div class="progress-bar" style="width: ' + job.progress + '%;"></div></div>' +
            '</div>' +
            '<div class="job-card__footer">' +
            '<span class="job-card__date">📅 ' + formatDate(job.date) + '</span>' +
            '<button class="btn btn-secondary btn-sm" onclick="viewJobDetails(\'' + job.id + '\')">View Details</button>' +
            '</div>' +
            '</div>';
    }).join('');
}

// ===== Client Quotes =====
function loadClientQuotes() {
    const quotes = demoData.quotes.filter(function(q) { return q.clientId === currentUser.id; });
    const container = document.getElementById('quotes-list');
    
    if (quotes.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state__icon">💰</div><div class="empty-state__title">No quotes</div><div class="empty-state__description">You haven\'t received any quotes yet.</div><button class="btn btn-primary" onclick="navigateTo(\'request-quote\')">Request Quote</button></div>';
        return;
    }
    
    container.innerHTML = quotes.map(function(quote) {
        const actions = quote.status === 'pending' ? 
            '<button class="btn btn-success btn-sm" onclick="acceptQuote(\'' + quote.id + '\')">Accept</button><button class="btn btn-secondary btn-sm" onclick="viewQuoteDetails(\'' + quote.id + '\')">View</button>' :
            '<button class="btn btn-secondary btn-sm" onclick="viewQuoteDetails(\'' + quote.id + '\')">View</button>';
        
        return '<div class="invoice-card">' +
            '<div class="invoice-card__info"><h4>' + quote.id + '</h4><p>' + truncate(quote.description, 60) + '</p></div>' +
            '<div class="invoice-card__amount"><h3>$' + quote.amount.toLocaleString() + '</h3><span class="badge badge--' + quote.status + '">' + capitalizeFirst(quote.status) + '</span>' +
            '<div class="invoice-card__actions">' + actions + '</div></div>' +
            '</div>';
    }).join('');
}

// ===== Client Invoices =====
function loadClientInvoices() {
    const invoices = demoData.invoices.filter(function(i) { return i.clientId === currentUser.id; });
    const container = document.getElementById('invoices-list');
    
    if (invoices.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state__icon">📄</div><div class="empty-state__title">No invoices</div><div class="empty-state__description">You don\'t have any invoices yet.</div></div>';
        return;
    }
    
    container.innerHTML = invoices.map(function(inv) {
        const statusClass = inv.status === 'overdue' ? 'overdue' : inv.status;
        const actions = inv.status !== 'paid' ? 
            '<button class="btn btn-success btn-sm" onclick="openPayModal(\'' + inv.id + '\')">Pay Now</button>' : 
            '<span style="color: var(--color-success); font-size: 12px;">✓ Paid ' + formatDate(inv.paid) + '</span>';
        
        return '<div class="invoice-card">' +
            '<div class="invoice-card__info"><h4>' + inv.id + '</h4><p>' + inv.description + '</p><p style="font-size: 12px; color: var(--color-text-dim);">Due: ' + formatDate(inv.due) + '</p></div>' +
            '<div class="invoice-card__amount"><h3>$' + inv.amount.toLocaleString() + '</h3><span class="badge badge--' + statusClass + '">' + capitalizeFirst(inv.status) + '</span>' +
            '<div class="invoice-card__actions">' + actions + '</div></div>' +
            '</div>';
    }).join('');
}

// ===== Client Bookings =====
function loadClientBookings() {
    const bookings = demoData.bookings.filter(function(b) { return b.clientId === currentUser.id; });
    const container = document.getElementById('bookings-list');
    
    if (bookings.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-state__icon">📅</div><div class="empty-state__title">No bookings</div><div class="empty-state__description">You don\'t have any upcoming appointments.</div><button class="btn btn-primary" onclick="navigateTo(\'book-service\')">Book Service</button></div>';
        return;
    }
    
    container.innerHTML = bookings.map(function(b) {
        return '<div class="invoice-card">' +
            '<div class="invoice-card__info"><h4>' + b.service + '</h4><p>📅 ' + formatDate(b.date) + ' - ' + b.time + '</p></div>' +
            '<span class="badge badge--' + (b.status === 'confirmed' ? 'completed' : 'pending') + '">' + capitalizeFirst(b.status) + '</span>' +
            '</div>';
    }).join('');
}

// ===== Admin Dashboard =====
function loadAdminDashboard() {
    const activeJobs = demoData.jobs.filter(function(j) { return j.status !== 'completed'; }).length;
    const totalRevenue = demoData.invoices.filter(function(i) { return i.status === 'paid'; }).reduce(function(sum, i) { return sum + i.amount; }, 0);
    const pendingQuotes = demoData.quotes.filter(function(q) { return q.status === 'pending'; }).length;
    
    document.getElementById('admin-stat-jobs').textContent = activeJobs;
    document.getElementById('admin-stat-revenue').textContent = '$' + totalRevenue.toLocaleString();
    document.getElementById('admin-stat-clients').textContent = demoData.clients.length;
    document.getElementById('admin-stat-pending').textContent = pendingQuotes;
    
    // Recent jobs table
    const recentJobs = document.getElementById('admin-recent-jobs');
    recentJobs.innerHTML = demoData.jobs.slice(0, 5).map(function(job) {
        return '<tr onclick="viewJobDetails(\'' + job.id + '\')" style="cursor: pointer;">' +
            '<td><strong>' + job.id + '</strong><br><small style="color: var(--color-text-muted);">' + job.service + '</small></td>' +
            '<td>' + job.client + '</td>' +
            '<td><span class="badge badge--' + job.status + '">' + capitalizeFirst(job.status) + '</span></td>' +
            '</tr>';
    }).join('');
    
    // Today's schedule
    const today = new Date().toISOString().split('T')[0];
    const todayEvents = demoData.events.filter(function(e) { return e.date === today || e.date === '2026-01-06'; });
    const scheduleContainer = document.getElementById('admin-today-schedule');
    
    if (todayEvents.length === 0) {
        scheduleContainer.innerHTML = '<p style="color: var(--color-text-muted);">No events scheduled for today</p>';
    } else {
        scheduleContainer.innerHTML = todayEvents.map(function(e) {
            return '<div style="padding: 12px; background: var(--color-bg-dark); border-radius: var(--radius-md); margin-bottom: 8px;">' +
                '<div style="display: flex; justify-content: space-between; align-items: center;">' +
                '<span style="font-weight: 600; color: var(--color-text);">' + e.title + '</span>' +
                '<span style="font-size: 12px; color: var(--color-primary);">' + e.time + '</span>' +
                '</div></div>';
        }).join('');
    }
    
    // Populate client selects
    populateClientSelects();
}

// ===== Admin Jobs =====
function loadAdminJobs(filter) {
    filter = filter || 'all';
    let jobs = demoData.jobs;
    
    if (filter !== 'all') {
        jobs = jobs.filter(function(j) { return j.status === filter; });
    }
    
    const tbody = document.getElementById('admin-jobs-table');
    tbody.innerHTML = jobs.map(function(job) {
        return '<tr>' +
            '<td><strong>' + job.id + '</strong></td>' +
            '<td>' + job.client + '</td>' +
            '<td>' + job.service + '</td>' +
            '<td><span class="badge badge--' + job.status + '">' + capitalizeFirst(job.status) + '</span></td>' +
            '<td><div class="progress" style="width: 100px;"><div class="progress-bar" style="width: ' + job.progress + '%;"></div></div></td>' +
            '<td>' + formatDate(job.date) + '</td>' +
            '<td><button class="btn btn-secondary btn-sm" onclick="viewJobDetails(\'' + job.id + '\')">View</button></td>' +
            '</tr>';
    }).join('');
}

// ===== Admin Quotes =====
function loadAdminQuotes() {
    const tbody = document.getElementById('admin-quotes-table');
    tbody.innerHTML = demoData.quotes.map(function(q) {
        return '<tr>' +
            '<td><strong>' + q.id + '</strong></td>' +
            '<td>' + q.client + '</td>' +
            '<td>' + truncate(q.description, 40) + '</td>' +
            '<td>$' + q.amount.toLocaleString() + '</td>' +
            '<td><span class="badge badge--' + q.status + '">' + capitalizeFirst(q.status) + '</span></td>' +
            '<td>' + formatDate(q.expiry) + '</td>' +
            '<td><button class="btn btn-secondary btn-sm" onclick="viewQuoteDetails(\'' + q.id + '\')">View</button></td>' +
            '</tr>';
    }).join('');
}

// ===== Admin Invoices =====
function loadAdminInvoices() {
    const tbody = document.getElementById('admin-invoices-table');
    tbody.innerHTML = demoData.invoices.map(function(inv) {
        const statusClass = inv.status === 'overdue' ? 'overdue' : inv.status;
        return '<tr>' +
            '<td><strong>' + inv.id + '</strong></td>' +
            '<td>' + inv.client + '</td>' +
            '<td>' + truncate(inv.description, 40) + '</td>' +
            '<td>$' + inv.amount.toLocaleString() + '</td>' +
            '<td><span class="badge badge--' + statusClass + '">' + capitalizeFirst(inv.status) + '</span></td>' +
            '<td>' + formatDate(inv.due) + '</td>' +
            '<td><button class="btn btn-secondary btn-sm" onclick="viewInvoiceDetails(\'' + inv.id + '\')">View</button></td>' +
            '</tr>';
    }).join('');
}

// ===== Admin Clients =====
function loadAdminClients() {
    const tbody = document.getElementById('admin-clients-table');
    tbody.innerHTML = demoData.clients.map(function(c) {
        return '<tr>' +
            '<td><strong>' + c.name + '</strong></td>' +
            '<td>' + c.email + '</td>' +
            '<td>' + c.phone + '</td>' +
            '<td>' + truncate(c.address, 30) + '</td>' +
            '<td>' + c.jobs + '</td>' +
            '<td><button class="btn btn-secondary btn-sm" onclick="viewClientDetails(' + c.id + ')">View</button></td>' +
            '</tr>';
    }).join('');
}

// ===== Calendar =====
function loadCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calendar-month').textContent = monthNames[currentMonth.getMonth()] + ' ' + currentMonth.getFullYear();
    
    const grid = document.getElementById('calendar-grid');
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    let html = '<div class="calendar-header">Sun</div><div class="calendar-header">Mon</div><div class="calendar-header">Tue</div><div class="calendar-header">Wed</div><div class="calendar-header">Thu</div><div class="calendar-header">Fri</div><div class="calendar-header">Sat</div>';
    
    // Previous month days
    const prevDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        html += '<div class="calendar-day calendar-day--other"><div class="calendar-day__number">' + (prevDays - i) + '</div></div>';
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');
        const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
        const dayEvents = demoData.events.filter(function(e) { return e.date === dateStr; });
        
        let dayClass = 'calendar-day';
        if (isToday) dayClass += ' calendar-day--today';
        
        let eventsHtml = dayEvents.map(function(e) {
            return '<div class="calendar-event" onclick="viewEvent(' + e.id + ')">' + e.title + '</div>';
        }).join('');
        
        html += '<div class="' + dayClass + '" onclick="selectDate(\'' + dateStr + '\')"><div class="calendar-day__number">' + day + '</div>' + eventsHtml + '</div>';
    }
    
    // Next month days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingDays = totalCells - (firstDay + daysInMonth);
    for (let i = 1; i <= remainingDays; i++) {
        html += '<div class="calendar-day calendar-day--other"><div class="calendar-day__number">' + i + '</div></div>';
    }
    
    grid.innerHTML = html;
}

function changeMonth(delta) {
    currentMonth.setMonth(currentMonth.getMonth() + delta);
    loadCalendar();
}

function selectDate(date) {
    document.getElementById('event-date').value = date;
    openModal('new-event-modal');
}

function createEvent() {
    const title = document.getElementById('event-title').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const clientId = document.getElementById('event-client').value;
    const type = document.getElementById('event-type').value;
    
    if (!title || !date) {
        showNotification('Please fill in required fields', 'error');
        return;
    }
    
    demoData.events.push({
        id: demoData.events.length + 1,
        title: title,
        date: date,
        time: time,
        clientId: clientId ? parseInt(clientId) : null,
        type: type
    });
    
    closeModal('new-event-modal');
    loadCalendar();
    showNotification('Event added successfully', 'success');
    document.getElementById('new-event-form').reset();
}

// ===== View Details =====
function viewJobDetails(jobId) {
    const job = demoData.jobs.find(function(j) { return j.id === jobId; });
    if (!job) return;
    
    currentEditingJob = job;
    
    const content = document.getElementById('view-job-content');
    const checklistHtml = job.checklist.map(function(item, i) {
        const progress = (i / job.checklist.length) * 100;
        const checked = job.progress >= progress;
        return '<li><div class="checklist-check ' + (checked ? 'checked' : '') + '" onclick="toggleChecklistItem(' + i + ')">' + (checked ? '✓' : '') + '</div><span>' + item + '</span></li>';
    }).join('');
    
    content.innerHTML = '<div class="detail-header"><div><div class="detail-header__id">' + job.id + '</div><div class="detail-header__title">' + job.service + '</div></div><span class="badge badge--' + job.status + '">' + capitalizeFirst(job.status) + '</span></div>' +
        '<div class="detail-grid">' +
        '<div class="detail-item"><div class="detail-item__label">Client</div><div class="detail-item__value">' + job.client + '</div></div>' +
        '<div class="detail-item"><div class="detail-item__label">Date</div><div class="detail-item__value">' + formatDate(job.date) + '</div></div>' +
        '<div class="detail-item"><div class="detail-item__label">Progress</div><div class="detail-item__value">' + job.progress + '%</div></div>' +
        '<div class="detail-item"><div class="detail-item__label">Status</div><div class="detail-item__value">' + (isAdmin ? '<select class="form-input" id="edit-job-status" style="padding: 8px;"><option value="pending"' + (job.status === 'pending' ? ' selected' : '') + '>Pending</option><option value="progress"' + (job.status === 'progress' ? ' selected' : '') + '>In Progress</option><option value="completed"' + (job.status === 'completed' ? ' selected' : '') + '>Completed</option></select>' : capitalizeFirst(job.status)) + '</div></div>' +
        '</div>' +
        '<div style="margin-top: 24px;"><h4 style="margin-bottom: 16px; color: var(--color-text);">Description</h4><p style="color: var(--color-text-muted);">' + job.description + '</p></div>' +
        '<div style="margin-top: 24px;"><h4 style="margin-bottom: 16px; color: var(--color-text);">Checklist</h4><ul class="checklist">' + checklistHtml + '</ul></div>';
    
    document.getElementById('save-job-btn').style.display = isAdmin ? 'block' : 'none';
    openModal('view-job-modal');
}

function toggleChecklistItem(index) {
    if (!isAdmin || !currentEditingJob) return;
    // Toggle logic here - for demo, just show notification
    showNotification('Checklist item toggled', 'info');
}

function saveJobChanges() {
    if (!currentEditingJob) return;
    
    const newStatus = document.getElementById('edit-job-status').value;
    currentEditingJob.status = newStatus;
    
    if (newStatus === 'completed') currentEditingJob.progress = 100;
    else if (newStatus === 'pending') currentEditingJob.progress = Math.min(currentEditingJob.progress, 20);
    
    closeModal('view-job-modal');
    loadPageData(currentPage);
    showNotification('Job updated successfully', 'success');
}

function viewQuoteDetails(quoteId) {
    const quote = demoData.quotes.find(function(q) { return q.id === quoteId; });
    if (!quote) return;
    
    const content = document.getElementById('view-quote-content');
    content.innerHTML = '<div class="detail-header"><div><div class="detail-header__id">' + quote.id + '</div><div class="detail-header__title">Quote Details</div></div><span class="badge badge--' + quote.status + '">' + capitalizeFirst(quote.status) + '</span></div>' +
        '<div class="detail-grid">' +
        '<div class="detail-item"><div class="detail-item__label">Client</div><div class="detail-item__value">' + quote.client + '</div></div>' +
        '<div class="detail-item"><div class="detail-item__label">Amount</div><div class="detail-item__value" style="font-size: 1.25rem; color: var(--color-primary);">$' + quote.amount.toLocaleString() + '</div></div>' +
        '<div class="detail-item" style="grid-column: span 2;"><div class="detail-item__label">Valid Until</div><div class="detail-item__value">' + formatDate(quote.expiry) + '</div></div>' +
        '</div>' +
        '<div style="margin-top: 24px;"><h4 style="margin-bottom: 16px; color: var(--color-text);">Description</h4><p style="color: var(--color-text-muted);">' + quote.description + '</p></div>';
    
    const footer = document.getElementById('view-quote-footer');
    if (!isAdmin && quote.status === 'pending') {
        footer.innerHTML = '<button class="btn btn-secondary" onclick="closeModal(\'view-quote-modal\')">Close</button><button class="btn btn-success" onclick="acceptQuote(\'' + quote.id + '\')">Accept Quote</button>';
    } else {
        footer.innerHTML = '<button class="btn btn-secondary" onclick="closeModal(\'view-quote-modal\')">Close</button>';
    }
    
    openModal('view-quote-modal');
}

function acceptQuote(quoteId) {
    const quote = demoData.quotes.find(function(q) { return q.id === quoteId; });
    if (quote) {
        quote.status = 'accepted';
        closeModal('view-quote-modal');
        loadPageData(currentPage);
        showNotification('Quote accepted! We\'ll be in touch soon.', 'success');
    }
}

function viewClientDetails(clientId) {
    const client = demoData.clients.find(function(c) { return c.id === clientId; });
    if (!client) return;
    
    currentEditingClient = client;
    
    const content = document.getElementById('view-client-content');
    content.innerHTML = '<div class="form-group"><label class="form-label">Name</label><input type="text" class="form-input" id="edit-client-name" value="' + client.name + '"></div>' +
        '<div class="form-row"><div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="edit-client-email" value="' + client.email + '"></div>' +
        '<div class="form-group"><label class="form-label">Phone</label><input type="tel" class="form-input" id="edit-client-phone" value="' + client.phone + '"></div></div>' +
        '<div class="form-group"><label class="form-label">Address</label><input type="text" class="form-input" id="edit-client-address" value="' + client.address + '"></div>' +
        '<div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--color-border);"><p style="color: var(--color-text-muted);">Total Jobs: ' + client.jobs + '</p></div>';
    
    openModal('view-client-modal');
}

function saveClientChanges() {
    if (!currentEditingClient) return;
    
    currentEditingClient.name = document.getElementById('edit-client-name').value;
    currentEditingClient.email = document.getElementById('edit-client-email').value;
    currentEditingClient.phone = document.getElementById('edit-client-phone').value;
    currentEditingClient.address = document.getElementById('edit-client-address').value;
    
    closeModal('view-client-modal');
    loadAdminClients();
    showNotification('Client updated successfully', 'success');
}

function openPayModal(invoiceId) {
    const invoice = demoData.invoices.find(function(i) { return i.id === invoiceId; });
    if (!invoice) return;
    
    const content = document.getElementById('pay-invoice-content');
    content.innerHTML = '<div style="text-align: center; padding: 20px 0;">' +
        '<h3 style="color: var(--color-text); margin-bottom: 8px;">' + invoice.id + '</h3>' +
        '<p style="color: var(--color-text-muted); margin-bottom: 24px;">' + invoice.description + '</p>' +
        '<div style="font-size: 2.5rem; font-weight: 700; color: var(--color-primary); margin-bottom: 24px;">$' + invoice.amount.toLocaleString() + '</div>' +
        '<p style="font-size: 12px; color: var(--color-text-dim);">Demo mode - click Pay Now to simulate payment</p>' +
        '</div>';
    
    content.dataset.invoiceId = invoiceId;
    openModal('pay-invoice-modal');
}

function processPayment() {
    const invoiceId = document.getElementById('pay-invoice-content').dataset.invoiceId;
    const invoice = demoData.invoices.find(function(i) { return i.id === invoiceId; });
    
    if (invoice) {
        invoice.status = 'paid';
        invoice.paid = new Date().toISOString().split('T')[0];
        closeModal('pay-invoice-modal');
        loadClientInvoices();
        loadClientDashboard();
        showNotification('Payment successful! Thank you.', 'success');
    }
}

// ===== Create Actions =====
function createJob() {
    const clientId = document.getElementById('job-client').value;
    const service = document.getElementById('job-service').value;
    const description = document.getElementById('job-description').value;
    const date = document.getElementById('job-date').value;
    
    if (!clientId || !service || !description || !date) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    const client = demoData.clients.find(function(c) { return c.id === parseInt(clientId); });
    const newJob = {
        id: 'JOB-' + String(demoData.jobs.length + 1).padStart(3, '0'),
        clientId: parseInt(clientId),
        client: client.name,
        service: service,
        description: description,
        status: 'pending',
        progress: 0,
        date: date,
        checklist: ['Initial contact', 'Site assessment', 'Work in progress', 'Testing', 'Handover']
    };
    
    demoData.jobs.push(newJob);
    closeModal('new-job-modal');
    loadAdminJobs();
    showNotification('Job created successfully', 'success');
    document.getElementById('new-job-form').reset();
}

function sendQuote() {
    const clientId = document.getElementById('quote-client').value;
    const description = document.getElementById('quote-description').value;
    const amount = document.getElementById('quote-amount').value;
    const expiry = document.getElementById('quote-expiry').value;
    
    if (!clientId || !description || !amount || !expiry) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    const client = demoData.clients.find(function(c) { return c.id === parseInt(clientId); });
    demoData.quotes.push({
        id: 'QTE-' + String(demoData.quotes.length + 1).padStart(3, '0'),
        clientId: parseInt(clientId),
        client: client.name,
        description: description,
        amount: parseFloat(amount),
        status: 'pending',
        expiry: expiry
    });
    
    closeModal('send-quote-modal');
    loadAdminQuotes();
    showNotification('Quote sent successfully', 'success');
    document.getElementById('send-quote-form').reset();
}

function sendInvoice() {
    const clientId = document.getElementById('invoice-client').value;
    const description = document.getElementById('invoice-description').value;
    const amount = document.getElementById('invoice-amount').value;
    const due = document.getElementById('invoice-due').value;
    
    if (!clientId || !description || !amount || !due) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    const client = demoData.clients.find(function(c) { return c.id === parseInt(clientId); });
    demoData.invoices.push({
        id: 'INV-' + String(demoData.invoices.length + 1).padStart(3, '0'),
        clientId: parseInt(clientId),
        client: client.name,
        description: description,
        amount: parseFloat(amount),
        status: 'pending',
        due: due
    });
    
    closeModal('send-invoice-modal');
    loadAdminInvoices();
    showNotification('Invoice sent successfully', 'success');
    document.getElementById('send-invoice-form').reset();
}

function addClient() {
    const name = document.getElementById('client-name').value;
    const email = document.getElementById('client-email').value;
    const phone = document.getElementById('client-phone').value;
    const address = document.getElementById('client-address').value;
    const password = document.getElementById('client-password').value;
    
    if (!name || !email || !phone || !password) {
        showNotification('Please fill required fields', 'error');
        return;
    }
    
    demoData.clients.push({
        id: demoData.clients.length + 1,
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password,
        jobs: 0
    });
    
    closeModal('add-client-modal');
    loadAdminClients();
    populateClientSelects();
    showNotification('Client added successfully', 'success');
    document.getElementById('add-client-form').reset();
}

// ===== Modals =====
function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
        overlay.onclick = function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        };
    });
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
    if (id.includes('quote') || id.includes('invoice') || id.includes('job') || id.includes('event')) {
        populateClientSelects();
    }
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

function populateClientSelects() {
    const selects = ['job-client', 'quote-client', 'invoice-client', 'event-client'];
    selects.forEach(function(selectId) {
        const select = document.getElementById(selectId);
        if (select) {
            const currentValue = select.value;
            select.innerHTML = '<option value="">Select client</option>' + 
                demoData.clients.map(function(c) {
                    return '<option value="' + c.id + '">' + c.name + '</option>';
                }).join('');
            if (currentValue) select.value = currentValue;
        }
    });
}

// ===== Filters =====
function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.onclick = function() {
            const container = this.closest('.page-section');
            container.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            if (currentPage === 'jobs' || currentPage === 'admin-jobs') {
                isAdmin ? loadAdminJobs(filter) : loadClientJobs(filter);
            }
        };
    });
}

// ===== Forms =====
function initForms() {
    const quoteForm = document.getElementById('quote-request-form');
    if (quoteForm) {
        quoteForm.onsubmit = function(e) {
            e.preventDefault();
            showNotification('Quote request submitted! We\'ll contact you soon.', 'success');
            this.reset();
            navigateTo('dashboard');
        };
    }
    
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.onsubmit = function(e) {
            e.preventDefault();
            showNotification('Booking request submitted! We\'ll confirm shortly.', 'success');
            this.reset();
            navigateTo('bookings');
        };
    }
}

// ===== Helpers =====
function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification notification--' + type;
    notification.innerHTML = '<span>' + message + '</span><button onclick="this.parentElement.remove()" style="background:none;border:none;color:var(--color-text-muted);font-size:18px;cursor:pointer;margin-left:12px;">×</button>';
    document.body.appendChild(notification);
    
    setTimeout(function() {
        if (notification.parentElement) notification.remove();
    }, 4000);
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function truncate(str, length) {
    if (str.length <= length) return str;
    return str.substring(0, length) + '...';
}
