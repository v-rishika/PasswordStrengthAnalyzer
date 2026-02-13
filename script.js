const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strength");
const resetBtn = document.getElementById("resetBtn");
const togglePassword = document.getElementById("togglePassword");
const strengthFill = document.getElementById("strength-fill");
const guessRiskText = document.getElementById("guessRisk");

const commonPasswords = [
  "password",
  "123456",
  "12345678",
  "qwerty",
  "admin",
  "welcome",
  "letmein",
  "abc123"
];

const lengthCheck = document.getElementById("length");
const uppercaseCheck = document.getElementById("uppercase");
const numberCheck = document.getElementById("number");
const specialCheck = document.getElementById("special");


togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.textContent = isHidden ? "🙈" : "👁️";
});


resetBtn.addEventListener("click", () => {
  passwordInput.value = "";
  strengthText.textContent = "Strength:";
  strengthText.style.color = "#e0e0e0";
  strengthFill.style.width = "0%";
  strengthFill.style.background = "#ff4d4d";
  guessRiskText.textContent = "Chance of password being guessed:";

  resetChecklist();
});

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;

  if (password.length === 0) {
    strengthText.textContent = "Strength:";
    strengthText.style.color = "#e0e0e0";
    strengthFill.style.width = "0%";
    strengthFill.style.background = "#ff4d4d";
    guessRiskText.textContent = "Chance of password being guessed:";
    resetChecklist();
    return;
  }

  let score = 0;

  if (password.length >= 10) {
    markValid(lengthCheck);
    score++;
  } else {
    markInvalid(lengthCheck);
  }

  if (/[A-Z]/.test(password)) {
    markValid(uppercaseCheck);
    score++;
  } else {
    markInvalid(uppercaseCheck);
  }

  if (/[0-9]/.test(password)) {
    markValid(numberCheck);
    score++;
  } else {
    markInvalid(numberCheck);
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    markValid(specialCheck);
    score++;
  } else {
    markInvalid(specialCheck);
  }

  updateStrength(score, password);
});




function markValid(element) {
  element.classList.add("valid");
  element.textContent = "✔ " + element.textContent.slice(2);
}

function markInvalid(element) {
  element.classList.remove("valid");
  element.textContent = "✖ " + element.textContent.slice(2);
}

function resetChecklist() {
  [lengthCheck, uppercaseCheck, numberCheck, specialCheck].forEach(item => {
    item.classList.remove("valid");
    item.textContent = "✖ " + item.textContent.slice(2);
  });
}

function containsCommonPattern(password) {
  const lowerPass = password.toLowerCase();
  return commonPasswords.some(common =>
    lowerPass.includes(common)
  );
}



function isOnlyNumbers(password) {
  return /^[0-9]+$/.test(password);
}

function updateStrength(score, password) {

  if (containsCommonPattern(password)) {
    strengthText.textContent = "Strength: Weak (Common Pattern Detected)";
    strengthText.style.color = "#ff4d4d";
    strengthFill.style.width = "20%";
    strengthFill.style.background = "#ff4d4d";
    guessRiskText.textContent = "Chance of password being guessed: HIGH (common pattern detected)";
    return;
  }

  if (isOnlyNumbers(password)) {
    strengthText.textContent = "Strength: Weak";
    strengthText.style.color = "#ff4d4d";
    strengthFill.style.width = "20%";
    strengthFill.style.background = "#ff4d4d";
    guessRiskText.textContent = "Chance of password being guessed: HIGH";
    return;
  }

  if (score <= 1) {
    strengthText.textContent = "Strength: Weak";
    strengthText.style.color = "#ff4d4d";
    strengthFill.style.width = "25%";
    strengthFill.style.background = "#ff4d4d";
    guessRiskText.textContent = "Chance of password being guessed: HIGH";
  } 
  else if (score === 2 || score === 3) {
    strengthText.textContent = "Strength: Medium";
    strengthText.style.color = "#ffaa00";
    strengthFill.style.width = "60%";
    strengthFill.style.background = "#ffaa00";
    guessRiskText.textContent = "Chance of password being guessed: MODERATE";
  } 
  else {
    strengthText.textContent = "Strength: Strong";
    strengthText.style.color = "#00ffaa";
    strengthFill.style.width = "100%";
    strengthFill.style.background = "#00ffaa";
    guessRiskText.textContent = "Chance of password being guessed: LOW";
  }
}
