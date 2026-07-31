const PASSWORD = "05.08.2016";

const views = {
  login: document.getElementById("login-view"),
  validation: document.getElementById("validation-view"),
  access: document.getElementById("access-view"),
  certificate: document.getElementById("certificate-view")
};

const loginForm = document.getElementById("login-form");
const dateInput = document.getElementById("validation-date");
const loginMessage = document.getElementById("login-message");
const validationLog = document.getElementById("validation-log");
const openCertificateButton = document.getElementById("open-certificate");
const anniversaryButton = document.getElementById("anniversary-button");
const anniversaryMessage = document.getElementById("anniversary-message");

function showView(name) {
  Object.values(views).forEach((view) => view.classList.remove("active"));
  views[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalizeDate(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
}

dateInput.addEventListener("input", (event) => {
  event.target.value = normalizeDate(event.target.value);
  loginMessage.textContent = "";
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (dateInput.value.trim() !== PASSWORD) {
    loginMessage.textContent = "Authentication failed. Certificate access denied.";
    dateInput.focus();
    return;
  }

  showView("validation");
  runValidation();
});

async function runValidation() {
  const steps = [
    ["Authenticating credentials", "Credentials verified"],
    ["Building certificate chain", "Trusted Root found"],
    ["Checking certificate integrity", "Signature valid"],
    ["Reviewing revocation status", "Certificate not revoked"],
    ["Running 10-year infrastructure audit", "Audit passed"],
    ["Loading secure document", "Certificate ready"]
  ];

  validationLog.innerHTML = "";

  for (const [task, result] of steps) {
    await addLogLine(`> ${task}...`);
    await wait(420);
    await addLogLine(`<span class="ok">✓ ${result}</span>`);
    await wait(280);
  }

  await wait(450);
  showView("access");
}

function addLogLine(html) {
  const line = document.createElement("div");
  line.className = "log-line";
  line.innerHTML = html;
  validationLog.appendChild(line);
  validationLog.scrollTop = validationLog.scrollHeight;
  return Promise.resolve();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

openCertificateButton.addEventListener("click", () => {
  showView("certificate");
});

anniversaryButton.addEventListener("click", () => {
  const isHidden = anniversaryMessage.hidden;
  anniversaryMessage.hidden = !isHidden;
  anniversaryButton.textContent = isHidden
    ? "Close anniversary attachment"
    : "Open anniversary attachment";

  if (isHidden) {
    anniversaryMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
