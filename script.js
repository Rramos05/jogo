const buttons = document.querySelectorAll(".button");

buttons.forEach(button => {

    button.addEventListener("mousemove", () => {
        button.style.transform = "translateY(-5px)";
    });

    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0)";
    });

});
