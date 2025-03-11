

document.addEventListener('DOMContentLoaded',  script);

function script(){
    loadComponent("headerFooterTemplates/layout-header.html", "header-container")
    loadComponent("headerFooterTemplates/layout-footer.html", "footer-container")
}




function loadComponent(url, containerID){
    fetch(url)
        .then(response => response.text())
        .then(data =>{document.getElementById(containerID).innerHTML = data})
        .catch(error => console.error("error in loading" + url))
    //this is working. getting the right header and footer in.
    //console.log("did you enter here ?")
}




