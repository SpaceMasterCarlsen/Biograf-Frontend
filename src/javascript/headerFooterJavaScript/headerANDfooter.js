document.addEventListener('DOMContentLoaded', function() {
    headerGetter();
    footerGetter();
});


function headerGetter () {
    // Load the header
    fetch('headerFooterTemplates/layout-header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
        })
        .catch(error => {
            console.warn('Error loading the header:', error);
        });
}

function footerGetter(){
    fetch('headerFooterTemplates/layout-footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        })
        .catch(error => {
            console.warn('Error loading the footer:', error);
        });
}
