document.addEventListener("DOMContentLoaded", fetchMovies); // Henter film, når siden indlæses

function fetchMovies() {
    fetch("http://localhost:8080/movies") // Endpoint til at hente film
        .then(response => response.json())
        .then(data => displayMovies(data))
        .catch(() => displayMessage("Kunne ikke hente filmene.", "error"));
}

function displayMovies(movies) {
    const movieTable = document.getElementById("movieTableBody");
    movieTable.innerHTML = ""; // Rens tabellen, før nye data indsættes

    movies.forEach(movie => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.duration} min</td>
            <td>${movie.genre}</td>
            <td><button class="delete-btn" data-id="${movie.movieID}">Slet</button></td>
        `;
        movieTable.appendChild(row);
    });

    attachDeleteEventListeners(); // Tilføj event listeners til sletteknapper
}

function displayMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type; // Tilføjer klasse for styling (fx error/success)
}
