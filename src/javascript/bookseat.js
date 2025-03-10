import { getSeats, bookSeat, cancelBooking, getShowTimeIdDetails } from "./bookseatAPI.js";

let theater;
let date;
let time;
let movie;

async function getSeatReservationData(showTimeID) {
    const results = await getShowTimeIdDetails(showTimeID);

    if (results) { //fetch the variables from the backend entity class
        theater = results.theater.name || "N/A";
        date = results.date || "N/A";
        time = results.startTime || "N/A";
        movie = results.movie.name || "N/A"

        console.log("Updated Details:");
        console.log("Theater:", theater);
        console.log("Date:", date);
        console.log("Time:", time);
    } else {
        console.log("Failed to update showtime details.");
    }
}

// Function to get showTimeID from the URL
function getShowTimeID() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('showTimeID');
}

document.addEventListener("DOMContentLoaded", async () => {
    const seatsContainer = document.querySelector(".seats-container");
    const selectedSeats = new Set();
    const showTimeID = 2; // Hardcoded for now, remove later

    const seatDetails = document.getElementById("seat-details");

    if (showTimeID) {
        await initSeats();
        await getSeatReservationData(showTimeID);
    } else {
        console.error("showTimeID is missing in the URL parameters.");
    }

    // Initialize seat layout
    async function initSeats() {
        const seats = await getSeats(showTimeID);
        renderSeats(seats);
    }

    // Render seats in the grid
    function renderSeats(seats) {
        seatsContainer.innerHTML = ""; // Clear existing seats

        seats.forEach(seat => {
            const seatElement = document.createElement("div");
            seatElement.classList.add("seat");
            seatElement.textContent = seat.seatNameID;

            if (seat.booked) {
                seatElement.classList.add("booked");
            } else {
                seatElement.classList.add("available");
                seatElement.onclick = () => toggleSelection(seatElement, seat);
            }

            if (selectedSeats.has(seat.seatID)) {
                seatElement.classList.add("selected"); // Keep selected seats highlighted
            }

            seatElement.dataset.seatId = seat.seatID; // Store seat ID for updates
            seatsContainer.appendChild(seatElement);
        });
    }

    // Handle seat selection and display details
    function toggleSelection(seatElement, seat) {
        if (selectedSeats.has(seat.seatID)) {
            selectedSeats.delete(seat.seatID);
            seatElement.classList.remove("selected");
        } else {
            selectedSeats.add(seat.seatID);
            seatElement.classList.add("selected");
        }

        displaySeatDetails(seat);
    }

    // Display seat details
    function displaySeatDetails(seat) {
        seatDetails.innerHTML = `
        <p><strong>Film:</strong> ${movie}</p>
        <p><strong>Theater:</strong> ${theater}</p>
        <p><strong>Sæde:</strong> ${seat.seatNameID || "N/A"}</p>
        <p><strong>Visning:</strong> ${showTimeID || "N/A"}</p>
        <p><strong>Dato:</strong> ${date}</p>
        <p><strong>Klokken:</strong> ${time}</p>
        <button id="book-seat-btn">Book Sæde</button>
        <button id="cancel-seat-btn">Annuller Booking</button>
    `;

        seatDetails.style.display = "block";

        document.getElementById("cancel-seat-btn").onclick = async () => {
            const success = await cancelBooking(seat.seatID);
            if (success) {
                updateSeatUI(seat.seatID, false);
                alert("Bookingingen er hermed annulleret!");
            } else {
                alert("Bookingen kunne ikke annulleres.");
            }
        };

        document.getElementById("book-seat-btn").onclick = async () => {
            const success = await bookSeat(seat.seatID);
            if (success) {
                updateSeatUI(seat.seatID, true);
                alert("Sædet er hermed booked!");
            } else {
                alert("Sædet kunne ikke bookes.");
            }
        };
    }


    // Update seat UI dynamically (no reload)
    function updateSeatUI(seatID, isBooked) {
        const seatElement = document.querySelector(`[data-seat-id='${seatID}']`);
        if (seatElement) {
            seatElement.classList.toggle("booked", isBooked);
            seatElement.classList.toggle("available", !isBooked);
        }
    }
});
