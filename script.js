document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const msgInput = document.getElementById("contact-message");
  const charCount = document.getElementById("char-count");
  const submitBtn = document.getElementById("submit-btn");
  const successMsg = document.getElementById("form-success");

  const MIN_MSG_LENGTH = 20;
  const MAX_MSG_LENGTH = 500;

  function showError(input, message) {
    const errorEl = document.getElementById(`${input.id}-error`);
    errorEl.textContent = message;
    errorEl.style.display = "block";
    input.classList.add("input-error");
    input.classList.remove("input-ok");
  }

  function clearError(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    errorEl.textContent = "";
    errorEl.style.display = "none";
    input.classList.remove("input-error");
    input.classList.add("input-ok");
  }

  function validateName() {
    const value = nameInput.value.trim();
    if (value.length === 0) {
      showError(nameInput, "Name is required.");
      return false;
    }
    if (value.length < 2) {
      showError(nameInput, "Name must be at least 2 characters.");
      return false;
    }
    clearError(nameInput);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.length === 0) {
      showError(emailInput, "Email is required.");
      return false;
    }
    if (!emailPattern.test(value)) {
      showError(emailInput, "Please enter a valid email address.");
      return false;
    }
    clearError(emailInput);
    return true;
  }

  function validateMessage() {
    const value = msgInput.value.trim();
    if (value.length === 0) {
      showError(msgInput, "Message is required.");
      return false;
    }
    if (value.length < MIN_MSG_LENGTH) {
      showError(
        msgInput,
        `Message must be at least ${MIN_MSG_LENGTH} characters.`
      );
      return false;
    }
    clearError(msgInput);
    return true;
  }

  msgInput.addEventListener("input", () => {
    const remaining = MAX_MSG_LENGTH - msgInput.value.length;
    charCount.textContent = `${msgInput.value.length} / ${MAX_MSG_LENGTH}`;

    if (msgInput.value.length > 0) {
      validateMessage();
    }
  });

  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  msgInput.addEventListener("blur", validateMessage);

  nameInput.addEventListener("input", () => {
    if (nameInput.classList.contains("input-error")) validateName();
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("input-error")) validateEmail();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      submitBtn.classList.add("btn-shake");
      submitBtn.addEventListener(
        "animationend",
        () => {
          submitBtn.classList.remove("btn-shake");
        },
        { once: true }
      );
      return;
    }

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      charCount.textContent = `0 / ${MAX_MSG_LENGTH}`;
      charCount.style.color = "#9ca3af";

      [nameInput, emailInput, msgInput].forEach((el) =>
        el.classList.remove("input-ok")
      );

      successMsg.style.display = "block";
      form.style.display = "none";

      submitBtn.textContent = "Send Message";
      submitBtn.disabled = false;
    }, 1200);
  });
});
