class AuthService {
  static ROLES = {
    ADMIN: 'admin',
    USER: 'user'
  };

  static setUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  static getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  static isLoggedIn() {
    return this.getCurrentUser() !== null;
  }

  static isAdmin() {
    const user = this.getCurrentUser();
    return user && user.role === this.ROLES.ADMIN;
  }

  static logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/pages/Sign-in/index.html';
  }

  static requireAuth(redirectUrl = '/pages/Sign-in/index.html') {
    if (!this.isLoggedIn()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }

  static requireAdmin(redirectUrl = '/index.html') {
    if (!this.isAdmin()) {
      window.location.href = redirectUrl;
      return false;
    }
    return true;
  }
}

class UserService {
  static users = [
    { 
      id: 1, 
      name: 'Juan Admin', 
      email: 'admin@datapaw.com', 
      password: 'admin123', 
      role: 'admin',
      createdAt: '2026-01-01' 
    },
    { 
      id: 2, 
      name: 'María Usuario', 
      email: 'user@datapaw.com', 
      password: 'user123', 
      role: 'user',
      createdAt: '2026-01-15' 
    }
  ];

  static getAllUsers() {
    const storedUsers = localStorage.getItem('appUsers');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
    return this.users;
  }

  static saveUsers() {
    localStorage.setItem('appUsers', JSON.stringify(this.users));
  }

  static createUser(userData) {
    const newUser = {
      id: Date.now(),
      ...userData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  static deleteUser(userId) {
    this.users = this.users.filter(user => user.id !== userId);
    this.saveUsers();
  }

  static findUserByEmail(email) {
    this.getAllUsers();
    return this.users.find(user => user.email === email);
  }

  static validateLogin(email, password) {
    const user = this.findUserByEmail(email);
    if (user && user.password === password) {
      return { ...user };
    }
    return null;
  }

  static updateUser(userId, updateData) {
    // Security check: only admins can update users
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || !AuthService.isAdmin()) {
      throw new Error('Unauthorized: Only admins can update user data');
    }
    
    this.getAllUsers();
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      // Preserve original password and creation date
      const originalUser = this.users[userIndex];
      this.users[userIndex] = { 
        ...originalUser, 
        ...updateData,
        id: originalUser.id, // Preserve original ID
        password: originalUser.password, // Preserve original password
        createdAt: originalUser.createdAt // Preserve creation date
      };
      this.saveUsers();
      return this.users[userIndex];
    }
    return null;
  }

  static changePassword(userId, currentPassword, newPassword) {
    // Users can only change their own password
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || currentUser.id !== userId) {
      throw new Error('Unauthorized: You can only change your own password');
    }
    
    this.getAllUsers();
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Verify current password
    if (this.users[userIndex].password !== currentPassword) {
      throw new Error('Current password is incorrect');
    }
    
    // Update password
    this.users[userIndex].password = newPassword;
    this.saveUsers();
    
    return true;
  }
}

window.AuthService = AuthService;
window.UserService = UserService;