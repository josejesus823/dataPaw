const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
const loginForm = document.getElementById('loginForm');

// Toggle Password Visibility
showPasswordCheckbox.addEventListener('change', function() {
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

// Basic Form Submission Handling
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Sign in attempted!');
});