const WARP_MS = 5000;
const START_SPEED = 200;

let revealed = false;

function revealContent() {
  if (revealed) return;
  revealed = true;

  const message = document.getElementById("initializing");
  const homeContent = document.getElementById("homeContent");
  const starfield = document.getElementById("starfield");
  const particles = document.getElementById("particles-js");
  const body = document.getElementsByTagName("body")[0];

  message.classList.add("d-none");
  homeContent.classList.remove("d-none");
  particles.classList.add("fade");
  starfield.classList.add("fadeOut");
  body.classList.remove("noScroll");

  document.querySelectorAll(".su").forEach((el) => el.classList.add("scroll-up"));
  document.querySelectorAll(".sl").forEach((el) => el.classList.add("scroll-left"));
  document.querySelectorAll(".sr").forEach((el) => el.classList.add("scroll-right"));

  if (typeof checkScroll === "function") checkScroll();
}

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const numStars = 500;

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

    const t = Math.min((now - startTime) / WARP_MS, 1);
    const frames = Math.min((now - lastTime) / 50.67, 3);
    lastTime = now;

    const speed = START_SPEED * (1 - t * t);

    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
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

  sessionStorage.setItem("introPlayed", "true");

  startWarp(revealContent);

  setTimeout(revealContent, WARP_MS);
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
