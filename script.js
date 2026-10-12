/* =========================================================
   NextGen Academy - script.js
   Sections: 1) Data  2) Helpers  3) Setup  4) Eligibility
             5) Fee Calculator  6) Admission  7) Contact
             8) Dark Mode (extra feature)
   ========================================================= */

/* ---------- 1) DATA ---------- */
// Monthly fee (in Rs.) for each course. Change a value here to change the fee everywhere.
const courseFees = {
  "Web Development": 5000,
  "Graphic Design": 4000,
  "AI Course": 7000,
  "Freelancing": 3500
};

/* ---------- 2) HELPERS ---------- */
const $ = (id) => document.getElementById(id);

// Format a number as Rs. 12,345
function rs(amount) {
  return "Rs. " + Math.round(amount).toLocaleString("en-PK");
}

// Show an error under a field and highlight it in red
function setError(inputId, message) {
  $(inputId).classList.add("invalid");
  $(inputId + "Err").textContent = message;
}

// Clear all errors inside a form
function clearErrors(form) {
  form.querySelectorAll(".invalid").forEach((el) => el.classList.remove("invalid"));
  form.querySelectorAll(".error").forEach((el) => (el.textContent = ""));
}

// Small reusable validators
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone = (v) => /^03\d{9}$/.test(v); // Pakistani mobile: 03XXXXXXXXX
const isValidName = (v) => /^[A-Za-z ]{3,}$/.test(v); // letters + spaces, min 3 chars

// Check marks field: must be a number from 0 to 100. Returns true if valid.
function validateMarks(inputId, value) {
  if (value === "") { setError(inputId, "Please enter your marks."); return false; }
  const n = Number(value);
  if (isNaN(n) || n < 0 || n > 100) { setError(inputId, "Marks must be between 0 and 100."); return false; }
  return true;
}

/* ---------- 3) SETUP: fill all course dropdowns ---------- */
document.querySelectorAll(".courseSelect").forEach((select) => {
  select.innerHTML = '<option value="">-- Select a course --</option>';
  for (const course in courseFees) {
    select.innerHTML += `<option value="${course}">${course}</option>`;
  }
});
$("year").textContent = new Date().getFullYear();

// Mobile menu open/close
$("menuBtn").addEventListener("click", () => $("navLinks").classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => $("navLinks").classList.remove("open"))
);

/* ---------- 4) ELIGIBILITY CHECKER ---------- */
$("eligibilityForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop page reload
  clearErrors(this);

  const name = $("eName").value.trim();
  const marksValue = $("eMarks").value.trim();
  const course = $("eCourse").value;
  let ok = true;

  if (!isValidName(name)) { setError("eName", "Enter a valid name (letters only, min 3 characters)."); ok = false; }
  if (!validateMarks("eMarks", marksValue)) ok = false;
  if (course === "") { setError("eCourse", "Please select a course."); ok = false; }
  if (!ok) return;

  const marks = Number(marksValue);
  let status, message, cssClass;

  // Main eligibility logic
  if (marks >= 70) {
    status = "🎉 Direct Admission";
    message = "Congratulations! You qualify for direct admission.";
    cssClass = "good";
  } else if (marks >= 50) {
    status = "✅ Eligible - Counselling Recommended";
    message = "You are eligible. We recommend a counselling session before joining.";
    cssClass = "warn";
  } else {
    status = "📞 Contact Admission Counsellor";
    message = "Your marks are below 50%. Please contact our admission counsellor for guidance.";
    cssClass = "bad";
  }

  const box = $("eligibilityResult");
  box.className = "result " + cssClass;
  box.innerHTML = `
    <h3>${status}</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Course:</strong> ${course}</p>
    <p><strong>Marks:</strong> ${marks}%</p>
    <p>${message}</p>`;
});

