const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const revealItems = document.querySelectorAll(".reveal");
const statNumbers = document.querySelectorAll(".stats-grid strong");
const hero = document.querySelector(".hero");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const handleHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

handleHeader();
window.addEventListener("scroll", handleHeader, { passive: true });

const handleHeroDepth = () => {
  if (!hero || prefersReducedMotion) return;
  const shift = Math.min(window.scrollY * 0.08, 28);
  hero.style.setProperty("--hero-shift", `${shift}px`);
};

handleHeroDepth();
window.addEventListener("scroll", handleHeroDepth, { passive: true });

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  header.classList.toggle("nav-active", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    header.classList.remove("nav-active");
    document.body.classList.remove("nav-open");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("active", "is-visible"));
}

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const animateStat = (item) => {
    const original = item.textContent.trim();
    const target = original.includes("10") ? 10 : original.includes("7") ? 7 : null;
    if (!target || item.dataset.animated === "true") return;

    item.dataset.animated = "true";
    let current = 0;
    const steps = 26;
    const increment = target / steps;

    const tick = () => {
      current += increment;
      const value = Math.min(target, Math.round(current));
      item.textContent = original.includes("mil") ? `+${value} mil` : `+${value}`;

      if (value < target) {
        requestAnimationFrame(tick);
      } else {
        item.textContent = original;
      }
    };

    tick();
  };

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statNumbers.forEach(animateStat);
          statObserver.disconnect();
        }
      });
    },
    { threshold: 0.35 }
  );

  const statsGrid = document.querySelector(".stats-grid");
  if (statsGrid) statObserver.observe(statsGrid);
}
