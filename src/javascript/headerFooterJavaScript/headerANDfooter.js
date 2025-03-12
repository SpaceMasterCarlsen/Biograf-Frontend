

document.addEventListener('DOMContentLoaded',  script);

function script(){
    loadComponent("headerFooterTemplates/layout-header.html", "header-container", function (){loadNavLogic()})
    loadComponent("headerFooterTemplates/layout-footer.html", "footer-container")
}


function loadComponent(url, containerID, callback){
    fetch(url)
        .then(response => response.text())
        .then(data =>{document.getElementById(containerID).innerHTML = data;
        if (callback){
            callback();
        }

        })
        .catch(error => console.error("error in loading" + url))

    //this is working. getting the right header and footer in.
    //console.log("did you enter here ?")
}


function loadNavLogic() {
    const programLink = document.getElementById('programLink');
    const forsideLink = document.getElementById('forsideLink');

    if (programLink) {
        programLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "../html/calendar.html";
        });
    }

    if (forsideLink) {
        forsideLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = "../html/index.html";
        });
    }
}

