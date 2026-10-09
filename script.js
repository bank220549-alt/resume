// Navbar background becomes stronger after scrolling down.
const navbar = document.getElementById("mainNav");
const navMenu = document.getElementById("navMenu");

if (navbar) {
    const updateNavbar = () => {
        navbar.classList.toggle("scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();
}

// On phones/tablets, close the hamburger menu after a section link is clicked.
if (navMenu && window.bootstrap) {
    document.querySelectorAll("#navMenu .nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
            }
        });
    });
}

// Fade in headings and cards as they enter the screen.
const revealTargets = document.querySelectorAll(
    ".section-heading, .glass-panel, .timeline-item, .feature-card, .skill-card, .other-card"
);

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
    revealTargets.forEach((element) => element.classList.add("reveal"));

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealTargets.forEach((element) => observer.observe(element));
} else {
    // Keep the content visible if animations are unsupported or reduced motion is enabled.
    revealTargets.forEach((element) => element.classList.add("visible"));
}
