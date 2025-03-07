console.log("er i index.js");

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

// Function for navigating to index.html
function navigateToIndex() {
    window.location.href = "index.html";
}


//to have API call to add data for the calender
function navigateToProgram() {

}