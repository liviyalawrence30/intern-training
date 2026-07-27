/* ==========================================
   AURA BOUTIQUE
   script.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // Mobile Menu Toggle
    // ===============================

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("active");
        });

        // Close menu after clicking a link

        const navLinks = navbar.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");

            });

        });

    }

    // ===============================
    // Sticky Header Shadow
    // ===============================

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 20) {

            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.12)";

        } else {

            header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)";

        }

    });

});