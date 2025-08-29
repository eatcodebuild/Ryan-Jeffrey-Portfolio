const URL = "https://www.ryancjeffrey.com";
// const URL = "http://localhost:3000";

async function loadProjects() {
  const response = await fetch(`${URL}/get/projects`);
  const projects = await response.json();
  console.log(projects.length);

  function projectLayout(project, index) {
    const description = project.description.map((d) => `<p class="lead mb-4">${d}</p>`).join("");
    const div = document.createElement("div");
    div.classList.add("py-5", "bg-space");
    const directionClass = index % 2 === 0 ? "flex-lg-row" : "flex-lg-row-reverse";
    div.innerHTML = `
      <div class="container pt-5">
          <div class="row align-items-stretch justify-content-center flex-column-reverse ${directionClass} align-items-center scroll-up px-3 px-lg-0">
              <div class="col-lg-6 col-xl-7 col-12 p-lg-4 text-color">
                  <h4 class="display-4 mb-4 mt-5 mt-lg-0">${project.title}</h4>
                  <div>${description}</div>
                  <div class="d-flex gap-2">
                      <a class="text-decoration-none" href="${project.project_link}" target="_blank" rel="noopener noreferrer">
                          <button type="button" class="btn btn-primary rounded-3 px-4 shadow-sm mt-4 moveSVG">
                              <div class="d-flex gap-1 justify-content-center align-items-center">
                                  <span>Visit website</span>
                                  <img src="/Images/right-chevron-svgrepo-com.svg" alt="chevron" height="20px" width="auto">
                              </div>
                          </button>
                      </a>
                      ${
                        project.has_repo
                          ? `
                        <a class="text-decoration-none" href="${project.github_link}" target="_blank" rel="noopener noreferrer">
                          <button type="button" class="btn btn-outline-primary rounded-3 px-4 shadow-sm mt-4 moveSVG">
                              <div class="d-flex gap-1 justify-content-center align-items-center">
                                  <span>View code</span>
                                  <img src="/Images/right-chevron-svgrepo-com.svg" alt="chevron" height="20px" width="auto">
                              </div>
                          </button>
                      </a>
                        `
                          : ""
                      }
                  </div>
              </div>
              <div class="col-lg-6 col-xl-5 col-12 mx-auto d-flex align-items-center justify-content-center">
                  <img src="${project.img}" class="img-fluid rounded space-shadow" alt="Project Thumbnail">
              </div>
          </div>
      </div>
    `;
    return div;
  }

  const list = document.getElementById("projects-list");
  list.innerHTML = "";

  projects.forEach((project, index) => {
    const formattedProject = projectLayout(project, index);
    list.appendChild(formattedProject);
  });
}

async function displayBlogs() {
  const response = await fetch(`${URL}/get/blogs`);
  const blogs = await response.json();

  function formatBlogs(blog) {
    const div = document.createElement("div");
    div.classList.add("col-12", "col-md-6", "col-lg-12", "scroll-up");
    div.innerHTML = `
      <div class="gradient-bg text-white rounded p-3 card-pop h-100">
        <div class="row">
          <div class="col-lg-3 mb-4 mb-lg-0">
            <img src="${blog.img}" alt="Blog Image" class="rounded shadow blog-img" />
          </div>
          <div class="col-lg-9">
            <h2 class="pb-3 display-6 border-bottom">${blog.title}</h2>
            <p class="fw-semibold">${blog.datePosted}</p>
            <p>${blog.articleParagraphs[0].length > 150 ? blog.articleParagraphs[0].slice(0, 150) + "…" : blog.articleParagraphs[0]}</p>
            <a href="/blog/${blog.id}" class="btn btn-primary mt-2">Read more</a>
          </div>
        </div>
      </div>
    `;
    return div;
  }
  const blogsList = document.getElementById("blogsList");
  blogsList.innerHTML = "";
  blogs.forEach((blog) => {
    blogsList.appendChild(formatBlogs(blog));
  });
}

// Scroll to appear function ↓
function checkScroll() {
  const scrollItems = document.querySelectorAll(".scroll-up, .scroll-left, .scroll-right");
  const triggerBottom = window.innerHeight * 0.85;

  scrollItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const path = window.location.pathname;

  if (path === "/projects") await loadProjects();
  else if (path === "/blog") await displayBlogs();
  else if (path.startsWith("/blog/")) renderArticles();

  checkScroll();
  window.addEventListener("scroll", checkScroll);
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
hamburgerIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    darkenNavMenuDropdown();
  });
});

// Stars
particlesJS("particles-js", {
  particles: {
    number: {
      value: 200,
      density: { enable: true, value_area: 800 },
    },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
    },
    opacity: {
      value: 1,
      random: true,
    },
    size: {
      value: 2,
      random: true,
    },
    line_linked: {
      enable: false,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      out_mode: "bounce",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
    },
  },
  retina_detect: true,
});

function renderArticles() {
  const articleContainer = document.getElementById("articleContainer");
  const articles = JSON.parse(articleContainer.getAttribute("data-articles"));

  function displayArticles(article) {
    const p = document.createElement("p");
    p.classList.add("lead", "mb-5");
    p.textContent = article;
    articleContainer.appendChild(p);
  }

  articles.forEach((article) => {
    displayArticles(article);
  });
}
