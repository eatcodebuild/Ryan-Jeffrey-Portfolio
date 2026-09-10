const WARP_MS = 3000; // how long the hyperdrive runs before the page is revealed
const START_SPEED = 100; // starting speed, eased down to 0 across WARP_MS

let revealed = false;

function revealContent() {
  if (revealed) return;
  revealed = true;

  const message = document.getElementById("initializing");
  const homeContent = document.getElementById("homeContent");
  const starfield = document.getElementById("starfield");
  const particles = document.getElementById("particles-js");
  const body = document.getElementsByTagName("body")[0];

  // #initializing and the hero inside #homeContent share the same .bg-space.hero
  // gradient, so swapping them within one frame is seamless. Fading the overlay
  // out instead exposes the black canvas/body underneath for a full second,
  // which reads as a blue -> black -> blue flash.
  message.classList.add("d-none");
  homeContent.classList.remove("d-none");
  particles.classList.add("fade");
  starfield.classList.add("fadeOut");
  body.classList.remove("noScroll");

  document.querySelectorAll(".su").forEach((el) => el.classList.add("scroll-up"));
  document.querySelectorAll(".sl").forEach((el) => el.classList.add("scroll-left"));
  document.querySelectorAll(".sr").forEach((el) => el.classList.add("scroll-right"));

  // checkScroll() already ran on DOMContentLoaded, before the classes above
  // existed — run it again so above-the-fold content doesn't wait for a scroll.
  if (typeof checkScroll === "function") checkScroll();
}

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 500;

// create stars
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * canvas.width - canvas.width / 2,
    y: Math.random() * canvas.height - canvas.height / 2,
    z: Math.random() * canvas.width,
    size: Math.random() * 2 + 1,
  });
}

function startWarp(onComplete) {
  let startTime = null;
  let lastTime = null;

  function animate(now) {
    if (startTime === null) {
      startTime = now;
      lastTime = now;
    }

    // Drive both the speed curve and the distance travelled off wall-clock time
    // so the warp always lasts WARP_MS, whatever the display's refresh rate.
    const t = Math.min((now - startTime) / WARP_MS, 1);
    // Clamped so a stalled/throttled frame doesn't teleport every star at once.
    const frames = Math.min((now - lastTime) / 16.67, 3);
    lastTime = now;

    // 1 - t^2 holds close to full speed early and brakes hard into the finish,
    // so the stars are still visibly moving right up to the reveal. An ease-out
    // like (1 - t)^3 instead spends its last second at a speed too low to see,
    // which reads as a stall between the warp ending and the content arriving.
    const speed = START_SPEED * (1 - t * t);

    // fade the background slightly to create motion blur effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // lower alpha = longer trails
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars.length; i++) {
      let star = stars[i];
      star.z -= speed * frames;

      if (star.z <= 0) {
        star.z = canvas.width;
        star.x = Math.random() * canvas.width - canvas.width / 2;
        star.y = Math.random() * canvas.height - canvas.height / 2;
        star.size = Math.random() * 2 + 1;
      }

      const sx = (star.x / star.z) * canvas.width + canvas.width / 2;
      const sy = (star.y / star.z) * canvas.width + canvas.height / 2;
      const starSize = (1 - star.z / canvas.width) * star.size * 2;

      const starGradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, starSize);
      starGradient.addColorStop(0, "rgba(255,255,255,1)");
      starGradient.addColorStop(0.5, "rgba(255,255,255,1)");
      starGradient.addColorStop(1, "rgba(255,255,255,0)");

      ctx.fillStyle = starGradient;
      ctx.beginPath();
      ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
      ctx.fill();
    }

    if (t < 1) requestAnimationFrame(animate);
    else onComplete();
  }

  requestAnimationFrame(animate);
}

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("introPlayed")) {
    revealContent();
    return;
  }

  // Set the flag up front so a reload part-way through doesn't replay the intro.
  sessionStorage.setItem("introPlayed", "true");

  startWarp(revealContent);

  // requestAnimationFrame is throttled or paused in a background tab, so the
  // warp may never finish. Guarantee the content shows up regardless.
  setTimeout(revealContent, WARP_MS + 2000);
});

// resize canvas when window changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
