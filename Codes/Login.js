// Handles login form submission and validation

const loginform = document.getElementById('Loginform');

// Listen for form submission
loginform.addEventListener('submit', e => {
    e.preventDefault(); // Stop the page from reloading

    // Read the username and password inputs
    const username = document.getElementById('Username_log').value.trim();
    const password = document.getElementById('password_log').value;

    // Clear any error left over from a previous attempt
    showError('login-error', '');

    // Make sure neither field is empty
    if (!username || !password) {
        showError('login-error', 'Please enter both your username and password.');
        return;
    }

    // Look up the user in localStorage by username
    const stored = localStorage.getItem(username);

    if (stored) {
        const parsedUser = JSON.parse(stored);

        if (parsedUser.password === password) {
            // Correct password — save session and redirect
            localStorage.setItem('user', JSON.stringify(parsedUser));
            window.location.href = '../Codes/Shop.html';
        } else {
            showError('login-error', 'Incorrect password. Please try again.');
        }
    } else {
        showError('login-error', 'No account found with that username.');
    }
});

// Write a message into an element by its id
function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}
