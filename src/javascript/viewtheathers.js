document.addEventListener("DOMContentLoaded", fetchTheahters); // Henter theathers, når siden indlæses

function fetchTheahters() {
    fetch("http://localhost:8080/theater") // Endpoint til at hente theathers
        .then(response => response.json())
        .then(data => displayTheathers(data))
        .catch(() => displayMessage("Kunne ikke hente theathers.", "error"));
}

function displayTheathers(theathers) {
    const theatherTable = document.getElementById("theatherTableBody");
    theatherTable.innerHTML = ""; // Rens tabellen, før nye data indsættes

    theathers.forEach(theather => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${theather.name}</td>
            <td>${theather.rows}</td>
           <td><button class="delete-btn" data-id="${theather.theaterID}">Slet</button></td>
        `;
        theatherTable.appendChild(row);
    });

    attachDeleteEventListeners(); // Tilføj event listeners til sletteknapper
}

function displayMessage(message, type) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.className = type; // Tilføjer klasse for styling (fx error/success)
}
