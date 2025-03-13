function attachDeleteEventListeners() {
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const theaterID = this.getAttribute("data-id");
            deleteTheather(theaterID);
        });
    });
}

function deleteTheather(theaterID) {
    fetch(`http://localhost:8080/theater/${theaterID}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Kunne ikke slette theather.");
            }
            return response.json();
        })
        .then(() => {
            displayMessage("Theather er slettet!", "success");
            fetchMovies(); // Opdater listen efter sletning
        })
        .catch(() => displayMessage("Fejl ved sletning.", "error"));
}
