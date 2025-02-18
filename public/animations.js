// Scroll to top on reload ↓

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

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
