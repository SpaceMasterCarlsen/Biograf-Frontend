import { getSeats, bookSeat, cancelBooking } from "./bookseatAPI.js";

// Function to get showTimeID from the URL
function getShowTimeID() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('showTimeID');
}

document.addEventListener("DOMContentLoaded", async () => {
    const seatsContainer = document.querySelector(".seats-container");
    const selectedSeats = new Set();
   // const showTimeID = getShowTimeID(); // Get showTimeID from URL params

    const showTimeID = 2; //this line to be removed after hardcoding is no longer needed


    if (showTimeID) {
        await initSeats(showTimeID);
    } else {
        console.error("showTimeID is missing in the URL parameters.");
    }

    // Fetch and render seats based on showTimeID
    async function initSeats() {
        const seats = await getSeats(showTimeID);
        console.log(seats);
        renderSeats(seats);
    }

    // Render seats in the grid
    function renderSeats(seats) {
        seatsContainer.innerHTML = ""; // Clear any existing seats
        seats.forEach(seat => {
            const seatElement = document.createElement("div");
            seatElement.classList.add("seat");
            seatElement.textContent = seat.seatNameID; // Display seat name (e.g., "A0", "B0")

            // Add seat booking and details functionality
            if (seat.booked) {
                seatElement.classList.add("booked");
                console.log("Seat is booked:", seat.seatNameID);  // Debugging line
            } else {
                seatElement.classList.add("available");
                seatElement.onclick = () => toggleSelection(seatElement, seat); // Pass entire seat object
            }

            seatsContainer.appendChild(seatElement);
        });
    }

    // Handle seat selection and display seat details
    function toggleSelection(seatElement, seat) {
        if (selectedSeats.has(seat.seatID)) {
            selectedSeats.delete(seat.seatID);
            seatElement.classList.remove("selected");
            seatElement.classList.add("available");
            cancelBooking(seat.seatID);
        } else {
            selectedSeats.add(seat.seatID);
            seatElement.classList.remove("available");
            seatElement.classList.add("selected");
            bookSeat(seat.seatID);
        }

        // Display seat details below the grid
        displaySeatDetails(seat);
    }

    // Display seat details in a small div underneath the grid
    function displaySeatDetails(seat) {
        const detailsDiv = document.getElementById("seat-details");

        // Set the information in the respective span elements
        document.getElementById("movie-name").textContent = seat.movieName || "N/A";
        document.getElementById("theater-name").textContent = seat.theaterName || "N/A";
        document.getElementById("seat-name").textContent = seat.seatNameID || "N/A";
        document.getElementById("showtime").textContent = showTimeID || "N/A";
        document.getElementById("date").textContent = seat.date || "N/A";
        document.getElementById("time").textContent = seat.time || "N/A";

        // Show the details div and the correct button based on seat status
        detailsDiv.style.display = "block";

        const cancelBtn = document.getElementById("cancel-seat-btn");
        const bookBtn = document.getElementById("book-seat-btn");

        console.log("Booked status for seat:", seat.seatNameID, seat.booked);  // Debugging line

        if (seat.booked) {
            cancelBtn.style.display = "inline-block";  // Show cancel button
            bookBtn.style.display = "none";  // Hide book button
        } else {
            cancelBtn.style.display = "none";  // Hide cancel button
            bookBtn.style.display = "inline-block";  // Show book button
        }

        // Handle cancel booking button click
        cancelBtn.onclick = async () => {
            const cancelResult = await cancelBooking(seat.seatID);
            if (cancelResult) {
                alert("Booking canceled successfully!");
                seatElement.classList.remove("booked");
                seatElement.classList.add("available");
                cancelBtn.style.display = "none";
                bookBtn.style.display = "inline-block";
            } else {
                alert("Failed to cancel booking.");
            }
        };
    }

    // Handle booking functionality when the book seat button is clicked
    document.getElementById("book-seat-btn").addEventListener("click", async () => {
        const seatID = Array.from(selectedSeats).pop(); // Get the last selected seat's ID
        if (seatID) {
            const result = await bookSeat(seatID);
            if (result) {
                alert("Seat booked successfully!");
            } else {
                alert("Failed to book seat.");
            }
        }
    });
});