/* ---------- 5) FEE CALCULATOR ---------- */
$("feeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors(this);

  const course = $("fCourse").value;
  const monthsValue = $("fMonths").value.trim();
  const months = Number(monthsValue);
  let ok = true;

  if (course === "") { setError("fCourse", "Please select a course."); ok = false; }
  if (monthsValue === "" || !Number.isInteger(months) || months < 1 || months > 24) {
    setError("fMonths", "Enter whole months between 1 and 24."); ok = false;
  }
  if (!ok) return;

  const monthlyFee = courseFees[course];
  const originalFee = monthlyFee * months;

  // Discount rule: 6+ months = 10%, 3 to 5 months = 5%, otherwise 0%
  let discountPercent = 0;
  if (months >= 6) discountPercent = 10;
  else if (months >= 3) discountPercent = 5;

  const discountAmount = (originalFee * discountPercent) / 100;
  const finalFee = originalFee - discountAmount;

  const box = $("feeResult");
  box.className = "result good";
  box.innerHTML = `
    <h3>${course} - ${months} month(s)</h3>
    <div class="fee-line"><span>Monthly Fee</span><span>${rs(monthlyFee)}</span></div>
    <div class="fee-line"><span>Original Fee</span><span>${rs(originalFee)}</span></div>
    <div class="fee-line"><span>Discount (${discountPercent}%)</span><span>- ${rs(discountAmount)}</span></div>
    <div class="fee-line total"><span>Final Fee</span><span>${rs(finalFee)}</span></div>`;
});

/* ---------- 6) ADMISSION FORM ---------- */
$("admissionForm").addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors(this);

  const name = $("aName").value.trim();
  const father = $("aFather").value.trim();
  const email = $("aEmail").value.trim();
  const phone = $("aPhone").value.trim();
  const course = $("aCourse").value;
  const marks = $("aMarks").value.trim();
  let ok = true;

  if (!isValidName(name)) { setError("aName", "Enter a valid name (letters only)."); ok = false; }
  if (!isValidName(father)) { setError("aFather", "Enter a valid father's name."); ok = false; }
  if (!isValidEmail(email)) { setError("aEmail", "Enter a valid email address."); ok = false; }
  if (!isValidPhone(phone)) { setError("aPhone", "Phone must be 11 digits starting with 03."); ok = false; }
  if (course === "") { setError("aCourse", "Please select a course."); ok = false; }
  if (!validateMarks("aMarks", marks)) ok = false;
  if (!ok) return;

  const ref = "NGA-" + Math.floor(1000 + Math.random() * 9000); // random reference number
  const box = $("admissionResult");
  box.classList.remove("hidden");
  box.innerHTML = `
    <h3>✅ Application Submitted!</h3>
    <p>Thank you, <strong>${name}</strong>. Your application for <strong>${course}</strong> has been received.</p>
    <p>Reference No: <strong>${ref}</strong></p>
    <p>Our team will contact you on ${phone} soon.</p>`;
  this.reset();
  box.scrollIntoView({ behavior: "smooth", block: "center" });
});

/* ---------- 7) CONTACT FORM ---------- */
$("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors(this);

  const name = $("cName").value.trim();
  const email = $("cEmail").value.trim();
  const message = $("cMessage").value.trim();
  let ok = true;

  if (!isValidName(name)) { setError("cName", "Enter a valid name."); ok = false; }
  if (!isValidEmail(email)) { setError("cEmail", "Enter a valid email address."); ok = false; }
  if (message.length < 10) { setError("cMessage", "Message must be at least 10 characters."); ok = false; }
  if (!ok) return;

  const box = $("contactResult");
  box.classList.remove("hidden");
  box.innerHTML = `<h3>✅ Message sent!</h3><p>Thanks ${name}, we will reply to ${email} shortly.</p>`;
  this.reset();
});

/* ---------- 8) EXTRA FEATURE: DARK MODE (saved in localStorage) ---------- */
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  $("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
}

// On page load, use the saved theme (if any)
applyTheme(localStorage.getItem("theme") || "light");

$("themeToggle").addEventListener("click", () => {
  const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("theme", newTheme); // remember choice after refresh
  applyTheme(newTheme);
});
