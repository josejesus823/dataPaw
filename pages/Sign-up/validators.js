export function passwordsMatch(password1, password2) {
  return password1 === password2;
}

export function isValidEmail(email) {
  return typeof email === "string" && email.includes("@");
}

export function buildBirthDateISO(dd, mm, yyyy) {
  if (!dd || !mm || !yyyy) return "";
  const day = dd.padStart(2, "0");
  return `${yyyy}-${mm}-${day}`;
}
