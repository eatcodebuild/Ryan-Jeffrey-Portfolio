// Scroll to appear function ↓

document.addEventListener("DOMContentLoaded", function () {
    const scrollItems = document.querySelectorAll(".scroll-up, .scroll-left, .scroll-right");

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.85;

        scrollItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;

            if (itemTop < triggerBottom) {
                item.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
});


function darkenNav() {
    const nav = document.getElementsByTagName("nav")[0];
    if (window.scrollY > 100) {
        nav.classList.remove("nav-transparent");
        nav.classList.add("darken-nav");
    } else {
        nav.classList.remove("darken-nav");
        nav.classList.add("nav-transparent");
    }
}
window.addEventListener("scroll", darkenNav);
window.addEventListener("load", darkenNav);


function darkenNavMenuDropdown() {
    const nav = document.getElementsByTagName("nav")[0];
    if (!nav.classList.contains("darken-nav")) {
        nav.classList.remove("nav-transparent");
        nav.classList.add("darken-nav");
    } 
}

const hamburgerIcons = document.querySelectorAll(".navbar-toggler");
hamburgerIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        darkenNavMenuDropdown();
    });
});



// Stars
particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 100,
        "density": { "enable": true, "value_area": 800 }
      },
      "color": { "value": "#ffffff" },
      "shape": {
        "type": "circle",
        "stroke": { "width": 0, "color": "#000000" }
      },
      "opacity": {
        "value": 0.7,
        "random": true
      },
      "size": {
        "value": 2,
        "random": true
      },
      "line_linked": {
        "enable": false  // <--- TURN THIS OFF
        },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "out_mode": "bounce"
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": { "enable": false },
        "onclick": { "enable": false }
      }
    },
    "retina_detect": true
});
