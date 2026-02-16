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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!passwordsMatch(password.value, confirmPassword.value)) {
    showMessage("Las contraseñas no coinciden", "error");
    return;
  }
  if (!isValidEmail(emailInput.value.trim())) {
    showMessage("Email inválido", "error");
    return;
  }

  const existingUser = UserService.findUserByEmail(emailInput.value.trim());
  if (existingUser) {
    showMessage("Este email ya está registrado", "error");
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
    showMessage("Registro exitoso! Redirigiendo al login...", "success");
    
    setTimeout(() => {
      window.location.href = '../Sign-in/index.html';
    }, 2000);
  } catch (err) {
    showMessage("Error al crear el usuario", "error");
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
