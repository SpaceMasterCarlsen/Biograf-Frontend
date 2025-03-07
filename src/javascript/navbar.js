console.log("navigation index og program (kalender) er med");
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const linkText = link.textContent.trim();
            if (linkText === "Forside") {
                navigateToIndex();
            } else if (linkText === "Program") {
                navigateToProgram();
            }
        });
    });
});

function navigateToIndex() {
    window.location.href = "index.html";
}


function navigateToProgram() {
    window.location.href = "calendar.html";
}