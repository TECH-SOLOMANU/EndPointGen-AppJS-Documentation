/*==================================================
Generated app.js Documentation
script.js
Part 1
Theme • Progress • Back To Top • FAQ
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeTheme();

    initializeProgressBar();

    initializeBackToTop();

    initializeFAQ();

});

/*=========================================
THEME
=========================================*/

function initializeTheme() {

    const body = document.body;

    const themeButton = document.getElementById("themeToggle");

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        body.classList.add("dark");

    }

    if (!themeButton) return;

    themeButton.addEventListener("click", () => {

        body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            body.classList.contains("dark")
                ? "dark"
                : "light"
        );

    });

}

/*=========================================
READING PROGRESS
=========================================*/

function initializeProgressBar() {

    const progress = document.getElementById("progressBar");

    if (!progress) return;

    window.addEventListener("scroll", () => {

        const scrollTop =
            document.documentElement.scrollTop;

        const pageHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percentage =
            (scrollTop / pageHeight) * 100;

        progress.style.width = percentage + "%";

    });

}

/*=========================================
BACK TO TOP
=========================================*/

function initializeBackToTop() {

    const button = document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

        }

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=========================================
FAQ ACCORDION
=========================================*/

function initializeFAQ() {

    const items =
        document.querySelectorAll(".faqItem");

    items.forEach(item => {

        const question =
            item.querySelector(".faqQuestion");

        question.addEventListener("click", () => {

            if (item.classList.contains("active")) {

                item.classList.remove("active");

                return;

            }

            items.forEach(faq => {

                faq.classList.remove("active");

            });

            item.classList.add("active");

        });

    });

}
/*==================================================
script.js
Part 2
ScrollSpy • Search • Copy • Reveal
==================================================*/

/*=========================================
INITIALIZE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeScrollSpy();

    initializeSearch();

    initializeCopyButtons();

    initializeRevealAnimation();

});

/*=========================================
SCROLL SPY
=========================================*/

function initializeScrollSpy() {

    const sections =
        document.querySelectorAll("section[id]");

    const links =
        document.querySelectorAll(
            ".rightSidebar a, .sidebar a"
        );

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.id;

            }

        });

        links.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    });

}

/*=========================================
LIVE SEARCH
=========================================*/

function initializeSearch() {

    const input =
        document.querySelector(
            ".searchContainer input"
        );

    if (!input) return;

    input.addEventListener("input", () => {

        const keyword =
            input.value.toLowerCase();

        const sections =
            document.querySelectorAll("section");

        sections.forEach(section => {

            const text =
                section.innerText.toLowerCase();

            if (text.includes(keyword)) {

                section.style.display = "";

            } else {

                section.style.display = "none";

            }

        });

    });

}

/*=========================================
COPY BUTTON
=========================================*/

function initializeCopyButtons() {

    const buttons =
        document.querySelectorAll(".copyButton");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const pre =
                button.closest(".codeWindow")
                ?.querySelector("pre");

            if (!pre) return;

            navigator.clipboard.writeText(pre.innerText);

            const oldText = button.innerText;

            button.innerText = "Copied ✓";

            setTimeout(() => {

                button.innerText = oldText;

            }, 1800);

        });

    });

}

/*=========================================
SCROLL REVEAL
=========================================*/

function initializeRevealAnimation() {

    const elements =
        document.querySelectorAll(

            ".overviewCard," +
            ".importCard," +
            ".timelineItem," +
            ".practice," +
            ".explanationCard"

        );

    const observer =
        new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("fadeUp");

                }

            });

        }, {

            threshold: .15

        });

    elements.forEach(element => {

        observer.observe(element);

    });

}
/*==================================================
script.js
Part 3
Mobile Menu • Smooth Scroll • Shortcuts
==================================================*/

