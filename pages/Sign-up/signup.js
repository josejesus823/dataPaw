import { passwordsMatch, isValidEmail, buildBirthDateISO } from "./validators.js";

const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const countryCode = document.getElementById("country-code");

const birthDay = document.getElementById("birthDay");
const birthMonth = document.getElementById("birthMonth");
const birthYear = document.getElementById("birthYear");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

const cancelButton = document.querySelector(".btn-secondary");

cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = '../Home/home.html';
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!passwordsMatch(password.value, confirmPassword.value)) {
    showMessage("Passwords do not match", "error");
    return;
  }
  if (!isValidEmail(emailInput.value.trim())) {
    showMessage("Invalid email", "error");
    return;
  }

  const existingUser = UserService.findUserByEmail(emailInput.value.trim());
  if (existingUser) {
    showMessage("This email is already registered", "error");
    return;
  }

  const dateOfBirth = buildBirthDateISO(
    birthDay?.value?.trim(),
    birthMonth?.value,
    birthYear?.value?.trim()
  );

  const userData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: `${countryCode.value}${phoneInput.value.trim()}`,
    dateOfBirth: dateOfBirth || null,
    password: password.value,
    role: 'user'
  };

  try {
    const newUser = UserService.createUser(userData);
    showMessage("Registration successful! Redirecting to login...", "success");
    
    setTimeout(() => {
      window.location.href = '../Sign-in/index.html';
    }, 2000);
  } catch (err) {
    showMessage("Error creating user", "error");
    console.error(err);
  }
});

function showMessage(message, type) {
  const messageDiv = document.getElementById('message') || createMessageDiv();
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

function createMessageDiv() {
  const messageDiv = document.createElement('div');
  messageDiv.id = 'message';
  messageDiv.className = 'message';
  messageDiv.style.display = 'none';
  
  const form = document.getElementById('signupForm');
  form.parentNode.insertBefore(messageDiv, form);
  
  return messageDiv;
}
