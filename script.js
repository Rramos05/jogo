/* ========================================
   PARTICULAS
======================================== */

const particleContainer = document.getElementById("particles");

const particleCount = window.innerWidth < 600 ? 20 : 45;

for (let i = 0; i < particleCount; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    const size = Math.random() * 2 + 1;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * -15;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;

    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    particle.style.opacity = Math.random() * .7 + .2;

    particleContainer.appendChild(particle);
}


/* ========================================
   CURSOR
======================================== */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let followerX = mouseX;
let followerY = mouseY;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
});


function animateCursor() {

    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();


/* ========================================
   EFEITO NOS LINKS
======================================== */

const cards = document.querySelectorAll("[data-magnetic]");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        follower.style.width = "60px";
        follower.style.height = "60px";

        follower.style.borderColor =
            "rgba(255, 101, 0, .9)";
    });


    card.addEventListener("mousemove", event => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX -
            rect.left -
            rect.width / 2;

        const y =
            event.clientY -
            rect.top -
            rect.height / 2;

        const moveX = x * 0.08;
        const moveY = y * 0.08;

        card.style.transform =
            `translate(${moveX}px, ${moveY - 7}px)`;
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

        follower.style.width = "35px";
        follower.style.height = "35px";

        follower.style.borderColor =
            "rgba(255, 101, 0, .5)";
    });

});


/* ========================================
   PARALLAX DO FUNDO
======================================== */

document.addEventListener("mousemove", event => {

    const x =
        (event.clientX / window.innerWidth - .5) * 2;

    const y =
        (event.clientY / window.innerHeight - .5) * 2;

    const grid = document.querySelector(".grid");

    if (grid) {
        grid.style.transform =
            `translate(${x * 8}px, ${y * 8}px)`;
    }
});


/* ========================================
   TÍTULO DINÂMICO
======================================== */

let originalTitle = document.title;

document.addEventListener("visibilitychange", () => {

    if (document.hidden) {
        document.title = "Volte aqui 👋";
    } else {
        document.title = originalTitle;
    }

});
