const buttons = document.querySelectorAll(".button");

/* =========================
   CURSOR GLOW
========================= */

const glow = document.createElement("div");

glow.classList.add("cursor-glow");

document.body.appendChild(glow);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let glowX = mouseX;
let glowY = mouseY;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animateGlow() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;

    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;

    requestAnimationFrame(animateGlow);
}

animateGlow();

/* =========================
   EFEITO MAGNÉTICO
========================= */

buttons.forEach(button => {

    button.addEventListener("mousemove", event => {

        const rect = button.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = (x - centerX) * 0.08;
        const moveY = (y - centerY) * 0.08;

        button.style.transform =
            `translate(${moveX}px, ${moveY - 5}px) scale(1.025)`;
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "";
    });

    button.addEventListener("mouseenter", () => {
        glow.style.width = "260px";
        glow.style.height = "260px";
        glow.style.opacity = "0.8";
    });
});

/* volta o cursor ao tamanho normal */

document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
    glow.style.opacity = "1";
});
