import { createOwner } from "./api.js";
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
    alert("Passwords do not match");
    return;
  }
  if (!isValidEmail(emailInput.value.trim())) {
    alert("Invalid email");
    return;
  }

  const dateOfBirth = buildBirthDateISO(
    birthDay?.value?.trim(),
    birthMonth?.value,
    birthYear?.value?.trim()
  );

  const payload = {
    ownerName: nameInput.value.trim(),
    ownerEmail: emailInput.value.trim(),
    ownerPhone: `${countryCode.value}${phoneInput.value.trim()}`,
    dateOfBirth: dateOfBirth || null,
    password: password.value,
  };

  try {
    const created = await createOwner(payload);
    alert("Sign up successful");
    console.log("Created:", created);
    form.reset();
  } catch (err) {
    alert(err.message || "Error creating owner");
    console.error(err);
  }
});
