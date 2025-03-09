async function loadMoviesFromDb() {
    try {
        const response = await fetch("http://localhost:8080/movies")
        const movies = await response.json()
        const movieSelect = document.getElementById("movieID")

        movieSelect.innerHTML = '<option value="">Select a movie</option>'

        movies.forEach(movie => {
            const option = document.createElement("option")
            option.value = movie.movieID;
            option.textContent = `${movie.title} (${movie.genre}, ${movie.duration} min)`;
            movieSelect.appendChild(option)
        });
    } catch(error) {
        console.error("Error loading movies:", error);
        document.getElementById("movieID").innerHTML = '<option value="">Failed to load movies</option>'
    }
}

async function loadCinemasFromDb() {
    try {
        const response = await fetch("http://localhost:8080/theater")
        const theaters = await response.json()
        const theaterSelect = document.getElementById("theaterID")

        theaterSelect.innerHTML = `<option value="">Select a theater</option>`

        theaters.forEach(theater => {
            const option = document.createElement("option")
            option.value = theater.theaterID
            option.textContent = `${theater.name} (${theater.rows} rows)`
            theaterSelect.appendChild(option)
        })
    } catch (error) {
        console.error("Error loading theaters:", error)
        document.getElementById("theaterID").innerHTML = `<option>Failed to load theaters</option>`
    }

}


loadMoviesFromDb()
loadCinemasFromDb()


document.getElementById("showtimeForm").addEventListener("submit", async function(event) {
    event.preventDefault()

    const movieID = document.getElementById("movieID").value
    const theaterID = document.getElementById("theaterID").value
    const date = document.getElementById("date").value
    const startTime = document.getElementById("startTime").value

    const showTimeData = {
        movie: {movieID: parseInt(movieID)},
        theater: {theaterID: parseInt(theaterID)},
        date: date,
        startTime: startTime + ":00"
    };

    try {
        const response = await fetch("http://localhost:8080/showtime/create", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(showTimeData)
        });
        const result = await response.json()
        document.getElementById("response").textContent = JSON.stringify(result)

        //generateSeatsForShowTime(result.showTimeID)

    } catch(error) {
        console.error("Error:", error)
        document.getElementById("response").textContent ="Failed to create showtime"
    }
});

/*
async function generateSeatsForShowTime(showTimeID) {
    try {
        const response = await fetch(`http://localhost:8080/seat/generateseats/${showTimeID}`, {
            method: "POST"
        });
        const seats = await response.json()
        const seatList = document.getElementById("seatList")
        seatList.innerHTML = "";

        if (seats.length === 0) {
            seatList.innerHTML = "<li>No seats generated :(</li>"
            return
        }

        seats.forEach(seat => {
            const li = document.createElement("li")
            li.textContent = `Seat ${seat.seatNameID} - ${seat.booked ? "Booked" : "Available"}`;
            seatList.appendChild(li)
        })
    } catch(error) {
        console.error("error generating seats:", error)
        document.getElementById("seatList").innerHTML = "<li>Failed to load seats</li>"
    }
}

 */