document.addEventListener('DOMContentLoaded', function() {
    // Get user info from URL parameters if they exist
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const fullname = urlParams.get('fullname');

    if (username && fullname) {
        // User is logged in
        document.querySelector('.digits-login-modal').parentElement.style.display = 'none';
        document.querySelector('.user-profile').classList.remove('d-none');
        document.querySelector('.username').textContent = fullname;

        // Handle logout
        document.getElementById('logoutBtn').addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
});