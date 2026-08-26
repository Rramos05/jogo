const particles = document.getElementById("particles");

const amount = window.innerWidth <= 600 ? 18 : 35;

for (let i = 0; i < amount; i++) {

    const particle = document.createElement("span");

    particle.className = "particle";

    particle.style.left =
        `${Math.random() * 100}%`;

    particle.style.animationDuration =
        `${8 + Math.random() * 12}s`;

    particle.style.animationDelay =
        `${Math.random() * -15}s`;

    const size =
        1 + Math.random() * 2;

    particle.style.width =
        `${size}px`;

    particle.style.height =
        `${size}px`;

    particles.appendChild(particle);
}


/* =================================
   EFEITO MAGNÉTICO LEVE
================================= */

const cards =
    document.querySelectorAll(".social-card");

cards.forEach(card => {

    card.addEventListener("mousemove", event => {

        if (window.innerWidth <= 700) {
            return;
        }

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const moveX =
            (x - centerX) * 0.025;

        const moveY =
            (y - centerY) * 0.025;

        card.style.transform =
            `translate(${moveX}px, ${moveY - 5}px)`;
    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});
