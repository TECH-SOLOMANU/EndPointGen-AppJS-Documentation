

'use strict';

/*=========================================================
  DOM READY
=========================================================*/

document.addEventListener('DOMContentLoaded', () => {

    initializeTheme();
    initializeProgressBar();
    initializeBackToTop();
    initializeSmoothScroll();

});

/*=========================================================
  HELPERS
=========================================================*/

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/*=========================================================
  THEME
=========================================================*/

function initializeTheme(){

    const toggle = $('#themeToggle');

    if(!toggle) return;

    const savedTheme = localStorage.getItem('theme');

    if(savedTheme === 'dark'){

        document.body.classList.add('dark');

        toggle.innerHTML = '☀️';

    }

    toggle.addEventListener('click',()=>{

        document.body.classList.toggle('dark');

        const darkMode =
            document.body.classList.contains('dark');

        toggle.innerHTML =
            darkMode ? '☀️' : '🌙';

        localStorage.setItem(
            'theme',
            darkMode ? 'dark' : 'light'
        );

    });

}

/*=========================================================
  READING PROGRESS
=========================================================*/

function initializeProgressBar(){

    const progress = $('#progress-bar');

    if(!progress) return;

    window.addEventListener('scroll',()=>{

        const total =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            (window.scrollY / total) * 100;

        progress.style.width =
            percentage + '%';

    },{passive:true});

}

/*=========================================================
  BACK TO TOP
=========================================================*/

function initializeBackToTop(){

    const button = $('#backTop');

    if(!button) return;

    window.addEventListener('scroll',()=>{

        if(window.scrollY > 500){

            button.classList.add('show');

        }else{

            button.classList.remove('show');

        }

    },{passive:true});

    button.addEventListener('click',()=>{

        window.scrollTo({

            top:0,

            behavior:'smooth'

        });

    });

}

/*=========================================================
  SMOOTH SCROLL
=========================================================*/

function initializeSmoothScroll(){

    $$('a[href^="#"]').forEach(link=>{

        link.addEventListener('click',(event)=>{

            const id =
                link.getAttribute('href');

            if(id === '#') return;

            const target =
                document.querySelector(id);

            if(!target) return;

            event.preventDefault();

            target.scrollIntoView({

                behavior:'smooth',

                block:'start'

            });

        });

    });

}



function initializeMobileMenu(){

    const menuButton = $('#mobileMenu');

    const sidebar = $('.sidebar');

    const overlay = $('.mobile-overlay');

    if(!menuButton || !sidebar || !overlay) return;

    menuButton.addEventListener('click',()=>{

        sidebar.classList.toggle('open');

        overlay.classList.toggle('show');

    });

    overlay.addEventListener('click',()=>{

        sidebar.classList.remove('open');

        overlay.classList.remove('show');

    });

}

/*=========================================================
  SCROLLSPY
=========================================================*/

function initializeScrollSpy(){

    const sections =
        $$('section[id]');

    const navLinks =
        $$('.sidebar a[href^="#"]');

    if(!sections.length) return;

    const observer =
        new IntersectionObserver((entries)=>{

            entries.forEach((entry)=>{

                if(!entry.isIntersecting) return;

                navLinks.forEach((link)=>{

                    link.classList.remove('active');

                    if(
                        link.getAttribute('href') ===
                        '#' + entry.target.id
                    ){

                        link.classList.add('active');

                    }

                });

            });

        },{

            rootMargin:'-30% 0px -60% 0px',

            threshold:0

        });

    sections.forEach(section=>{

        observer.observe(section);

    });

}

/*=========================================================
  TABLE OF CONTENTS
=========================================================*/

function initializeTOC(){

    const sections =
        $$('section[id]');

    const links =
        $$('.toc a');

    if(!sections.length || !links.length) return;

    const observer =
        new IntersectionObserver((entries)=>{

            entries.forEach((entry)=>{

                if(!entry.isIntersecting) return;

                links.forEach((link)=>{

                    link.classList.remove('active');

                    if(
                        link.getAttribute('href') ===
                        '#' + entry.target.id
                    ){

                        link.classList.add('active');

                    }

                });

            });

        },{

            rootMargin:'-30% 0px -60% 0px'

        });

    sections.forEach(section=>{

        observer.observe(section);

    });

}

/*=========================================================
  SEARCH
=========================================================*/

function initializeSearch(){

    const search =
        $('#searchInput');

    if(!search) return;

    search.addEventListener('input',()=>{

        const value =
            search.value
            .toLowerCase()
            .trim();

        $$('section').forEach((section)=>{

            const text =
                section.textContent
                .toLowerCase();

            section.style.display =
                text.includes(value)
                ? ''
                : 'none';

        });

    });

}

/*=========================================================
  CTRL + K
=========================================================*/

function initializeKeyboardShortcuts(){

    document.addEventListener('keydown',(event)=>{

        if(
            event.ctrlKey &&
            event.key.toLowerCase()==='k'
        ){

            event.preventDefault();

            const input =
                $('#searchInput');

            if(input){

                input.focus();

                input.select();

            }

        }

    });

}

/*=========================================================
  REGISTER
=========================================================*/

