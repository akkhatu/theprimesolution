// Add welcome page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already seen welcome page
    if (!sessionStorage.getItem('welcomePageSeen')) {
        document.getElementById('welcome-page').classList.add('active');
        sessionStorage.setItem('welcomePageSeen', 'true');
    } else {
        document.getElementById('home-tab').classList.add('active');
        document.getElementById('home').classList.add('active');
    }
});

// Get started button on welcome page
document.getElementById('getStartedBtn').addEventListener('click', function() {
    window.location.href = '/about';
});

// ... existing code ...