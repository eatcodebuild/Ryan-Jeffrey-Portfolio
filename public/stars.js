function showContent() {
  const message = document.getElementById("initializing");
  const homeContent = document.getElementById("homeContent");
  const starfield = document.getElementById("starfield");
  const particles = document.getElementById("particles-js");
  const messageText = document.getElementById("messageText");
  const body = document.getElementsByTagName("body")[0];
  const su = document.querySelectorAll(".su");
  const sl = document.querySelectorAll(".sl");
  const sr = document.querySelectorAll(".sr");

  messageText.classList.remove("appearGrow");
  messageText.classList.add("fadeOut");
  messageText.addEventListener("animationend", () => {
    message.classList.add("d-none");
    if (message.classList.contains("d-none")) {
      particles.classList.remove("d-none");
      particles.classList.add("fade");
      starfield.classList.add("fadeOut");
      homeContent.classList.remove("d-none");
      body.classList.remove("noScroll");
      if (!homeContent.classList.contains("d-none")) {
        su.forEach((el) => el.classList.add("scroll-up"));
        sl.forEach((el) => el.classList.add("scroll-left"));
        sr.forEach((el) => el.classList.add("scroll-right"));
      }
    }
  });
}

function stayVisible() {
  const message = document.getElementById("initializing");
  const homeContent = document.getElementById("homeContent");
  const starfield = document.getElementById("starfield");
  const particles = document.getElementById("particles-js");
  const messageText = document.getElementById("messageText");
  const body = document.getElementsByTagName("body")[0];
  const su = document.querySelectorAll(".su");
  const sl = document.querySelectorAll(".sl");
  const sr = document.querySelectorAll(".sr");

  messageText.classList.remove("appearGrow");
  message.classList.add("d-none");
  if (message.classList.contains("d-none")) {
    particles.classList.remove("d-none");
    particles.classList.add("fade");
    starfield.classList.add("fadeOut");
    homeContent.classList.remove("d-none");
    body.classList.remove("noScroll");
    if (!homeContent.classList.contains("d-none")) {
      su.forEach((el) => el.classList.add("scroll-up"));
      sl.forEach((el) => el.classList.add("scroll-left"));
      sr.forEach((el) => el.classList.add("scroll-right"));
    }
  }
}

window.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("introPlayed")) {
    setTimeout(() => {
      showContent();

      sessionStorage.setItem("introPlayed", "true");
    }, 9000);
  } else {
    stayVisible();
  }
});

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

let speed = 50; // starting speed
const deceleration = 0.992; // slower = faster stop
const minSpeed = 0.1; // stop threshold

function animate() {
  // create a vertical linear gradient (top → bottom)
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

  // add your color stops
  gradient.addColorStop(0, "rgba(13, 11, 48, 0.61)"); // top
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.603)"); // bottom

  // use it as fill style
  ctx.fillStyle = gradient;
  // fade the background slightly to create motion blur effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // lower alpha = longer trails
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];
    star.z -= speed;

    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = Math.random() * canvas.width - canvas.width / 2;
      star.y = Math.random() * canvas.height - canvas.height / 2;
      star.size = Math.random() * 2 + 1;
    }

    const sx = (star.x / star.z) * canvas.width + canvas.width / 2;
    const sy = (star.y / star.z) * canvas.width + canvas.height / 2;
    const starSize = (1 - star.z / canvas.width) * star.size * 2;

    // fade stars as speed decreases
    // const alpha = Math.max(speed / 10, 0);
    const alpha = 1; // 1 at full speed, 0 at stop
    const starGradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, starSize);
    starGradient.addColorStop(0, `rgba(255,255,255,${alpha})`);
    starGradient.addColorStop(0.5, `rgba(255,255,255,${alpha})`);
    starGradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = starGradient;
    ctx.beginPath();
    ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // gradually reduce speed
  speed *= deceleration;
  if (speed < minSpeed) speed = 0;

  if (speed > 0) requestAnimationFrame(animate);
}

animate();

// resize canvas when window changes
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
