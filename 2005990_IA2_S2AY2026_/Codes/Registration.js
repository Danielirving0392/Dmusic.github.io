// Handles registration form submission and validation

const Registform = document.getElementById('registrationform');

// Listen for form submission
Registform.addEventListener('submit', e => {
    e.preventDefault(); // Stop the page from reloading

    // Read all input values
    const name     = document.getElementById('name').value.trim();
    const DOB      = document.getElementById('DOB').value;
    const email    = document.getElementById('Email').value.trim();
    const username = document.getElementById('Username').value.trim();
    const password = document.getElementById('password').value;

    // Clear previous error messages before re-checking
    clearErrors();

    let valid = true;

    // Name and date of birth checks
    if (!name) {
        showError('name-error', 'Please enter your full name.');
        valid = false;
    }

    if (!DOB) {
        showError('dob-error', 'Please enter your date of birth.');
        valid = false;
    }

    // Email format check using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showError('email-error', 'Please enter your email address.');
        valid = false;
    } else if (!emailPattern.test(email)) {
        showError('email-error', 'Please enter a valid email address (e.g. name@example.com).');
        valid = false;
    }

    // Username check
    if (!username) {
        showError('username-error', 'Please enter a username.');
        valid = false;
    }

    // Password length check — minimum 6 characters
    if (!password) {
        showError('password-error', 'Please enter a password.');
        valid = false;
    } else if (password.length < 6) {
        showError('password-error', 'Password must be at least 6 characters.');
        valid = false;
    }

    // Only save and redirect if everything passed
    if (!valid) return;

    // Save the new user to localStorage and redirect to login
    const user = {
        name:     name,
        DOB:      DOB,
        email:    email,
        username: username,
        password: password
    };

    localStorage.setItem(username, JSON.stringify(user));
    alert('Registration Successful! Please log in.');
    window.location.href = 'Login.html';
});

// Write an error message into an element by its id
function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
}

// Clear all error message elements
function clearErrors() {
    const ids = ['name-error', 'dob-error', 'email-error', 'username-error', 'password-error'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
    });
}