document.addEventListener('DOMContentLoaded',()=>{

    initializeMobileMenu();

    initializeScrollSpy();

    initializeTOC();

    initializeSearch();

    initializeKeyboardShortcuts();

});




function highlightSearchResults(query){

    if(!query) return;

    document.querySelectorAll("mark").forEach(mark=>{

        const parent = mark.parentNode;

        parent.replaceChild(
            document.createTextNode(mark.textContent),
            mark
        );

        parent.normalize();

    });

    document.querySelectorAll("section").forEach(section=>{

        if(!section.innerHTML.toLowerCase().includes(query)) return;

        const regex = new RegExp(query,"gi");

        section.innerHTML = section.innerHTML.replace(

            regex,

            match => `<mark>${match}</mark>`

        );

    });

}

/*=========================================================
  ESC KEY
=========================================================*/

function initializeEscapeKey(){

    document.addEventListener("keydown",(event)=>{

        if(event.key !== "Escape") return;

        $("#searchInput")?.blur();

        $(".sidebar")?.classList.remove("open");

        $(".mobile-overlay")?.classList.remove("show");

    });

}

/*=========================================================
  ACTIVE SECTION TITLE
=========================================================*/

function initializeDocumentTitle(){

    const sections = $$("section[id]");

    if(!sections.length) return;

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const heading =

                entry.target.querySelector("h2");

            if(!heading) return;

            document.title =

                heading.textContent +

                " • EndPointGen Docs";

        });

    },{

        threshold:.45

    });

    sections.forEach(section=>{

        observer.observe(section);

    });

}

/*=========================================================
  SAFE CONSOLE
=========================================================*/

function initializeLogger(){

    console.info(

        "%cEndPointGen Documentation",

        "color:#4f46e5;font-size:18px;font-weight:bold"

    );

    console.info(

        "Documentation initialized successfully."

    );

}

/*=========================================================
  ERROR HANDLER
=========================================================*/

window.addEventListener("error",(event)=>{

    console.error(

        "Runtime Error:",

        event.message

    );

});

/*=========================================================
  OPTIONAL SERVICE WORKER
=========================================================*/

function registerServiceWorker(){

    if(

        "serviceWorker" in navigator

    ){

        navigator.serviceWorker

            .register("./sw.js")

            .catch(()=>{});

    }

}

/*=========================================================
  FINAL INITIALIZATION
=========================================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeEscapeKey();

    initializeDocumentTitle();

    initializeLogger();

    registerServiceWorker();

});




function initializeCopyButtons(){

    const codeBlocks = $$('pre');

    if(!codeBlocks.length) return;

    codeBlocks.forEach((block)=>{

        const button = document.createElement('button');

        button.className = 'copy-btn';

        button.textContent = 'Copy';

        block.appendChild(button);

        button.addEventListener('click',async()=>{

            try{

                const code = block.querySelector('code')
                    ? block.querySelector('code').innerText
                    : block.innerText.replace('Copy','');

                await navigator.clipboard.writeText(code);

                button.textContent = 'Copied ✓';

                setTimeout(()=>{

                    button.textContent = 'Copy';

                },2000);

            }catch(error){

                console.error(error);

                button.textContent = 'Failed';

            }

        });

    });

}

/*=========================================================
  SCROLL REVEAL
=========================================================*/

function initializeRevealAnimations(){

    const elements = $$(
        '.feature-card,.doc-card,.flow-card,.timeline-item,.callout'
    );

    if(!elements.length) return;

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach((entry)=>{

            if(entry.isIntersecting){

                entry.target.classList.add('fade-up');

                observer.unobserve(entry.target);

            }

        });

    },{

        threshold:.15

    });

    elements.forEach((element)=>{

        observer.observe(element);

    });

}

/*=========================================================
  LAZY IMAGES
=========================================================*/

function initializeLazyImages(){

    const images = $$('img[data-src]');

    if(!images.length) return;

    const observer = new IntersectionObserver((entries)=>{

        entries.forEach((entry)=>{

            if(!entry.isIntersecting) return;

            const image = entry.target;

            image.src = image.dataset.src;

            image.removeAttribute('data-src');

            observer.unobserve(image);

        });

    });

    images.forEach((image)=>{

        observer.observe(image);

    });

}

/*=========================================================
  DEBOUNCE
=========================================================*/

function debounce(callback,delay=200){

    let timer;

    return(...args)=>{

        clearTimeout(timer);

        timer = setTimeout(()=>{

            callback(...args);

        },delay);

    };

}

/*=========================================================
  WINDOW RESIZE
=========================================================*/

function initializeResizeHandler(){

    const resize = debounce(()=>{

        if(window.innerWidth > 768){

            $('.sidebar')?.classList.remove('open');

            $('.mobile-overlay')?.classList.remove('show');

        }

    },150);

    window.addEventListener('resize',resize);

}

/*=========================================================
  PERFORMANCE
=========================================================*/

function initializePerformance(){

    window.addEventListener('load',()=>{

        document.body.classList.add('loaded');

    },{once:true});

}

/*=========================================================
  REGISTER
=========================================================*/

document.addEventListener('DOMContentLoaded',()=>{

    initializeCopyButtons();

    initializeRevealAnimations();

    initializeLazyImages();

    initializeResizeHandler();

    initializePerformance();

});

