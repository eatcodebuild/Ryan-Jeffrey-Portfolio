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
        nav.style.background = "linear-gradient(rgb(6, 5, 22), black)";
    } else {
        nav.style.background = "transparent";
    }
}
window.addEventListener("scroll", darkenNav);
window.addEventListener("load", darkenNav);

