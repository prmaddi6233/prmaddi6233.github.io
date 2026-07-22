// Progressive enhancement: reveal-on-scroll, mobile nav, nav shadow.
// Content is fully visible without JS; this only adds motion and the menu.

(function () {
  "use strict";

  // --- Reveal on scroll (staggered) ---
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
    // Fallback: if anything is still hidden after load, show it.
    window.addEventListener("load", () =>
      setTimeout(() => revealEls.forEach((el) => el.classList.add("visible")), 1200)
    );
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // --- Mobile nav ---
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  const closeMenu = () => {
    navLinks.classList.remove("open");
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  };
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // --- Nav border on scroll ---
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("nav--scrolled", window.scrollY > 20);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
