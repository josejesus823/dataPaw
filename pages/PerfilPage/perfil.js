let originalUserData = {};

document.addEventListener('DOMContentLoaded', function() {
    if (!AuthService.requireAuth()) {
        return;
    }
    
    loadUserProfile();
    setupEventListeners();
});

function loadUserProfile() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
        showMessage('User not found', 'error');
        return;
    }
    
    originalUserData = { ...currentUser };
    
    document.getElementById('display-name').textContent = currentUser.name || 'User';
    document.getElementById('display-email').textContent = currentUser.email || '';
    
    const avatar = document.getElementById('user-avatar');
    avatar.textContent = currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U';
    
    document.getElementById('full-name').value = currentUser.name || '';
    document.getElementById('email').value = currentUser.email || '';
    document.getElementById('phone').value = currentUser.phone || '';
    document.getElementById('birth-date').value = currentUser.dateOfBirth || '';
    document.getElementById('role').value = currentUser.role || 'user';
}

function setupEventListeners() {
    const form = document.getElementById('profile-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    form.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', handleCancel);
    logoutBtn.addEventListener('click', handleLogout);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const updatedUser = {
        ...originalUserData,
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim(),
        dateOfBirth: formData.get('dateOfBirth')
    };
    
    if (!updatedUser.name || !updatedUser.email) {
        showMessage('Name and email are required', 'error');
        return;
    }
    
    const users = UserService.getAllUsers();
    const existingUserIndex = users.findIndex(u => u.id === originalUserData.id);
    
    if (existingUserIndex !== -1) {
        users[existingUserIndex] = updatedUser;
        UserService.users = users;
        UserService.saveUsers();
        
        AuthService.setUser(updatedUser);
        
        originalUserData = { ...updatedUser };
        loadUserProfile();
        
        showMessage('Profile updated successfully!', 'success');
    } else {
        showMessage('Error updating profile', 'error');
    }
}

function handleCancel() {
    window.location.href = '../dashboard/dashboard.html';
}

function handleLogout() {
    AuthService.logout();
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}