/*=========================================
INITIALIZE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeMobileSidebar();

    initializeSmoothScroll();

    initializeKeyboardShortcuts();

    initializeSystemTheme();

});

/*=========================================
MOBILE SIDEBAR
=========================================*/

function initializeMobileSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    const toggle =
        document.getElementById("menuToggle");

    if (!sidebar || !toggle) return;

    toggle.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

    document.addEventListener("click", (event) => {

        if (
            window.innerWidth > 900 ||
            !sidebar.classList.contains("open")
        ) {
            return;
        }

        const clickedSidebar =
            sidebar.contains(event.target);

        const clickedToggle =
            toggle.contains(event.target);

        if (!clickedSidebar && !clickedToggle) {

            sidebar.classList.remove("open");

        }

    });

}

/*=========================================
SMOOTH SCROLL
=========================================*/

function initializeSmoothScroll() {

    const links =
        document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 70,

                behavior: "smooth"

            });

            document
                .querySelector(".sidebar")
                ?.classList.remove("open");

        });

    });

}

/*=========================================
KEYBOARD SHORTCUTS
=========================================*/

function initializeKeyboardShortcuts() {

    document.addEventListener("keydown", event => {

        const search =
            document.querySelector(
                ".searchContainer input"
            );

        if (
            event.key === "/" &&
            document.activeElement !== search
        ) {

            event.preventDefault();

            search?.focus();

        }

        if (event.key === "Escape") {

            search?.blur();

            document
                .querySelector(".sidebar")
                ?.classList.remove("open");

        }

    });

}

/*=========================================
SYSTEM THEME
=========================================*/

function initializeSystemTheme() {

    if (localStorage.getItem("theme")) {

        return;

    }

    if (

        window.matchMedia(

            "(prefers-color-scheme: dark)"

        ).matches

    ) {

        document.body.classList.add("dark");

    }

}
/*==================================================
script.js
Part 4
Production Utilities
==================================================*/

/*=========================================
INITIALIZE
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeActiveSearch();

    initializeLazyLoading();

    initializePerformance();

    initializeAccessibility();

    console.log(
        "%cGenerated app.js Documentation",
        "color:#2563eb;font-size:18px;font-weight:bold;"
    );

    console.log(
        "Documentation loaded successfully."
    );

});

/*=========================================
SEARCH HIGHLIGHT
=========================================*/

function initializeActiveSearch() {

    const input =
        document.querySelector(
            ".searchContainer input"
        );

    if (!input) return;

    input.addEventListener("keydown", event => {

        if (event.key !== "Enter") return;

        const keyword =
            input.value.trim().toLowerCase();

        if (!keyword) return;

        const sections =
            document.querySelectorAll("section");

        for (const section of sections) {

            if (
                section.innerText
                    .toLowerCase()
                    .includes(keyword)
            ) {

                section.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

                break;

            }

        }

    });

}

/*=========================================
IMAGE LAZY LOADING
=========================================*/

function initializeLazyLoading() {

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.loading = "lazy";

        image.decoding = "async";

    });

}

/*=========================================
PERFORMANCE
=========================================*/

function initializePerformance() {

    let resizeTimeout;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {

            document.body.classList.remove("sidebar-open");

        }, 200);

    });

}

/*=========================================
ACCESSIBILITY
=========================================*/

function initializeAccessibility() {

    document
        .querySelectorAll("button")
        .forEach(button => {

            if (!button.getAttribute("aria-label")) {

                const label =
                    button.innerText.trim() ||
                    "Button";

                button.setAttribute(
                    "aria-label",
                    label
                );

            }

        });

}

/*=========================================
GLOBAL ERROR HANDLER
=========================================*/

window.addEventListener("error", event => {

    console.error(

        "Documentation Error:",

        event.message

    );

});

/*=========================================
UNHANDLED PROMISES
=========================================*/

window.addEventListener(

    "unhandledrejection",

    event => {

        console.error(

            "Unhandled Promise:",

            event.reason

        );

    }

);