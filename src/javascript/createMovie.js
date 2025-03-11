document.getElementById("movieForm").addEventListener("submit", handleFormSubmit);
//above it to get the data in the Element "movieForm" with an event lisser which trickers on submit.


//this is to take elements from our document and get them.
// smart part about this, is that it returns an object, which means you dont need to define an one later.
function getMovieInput() {
    return {
        title: document.getElementById("title").value.trim(),
        duration: parseInt(document.getElementById("duration").value), // Convert to number
        genre: document.getElementById("genre").value.trim()
    };
}
//this is a constant movie objects there takes the values.
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent page reload

    const movie = getMovieInput(); // Get input values
    if (!validateMovie(movie)) {
        displayMessage("Please fill in all fields correctly.", "error");
        return;
    }

    sendMovieToBackend(movie);
}

//this is a function there ensure everything is filled out.
//this is important
function validateMovie(movie) {
    return movie.title !== "" && !isNaN(movie.duration) && movie.genre !== "";
}


//this is the function there send back our information to the backend.
// it retrieves the message from our backend. But if it gets nothing is displays an error
// perhaps it should be manage in Java ?
function sendMovieToBackend(movie) {
    fetch("http://localhost:8080/movies/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movie)
    })
        .then(response => response.json()) // Convert response to JSON
        .then(data => displayMessage(`ShowTime Created: ${data.title} (${data.duration} min) - ${data.genre}`, "success"))
        .catch(() => displayMessage("Failed to create Theater.", "error"));
}
