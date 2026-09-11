// Team registration form -- dynamic member rows, inline validation,
// AJAX submit to Formspree with loading/success/error states.
(function () {
  const form = document.getElementById("register-form");
  if (!form) return;

  const teamSizeSelect = document.getElementById("team-size");
  const memberRows = document.getElementById("member-rows");
  const submitBtn = document.getElementById("submit-btn");
  const submitBtnLabel = document.getElementById("submit-btn-label");
  const formPanel = document.getElementById("form-panel");
  const successPanel = document.getElementById("form-success");
  const errorPanel = document.getElementById("form-error");
  const retryBtn = document.getElementById("form-retry");

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function fieldError(input, message) {
    clearFieldError(input);
    input.classList.add("border-red-500", "focus:ring-red-500");
    const p = document.createElement("p");
    p.className = "field-error text-red-400 text-xs mt-1";
    p.textContent = message;
    input.insertAdjacentElement("afterend", p);
  }

  function clearFieldError(input) {
    input.classList.remove("border-red-500", "focus:ring-red-500");
    const next = input.nextElementSibling;
    if (next && next.classList.contains("field-error")) next.remove();
  }

  function validateRequired(input, label) {
    if (!input.value.trim()) {
      fieldError(input, `${label} is required.`);
      return false;
    }
    clearFieldError(input);
    return true;
  }

  function validateEmail(input, label) {
    if (!input.value.trim()) {
      fieldError(input, `${label} is required.`);
      return false;
    }
    if (!EMAIL_RE.test(input.value.trim())) {
      fieldError(input, `Enter a valid email address.`);
      return false;
    }
    clearFieldError(input);
    return true;
  }

  function renderMemberRows() {
    const size = parseInt(teamSizeSelect.value, 10);
    const existing = memberRows.querySelectorAll("[data-member-row]");
    const existingValues = Array.from(existing).map((row) => ({
      name: row.querySelector('[data-field="member-name"]').value,
      email: row.querySelector('[data-field="member-email"]').value,
    }));

    memberRows.innerHTML = "";

    for (let i = 0; i < size; i++) {
      const prev = existingValues[i] || { name: "", email: "" };
      const row = document.createElement("div");
      row.dataset.memberRow = "";
      row.className = "grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3";
      row.innerHTML = `
        <div>
          <input type="text" data-field="member-name" placeholder="Member ${i + 1} name"
            value="${prev.name.replace(/"/g, "&quot;")}"
            class="w-full bg-black/40 border border-neon/30 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon" />
        </div>
        <div>
          <input type="email" data-field="member-email" placeholder="Member ${i + 1} email"
            value="${prev.email.replace(/"/g, "&quot;")}"
            class="w-full bg-black/40 border border-neon/30 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon" />
        </div>
      `;
      memberRows.appendChild(row);
    }

    memberRows.querySelectorAll("input").forEach((input) => {
      input.addEventListener("blur", () => {
        const label = input.dataset.field === "member-email" ? "Member email" : "Member name";
        input.dataset.field === "member-email"
          ? validateEmail(input, label)
          : validateRequired(input, label);
      });
    });
  }

  teamSizeSelect.addEventListener("change", renderMemberRows);
  renderMemberRows();

  // Blur validation for static fields.
  const teamNameInput = document.getElementById("team-name");
  const contactEmailInput = document.getElementById("contact-email");
  teamNameInput.addEventListener("blur", () => validateRequired(teamNameInput, "Team name"));
  contactEmailInput.addEventListener("blur", () => validateEmail(contactEmailInput, "Contact email"));

  function validateAll() {
    let valid = true;
    if (!validateRequired(teamNameInput, "Team name")) valid = false;
    if (!validateEmail(contactEmailInput, "Contact email")) valid = false;

    memberRows.querySelectorAll("[data-member-row]").forEach((row) => {
      const nameInput = row.querySelector('[data-field="member-name"]');
      const emailInput = row.querySelector('[data-field="member-email"]');
      if (!validateRequired(nameInput, "Member name")) valid = false;
      if (!validateEmail(emailInput, "Member email")) valid = false;
    });

    return valid;
  }

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle("opacity-60", isLoading);
    submitBtn.classList.toggle("cursor-not-allowed", isLoading);
    submitBtnLabel.textContent = isLoading ? "SENDING..." : "REGISTER TEAM";
  }

  function showError() {
    errorPanel.classList.remove("hidden");
    formPanel.classList.remove("hidden");
    successPanel.classList.add("hidden");
    errorPanel.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function showSuccess() {
    formPanel.classList.add("hidden");
    errorPanel.classList.add("hidden");
    successPanel.classList.remove("hidden");
    if (window.playUiSound) window.playUiSound("success");
    if (window.incrementTeamCounter) window.incrementTeamCounter();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorPanel.classList.add("hidden");

    if (!validateAll()) {
      form.querySelector(".border-red-500")?.focus();
      return;
    }

    const members = Array.from(memberRows.querySelectorAll("[data-member-row]")).map((row) => ({
      name: row.querySelector('[data-field="member-name"]').value.trim(),
      email: row.querySelector('[data-field="member-email"]').value.trim(),
    }));

    const payload = {
      teamName: teamNameInput.value.trim(),
      teamSize: teamSizeSelect.value,
      members,
      projectIdea: document.getElementById("project-idea").value.trim(),
      contactEmail: contactEmailInput.value.trim(),
    };

    setLoading(true);

    try {
      const res = await fetch(SITE_CONFIG.FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showSuccess();
      } else {
        showError();
      }
    } catch (err) {
      showError();
    } finally {
      setLoading(false);
    }
  });

  retryBtn?.addEventListener("click", () => {
    errorPanel.classList.add("hidden");
  });
})();
