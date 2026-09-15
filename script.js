const yearEls = document.querySelectorAll("#year, .year");
yearEls.forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const header = document.getElementById("siteHeader");
if (header) {
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  const setMenu = (open) => {
    menuToggle.classList.toggle("is-open", open);
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  menuToggle.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setMenu(false);
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
  });
}

const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-in"));
}

const transitionEl = document.querySelector(".transition");
function leavePage(url) {
  document.documentElement.classList.add("is-leaving");
  transitionEl.classList.add("is-active");
  setTimeout(() => {
    window.location.assign(url);
  }, 420);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#")) return;
  if (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) return;
  if (link.target === "_blank") return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  leavePage(href);
});

function filterWork(category, btn) {
  const items = document.querySelectorAll(".work-grid [data-type]");
  items.forEach((item) => {
    const type = item.dataset.type;
    item.classList.toggle("is-hidden", category !== "all" && type !== category);
  });
  const pressed = document.querySelectorAll(".filter-bar .filter-btn");
  pressed.forEach((b) => {
    const active = b === btn;
    b.classList.toggle("is-active", active);
    b.setAttribute("aria-pressed", String(active));
  });
}

const cases = {
  brand: {
    kicker: "Case Study / Branding",
    title: "Brand Identity",
    desc: "A complete identity system built to give the brand presence, personality and staying power.",
    image: "brand identity (2).jpeg",
    alt: "Brand identity system designed by Zed",
    summary:
      "Identity work that goes beyond a mark. This project covered logo design, colour and typography, logo usage rules and application — all engineered to keep the brand consistent across print, screen and social.",
    tags: ["Identity", "Logo", "Branding"],
  },
  ui: {
    kicker: "Case Study / UI Design",
    title: "Website UI",
    desc: "A clean, conversion-minded interface where structure, clarity and hierarchy do the heavy lifting.",
    image: "website ui (2).jpeg",
    alt: "Website interface design by Zed",
    summary:
      "Interface design focused on how people actually move through a page. Grid, type hierarchy and spacing are used deliberately so the content breathes and every next step feels obvious.",
    tags: ["Interface", "Web", "UI/UX"],
  },
  social: {
    kicker: "Case Study / Social & Campaign",
    title: "Social Media",
    desc: "Stop-and-stare feed systems and campaign visuals that speak one consistent language.",
    image: "social media design.jpeg",
    alt: "Social media campaign design by Zed",
    summary:
      "A social system designed to be recognisable at a glance. Templates, posters and ad creatives that stay flexible week-to-week while the brand stays unmistakable in the feed.",
    tags: ["Campaign", "Content", "Social"],
  },
  photo: {
    kicker: "Photography / Motion",
    title: "Motion & Speed",
    desc: "A personal frame study exploring speed, light and freezing a moment that rarely stands still.",
    image: "F1.jpg",
    alt: "Photography frame by Zed",
    summary:
      "An exercise in capturing energy — fast machines, long light, and finding the graphic quality in a single frozen moment.",
    tags: ["Photography", "Motion"],
  },
  "photo-2": {
    kicker: "Photography / Frame Study",
    title: "Frame Study",
    desc: "Everyday subjects studied as pure composition — shape, light and balance.",
    image: "20241107_190929.jpg",
    alt: "Photography frame study by Zed",
    summary:
      "Composition practice built from observation. The brief was simple: treat an ordinary moment like a poster — frame it, simplify it, make it hold.",
    tags: ["Photography", "Composition"],
  },
};

function loadCase() {
  const title = document.getElementById("caseTitle");
  const kicker = document.getElementById("caseKicker");
  const desc = document.getElementById("caseDesc");
  const image = document.getElementById("caseImage");
  const summary = document.getElementById("caseSummary");
  const tags = document.getElementById("caseTags");
  if (!title || !image) return;

  const params = new URLSearchParams(window.location.search);
  const type = params.get("type");
  const data = cases[type] || cases.brand;

  title.textContent = data.title;
  kicker.textContent = data.kicker;
  desc.textContent = data.desc;
  image.src = data.image;
  image.alt = data.alt;
  if (summary) summary.textContent = data.summary;
  if (tags) {
    tags.innerHTML = "";
    data.tags.forEach((tag) => {
      const li = document.createElement("li");
      li.textContent = tag;
      tags.appendChild(li);
    });
  }
  document.title = data.title + " — Zed | Graphic Designer";
}

function sendMessage() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const response = document.getElementById("response");
  if (!response) return;

  const valid = name && email && message;
  const filled = valid && name.value.trim() && email.value.trim() && message.value.trim();
  const emailOk = valid && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

  if (filled && emailOk) {
    response.textContent = "Thanks — your message is on its way.";
    response.classList.add("is-success");
    response.classList.remove("is-error");
    name.value = "";
    email.value = "";
    message.value = "";
  } else {
    response.textContent = filled && !emailOk ? "Please enter a valid email." : "Please fill in all fields.";
    response.classList.add("is-error");
    response.classList.remove("is-success");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.body.classList.contains("page-case")) loadCase();
});