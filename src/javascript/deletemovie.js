function attachDeleteEventListeners() {
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const movieID = this.getAttribute("data-id");
            deleteMovie(movieID);
        });
    });
}

function deleteMovie(movieID) {
    fetch(`http://localhost:8080/movies/${movieID}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunne ikke slette filmen.");
            }
            return response.json();
        })
        .then(() => {
            displayMessage("Filmen er slettet!", "success");
            fetchMovies(); // Opdater listen efter sletning
        })
        .catch(() => displayMessage("Fejl ved sletning.", "error"));
}
