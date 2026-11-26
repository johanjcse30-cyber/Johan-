const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link, .nav-contact");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("open", !isExpanded);
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.classList.remove("error");

  const fields = [...contactForm.querySelectorAll("input, textarea")];
  const invalidField = fields.find((field) => {
    const isEmail = field.type === "email";
    const validEmail = !isEmail || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
    const isValid = field.value.trim() !== "" && validEmail;
    field.setAttribute("aria-invalid", String(!isValid));
    return !isValid;
  });

  if (invalidField) {
    formStatus.textContent = invalidField.type === "email" && invalidField.value.trim()
      ? "Please enter a valid email address."
      : "Please complete all fields before submitting.";
    formStatus.classList.add("error");
    invalidField.focus();
    return;
  }

  formStatus.textContent = "Thanks! Your details are valid. This demo form doesn’t send or store messages.";
  contactForm.reset();
  fields.forEach((field) => field.removeAttribute("aria-invalid"));
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
