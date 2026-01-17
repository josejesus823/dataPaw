const signupForm = document.getElementById('signupForm');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic Validation
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return; // Stop the function here
    }

    alert('Sign up successful! Welcome to DataPaw.');
    console.log("Form Data Submitted");
});