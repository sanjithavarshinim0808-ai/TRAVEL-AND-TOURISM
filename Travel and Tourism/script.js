const searchInput = document.querySelector("#destination-search");
const destinationCards = document.querySelectorAll(".destination-card");
const emptyState = document.querySelector("#empty-state");
const enquiryForm = document.querySelector("#enquiry-form");
const formMessage = document.querySelector("#form-message");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCards = 0;

  destinationCards.forEach((card) => {
    const matches = card.dataset.search.includes(searchTerm);
    card.hidden = !matches;
    if (matches) visibleCards += 1;
  });

  emptyState.hidden = visibleCards > 0;
});

enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  if (!enquiryForm.checkValidity()) {
    enquiryForm.reportValidity();
    return;
  }

  const travellerName = enquiryForm.elements.name.value.trim();
  formMessage.textContent = `Thanks, ${travellerName}! Your enquiry is ready. We’ll be in touch soon.`;
  enquiryForm.reset();
});

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  navLinks.classList.toggle("is-open", !isExpanded);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
});
