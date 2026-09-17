// PERSONALIZE AQUI: coloque apenas números, com DDI + DDD + telefone.
// Exemplo: 5532999999999
const WHATSAPP_NUMBER = "5500000000000";
const WHATSAPP_MESSAGE =
  "Olá, Sascha! Vi seu site e quero saber mais sobre o treinamento personalizado.";

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
document
  .querySelectorAll(".js-whatsapp")
  .forEach((link) => (link.href = whatsappUrl));

const header = document.querySelector(".header");
window.addEventListener("scroll", () =>
  header.classList.toggle("scrolled", window.scrollY > 100),
);

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");
function toggleMenu(forceClose = false) {
  const open = forceClose ? false : !nav.classList.contains("open");
  nav.classList.toggle("open", open);
  menuButton.classList.toggle("active", open);
  menuButton.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}
menuButton.addEventListener("click", () => toggleMenu());
nav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => toggleMenu(true)));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count);
      const duration = 1100;
      const start = performance.now();
      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent =
          Math.round(target * eased) + (target === 100 ? "%" : "");
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      counterObserver.unobserve(element);
    });
  },
  { threshold: 0.7 },
);
counters.forEach((counter) => counterObserver.observe(counter));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (event) => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
  glow.style.opacity = "1";
});

document.getElementById("year").textContent = new Date().getFullYear();
