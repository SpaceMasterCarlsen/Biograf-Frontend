
//a function to get query parameters (date from click on calendar)
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}

const selectedDate = getQueryParam("date")

document.getElementById("selected-date").textContent = selectedDate

async function fetchShowtimes(date) {
    try {
        const response = await fetch(`http://localhost:8080/showtime/date/${date}`)
        if (!response.ok){
            throw new Error("Failed to fetch showtime")
        }

        const showtimes = await response.json()
        displayShowtimes(showtimes)
    }catch (error) {
        console.error("Error fetching showtimes:", error)
        document.getElementById("showtime-list").innerHTML = "<p>Failed to load showtimes.</p>";
    }
}

function displayShowtimes(showtimes) {
    const showtimeContainer = document.getElementById("showtime-list")
    showtimeContainer.innerHTML = ""

    if(showtimes.length === 0) {
        showtimeContainer.innerHTML = "<p>No showtimes available for this date.</p>"
    }

    showtimes.forEach(showtime => {
        const showtimeElement = document.createElement("div")
        showtimeElement.innerHTML = `
            <h3>${showtime.movie.title}</h3>
            <p>Theater: ${showtime.theater.name}</p>
            <p>Start time: ${showtime.startTime}</p>
            <hr>
            `;
        showtimeContainer.appendChild(showtimeElement)
    });

}

if(selectedDate) {
    fetchShowtimes(selectedDate)
}
