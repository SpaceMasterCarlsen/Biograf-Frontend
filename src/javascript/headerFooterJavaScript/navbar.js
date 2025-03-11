
document.addEventListener("DOMContentLoaded", loadcontent)

async function loadcontent(){
    const navbarContainer = document.getElementById("navbar-container");
    const response = await fetch("../headerFooterTemplates/layout-header.html")
    navbarContainer.innerHTML = await response.text();

    console.log("navigation index og program (kalender) er med");

    navigationLogic();
}


    function navigationLogic () {

    const navLinks = document.querySelectorAll(".nav-links a");

    if (navLinks.length === 0){
        console.warn("NavBar links not found, try again")
        setTimeout(navigationLogic, 100);
        return;
    }


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
}

function navigateToIndex() {
    window.location.href = "../html/index.html";
}

function navigateToProgram() {
    window.location.href = "../html/calendar.html";
}
