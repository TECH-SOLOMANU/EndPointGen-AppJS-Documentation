/* ==========================================================
   EndPointGen Documentation
   script.js
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ============================================
       Theme
    ============================================ */

    const body = document.body;
    const themeBtn = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        body.classList.add("dark");
        themeBtn.textContent = "☀️ Light Mode";

    }

    themeBtn.addEventListener("click", () => {

        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");
            themeBtn.textContent = "☀️ Light Mode";

        } else {

            localStorage.setItem("theme", "light");
            themeBtn.textContent = "🌙 Dark Mode";

        }

    });

    /* ============================================
       Mobile Sidebar
    ============================================ */

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

    /* ============================================
       Smooth Scroll
    ============================================ */

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const id = link.getAttribute("href");

            document.querySelector(id).scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

            sidebar.classList.remove("open");

        });

    });

    /* ============================================
       ScrollSpy
    ============================================ */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    function activateSection() {

        let current = "";

        sections.forEach(section => {

            const top = window.scrollY;
            const offset = section.offsetTop - 150;
            const height = section.offsetHeight;

            if (top >= offset && top < offset + height) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activateSection);

    activateSection();

    /* ============================================
       Progress Bar
    ============================================ */

    const progress = document.getElementById("progressBar");

    function updateProgress() {

        const total = document.documentElement.scrollHeight - window.innerHeight;

        const current = window.scrollY;

        progress.style.width = (current / total) * 100 + "%";

    }

    window.addEventListener("scroll", updateProgress);

    updateProgress();

    /* ============================================
       Copy Buttons
    ============================================ */

    document.querySelectorAll(".copy-btn").forEach(button => {

        button.addEventListener("click", () => {

            const code = button.nextElementSibling.innerText;

            navigator.clipboard.writeText(code);

            button.innerText = "Copied ✔";

            setTimeout(() => {

                button.innerText = "Copy";

            }, 1800);

        });

    });

    /* ============================================
       Search
    ============================================ */

    const search = document.getElementById("searchInput");

    search.addEventListener("keyup", () => {

        const keyword = search.value.toLowerCase();

        navLinks.forEach(link => {

            const text = link.innerText.toLowerCase();

            link.style.display = text.includes(keyword)
                ? "block"
                : "none";

        });

    });

    /* ============================================
       Reveal Animation
    ============================================ */

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0px)";

            }

        });

    }, {

        threshold: .15

    });

    document.querySelectorAll("section").forEach(section => {

        section.style.opacity = "0";
        section.style.transform = "translateY(60px)";
        section.style.transition = ".8s";

        observer.observe(section);

    });

    /* ============================================
       Keyboard Shortcut
       Ctrl + K
    ============================================ */

    document.addEventListener("keydown", e => {

        if (e.ctrlKey && e.key.toLowerCase() === "k") {

            e.preventDefault();

            search.focus();

        }

    });

    /* ============================================
       Floating Hero Animation
    ============================================ */

    const hero = document.querySelector(".hero");

    window.addEventListener("mousemove", e => {

        const x = (window.innerWidth / 2 - e.clientX) / 40;
        const y = (window.innerHeight / 2 - e.clientY) / 40;

        hero.style.transform =
            `rotateY(${x}deg) rotateX(${-y}deg)`;

    });

    /* ============================================
       Card Hover Tilt
    ============================================ */

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateX = -(y - rect.height / 2) / 18;
            const rotateY = (x - rect.width / 2) / 18;

            card.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "rotateX(0deg) rotateY(0deg) scale(1)";

        });

    });

    /* ============================================
       Highlight Current Code Block
    ============================================ */

    document.querySelectorAll(".code-block").forEach(block => {

        block.addEventListener("mouseenter", () => {

            block.style.boxShadow =
                "0 0 30px rgba(99,102,241,.35)";

        });

        block.addEventListener("mouseleave", () => {

            block.style.boxShadow = "";

        });

    });

    /* ============================================
       Footer Year
    ============================================ */

    const footer = document.querySelector("footer");

    footer.innerHTML =
        `© ${new Date().getFullYear()} EndPointGen Documentation | Built with HTML, CSS & JavaScript`;

});