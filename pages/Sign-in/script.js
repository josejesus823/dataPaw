const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
const loginForm = document.getElementById('loginForm');
const cancelButton = document.querySelector('.btn-secondary');

cancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../Home/home.html';
});

showPasswordCheckbox.addEventListener('change', function() {
    if (this.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showMessage('Please complete all fields', 'error');
        return;
    }

    try {
        const user = UserService.validateLogin(email, password);
        
        if (user) {
            AuthService.setUser(user);
            showMessage('Login successful', 'success');
            
            setTimeout(() => {
                window.location.href = '../dashboard/dashboard.html';
            }, 1000);
        } else {
            showMessage('Incorrect email or password', 'error');
        }
    } catch (error) {
        showMessage('Server error', 'error');
    }
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message') || createMessageDiv();
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

function createMessageDiv() {
    const messageDiv = document.createElement('div');
    messageDiv.id = 'message';
    messageDiv.className = 'message';
    messageDiv.style.display = 'none';
    
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    return messageDiv;
}