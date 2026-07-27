const menuToggle = document.getElementById("mobile-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});