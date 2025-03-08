import { getSeats, bookSeat, cancelBooking } from "./bookseatAPI.js";

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
        <p><strong>Movie:</strong> ${seat.movieName || "N/A"}</p>
        <p><strong>Theater:</strong> ${seat.theaterName || "N/A"}</p>
        <p><strong>Seat:</strong> ${seat.seatNameID || "N/A"}</p>
        <p><strong>Showtime:</strong> ${seat.showTimeID || "N/A"}</p>
        <p><strong>Date:</strong> ${seat.date || "N/A"}</p>
        <p><strong>Time:</strong> ${seat.time || "N/A"}</p>
        <button id="book-seat-btn">Book Seat</button>
        <button id="cancel-seat-btn">Cancel Booking</button>
    `;

        seatDetails.style.display = "block";

        document.getElementById("cancel-seat-btn").onclick = async () => {
            const success = await cancelBooking(seat.seatID);
            if (success) {
                updateSeatUI(seat.seatID, false);
                alert("Booking canceled successfully!");
            } else {
                alert("Failed to cancel booking.");
            }
        };

        document.getElementById("book-seat-btn").onclick = async () => {
            const success = await bookSeat(seat.seatID);
            if (success) {
                updateSeatUI(seat.seatID, true);
                alert("Seat booked successfully!");
            } else {
                alert("Failed to book seat.");
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
