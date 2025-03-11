document.getElementById("theaterForm").addEventListener("submit", handleSubmissionForm )

function getObject(){
    return{
        name: document.getElementById("name").value.trim(),
        rows: document.getElementById("rows").value,
    }
}

function handleSubmissionForm(event){
    event.preventDefault();

    const theater = getObject();
    if (!validateTheater(theater)){
        displayMessage("Please fill in all fields correctly.", "error");
        return;
    }

    sendTheaterToBackend(theater);

}

function validateTheater(theater) {
    return theater.name !== "" && !isNaN(theater.rows);
}

function sendTheaterToBackend(theater){
    fetch("http://localhost:8080/theater/createTheater", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(theater)
    })
        .then(response => response.json()) // Convert response to JSON
        .then(data => displayMessage(`Theater Created: ${data.name} (${data.rows} with this many rows)`, "success"))
        .catch(() => displayMessage("Failed to create Theater.", "error"));
}