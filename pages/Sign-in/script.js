const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');
const loginForm = document.getElementById('loginForm');

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
        showMessage('Por favor completa todos los campos', 'error');
        return;
    }

    try {
        const user = UserService.validateLogin(email, password);
        
        if (user) {
            AuthService.setUser(user);
            showMessage('Inicio de sesión exitoso', 'success');
            
            setTimeout(() => {
                window.location.href = '/pages/dashboard/dashboard.html';
            }, 1000);
        } else {
            showMessage('Email o contraseña incorrectos', 'error');
        }
    } catch (error) {
        showMessage('Error en el servidor', 'error');
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