// =========================
// LOADER / PAGE TRANSITION
// =========================

function createLoaderButton() {
  let loader = document.querySelector(".transition");

  if (!loader) {
    loader = document.createElement("div");
    loader.className = "transition";
    document.body.appendChild(loader);
  }

  return loader;
}

window.addEventListener("load", () => {
  const loader = document.querySelector(".transition");
  if (loader) loader.classList.remove("active");
});

function pageTransition(url) {
  const loader = createLoaderButton();

  loader.classList.add("active");

  setTimeout(() => {
    window.location.href = url;
  }, 450);
}

function goBack() {
  const loader = createLoaderButton();

  loader.classList.add("active");

  setTimeout(() => history.back(), 300);
}

function goWork() {
  pageTransition("work.html");
}

// =========================
// SCROLL TO SECTION
// =========================
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });

    // auto close menu on mobile
    const nav = document.getElementById("nav");
    if (nav) nav.classList.remove("active");
  }
}

// =========================
// MENU TOGGLE (FIXED)
// =========================
function toggleMenu() {
  const nav = document.getElementById("nav");
  if (nav) {
    nav.classList.toggle("active");
  }
}

// close menu when clicking links
document.addEventListener("click", (e) => {
  const nav = document.getElementById("nav");

  if (e.target.closest("nav a") && nav) {
    nav.classList.remove("active");
  }

  // close menu when clicking outside
  if (nav && !e.target.closest("nav") && !e.target.closest(".menu-toggle")) {
    nav.classList.remove("active");
  }
});

// =========================
// CONTACT FORM
// =========================
function sendMessage() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const response = document.getElementById("response");

  if (!response) return;

  if (name?.value && email?.value && message?.value) {
    response.innerText = "Message sent successfully ✔";
    response.style.color = "green";

    name.value = "";
    email.value = "";
    message.value = "";
  } else {
    response.innerText = "Please fill all fields";
    response.style.color = "red";
  }
}

// =========================
// MAGNETIC EFFECT (MOBILE SAFE)
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".magnetic");

  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  items.forEach(el => {
    if (isTouch) return; // disable on mobile for stability

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();

      const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.1;

      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0,0)";
    });
  });
});

// =========================
// WORK FILTER
// =========================
function filterWork(category) {
  const items = document.querySelectorAll(".work-card");

  items.forEach(item => {
    const type = item.getAttribute("data-type");

    if (!category || category === "all") {
      item.style.display = "block";
    } else {
      item.style.display = type === category ? "block" : "none";
    }
  });
}

// =========================
// CASE STUDY OPEN
// =========================
function openCase(type) {
  pageTransition("case.html?type=" + type);
}

// =========================
// GLOBAL LINK HANDLER
// =========================
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-link]");
  if (!btn) return;

  const url = btn.getAttribute("data-link");
  if (url) pageTransition(url);
});
// =========================
// KEYBOARD ACCESS
// =========================
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;

  const target = e.target.closest(".menu-toggle, .card, .work-card");
  if (!target) return;

  e.preventDefault();
  target.click();
});