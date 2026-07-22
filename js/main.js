// Scroll-reveal, mobile nav, and nav hide-on-scroll.

(function () {
  "use strict";

  // --- Reveal on scroll ---
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // --- Mobile nav ---
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    })
  );

  // --- Experience tabs ---
  const tabList = document.querySelector(".tabs__list");
  if (tabList) {
    const tabs = Array.from(tabList.querySelectorAll(".tabs__tab"));
    const panels = Array.from(document.querySelectorAll(".tabs__panel"));
    const activate = (index) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.classList.toggle("is-active", selected);
        tab.setAttribute("aria-selected", String(selected));
        panels[i].classList.toggle("is-active", selected);
        panels[i].hidden = !selected;
      });
      tabList.style.setProperty("--tab-index", index);
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => activate(i));
      tab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight") {
          e.preventDefault();
          const next = (i + 1) % tabs.length;
          tabs[next].focus();
          activate(next);
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
          e.preventDefault();
          const prev = (i - 1 + tabs.length) % tabs.length;
          tabs[prev].focus();
          activate(prev);
        }
      });
    });
  }

  // --- Nav hide on scroll down, show on scroll up ---
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      nav.classList.toggle("nav--scrolled", y > 20);
      if (y > lastY && y > 200 && !navLinks.classList.contains("open")) {
        nav.classList.add("nav--hidden");
      } else {
        nav.classList.remove("nav--hidden");
      }
      lastY = y;
    },
    { passive: true }
  );
})();
