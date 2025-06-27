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
    if (window.scrollY === 0) {
        nav.classList.remove("nav-transparent");
        nav.classList.add("darken-nav");
    } else {
        nav.classList.remove("darken-nav");
        nav.classList.add("nav-transparent");
    }
}

const hamburgerIcons = document.querySelectorAll(".navbar-toggler");
hamburgerIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        darkenNavMenuDropdown();
    });
});

