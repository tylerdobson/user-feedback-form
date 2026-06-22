// Select page elements
const form = document.getElementById("feedback-form");
const formSection = document.getElementById("form-section");
const nameInput = document.getElementById("user-name");
const emailInput = document.getElementById("email");
const comments = document.getElementById("comments");
const charCount = document.getElementById("char-count");
const tooltip = document.getElementById("tooltip");
const feedbackDisplay = document.getElementById("feedback-display");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const commentsError = document.getElementById("comments-error");

// Character count (delegated input event)
form.addEventListener("input", function (event) {
  if (event.target === comments) {
    charCount.textContent = comments.value.length + " / 300";
  }
});

// Show tooltip on hover
form.addEventListener("mouseover", function (event) {
  if (event.target.dataset.tooltip) {
    tooltip.textContent = event.target.dataset.tooltip;
    tooltip.style.display = "block";
  }
});

// Hide tooltip
form.addEventListener("mouseout", function (event) {
  if (event.target.dataset.tooltip) {
    tooltip.style.display = "none";
  }
});

// Move tooltip with the cursor
form.addEventListener("mousemove", function (event) {
  tooltip.style.left = event.pageX + 15 + "px";
  tooltip.style.top = event.pageY + 15 + "px";
});

// Keep form clicks from reaching the background
formSection.addEventListener("click", function (event) {
  event.stopPropagation();
});

// Background click hides tooltip
document.body.addEventListener("click", function () {
  tooltip.style.display = "none";
});

// Validate and submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const commentText = comments.value.trim();

  nameError.textContent = "";
  emailError.textContent = "";
  commentsError.textContent = "";

  let isValid = true;

  if (name === "") {
    nameError.textContent = "Name is required.";
    isValid = false;
  }
  if (email === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  }
  if (commentText === "") {
    commentsError.textContent = "Comments are required.";
    isValid = false;
  }

  if (!isValid) return;

  const entry = document.createElement("div");
  entry.classList.add("feedback-entry");
  entry.innerHTML =
    "<h3>" + name + "</h3>" +
    "<p><strong>Email:</strong> " + email + "</p>" +
    "<p><strong>Comments:</strong> " + commentText + "</p>";
  feedbackDisplay.appendChild(entry);

  form.reset();
  charCount.textContent = "0 / 300";
});
