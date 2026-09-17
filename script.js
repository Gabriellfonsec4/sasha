// ======================================================
// CONFIGURAÇÃO DO WHATSAPP
// Coloque: 55 + DDD + número
// Exemplo: 5521999999999
// ======================================================

const WHATSAPP_NUMBER = "5500000000000";

const WHATSAPP_MESSAGE =
  "Olá, Sascha! Vi seu site e quero saber mais sobre o treinamento personalizado.";

// Cria o link do WhatsApp

const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

document.querySelectorAll(".js-whatsapp").forEach((link) => {
  link.href = whatsappUrl;
});

// ======================================================
// CABEÇALHO FIXO AO ROLAR A PÁGINA
// ======================================================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 100);
});

// ======================================================
// MENU MOBILE
// ======================================================

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

function toggleMenu(forceClose = false) {
  const menuEstaAberto = nav.classList.contains("open");

  const abrirMenu = forceClose ? false : !menuEstaAberto;

  nav.classList.toggle("open", abrirMenu);
  menuButton.classList.toggle("active", abrirMenu);

  menuButton.setAttribute("aria-expanded", String(abrirMenu));

  document.body.classList.toggle("menu-open", abrirMenu);
}

// Abre ou fecha o menu

menuButton.addEventListener("click", () => {
  toggleMenu();
});

// Fecha o menu quando algum item for selecionado

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu(true);
  });
});

// Fecha o menu pressionando a tecla ESC

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    toggleMenu(true);
  }
});

// Fecha o menu caso a tela volte para o tamanho de computador

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    toggleMenu(true);
  }
});

// ======================================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// ======================================================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// ======================================================
// CONTADORES ANIMADOS
// ======================================================

const counters = document.querySelectorAll("[data-count]");

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const element = entry.target;
      const target = Number(element.dataset.count);

      const duration = 1100;
      const start = performance.now();

      function updateCounter(currentTime) {
        const progress = Math.min((currentTime - start) / duration, 1);

        const eased = 1 - Math.pow(1 - progress, 3);

        const currentNumber = Math.round(target * eased);

        element.textContent = currentNumber + (target === 100 ? "%" : "");

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      }

      requestAnimationFrame(updateCounter);
      counterObserver.unobserve(element);
    });
  },
  {
    threshold: 0.7,
  },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// ======================================================
// EFEITO DE LUZ NO COMPUTADOR
// ======================================================

const glow = document.querySelector(".cursor-glow");

if (glow) {
  window.addEventListener("mousemove", (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.style.opacity = "1";
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
}

// ======================================================
// ANO AUTOMÁTICO NO RODAPÉ
// ======================================================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
