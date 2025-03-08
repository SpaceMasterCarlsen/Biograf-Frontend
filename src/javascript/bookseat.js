import { getSeats } from "./bookseatAPI.js";

document.addEventListener("DOMContentLoaded", async () => {
    const seatsContainer = document.querySelector(".seats-container");
    const showTimeID = 2; // Change to dynamicly fetch
    const selectedSeats = new Set();

    async function initSeats() {
        const seats = await getSeats(showTimeID);
        console.log(seats);
        renderSeats(seats);
    }

    function renderSeats(seats) {
        seatsContainer.innerHTML = ""; // Clear previous seats
        seats.forEach(seat => {
            const seatElement = document.createElement("div");
            seatElement.classList.add("seat");
            seatElement.textContent = seat.seatNameID; // Display seat name (e.g., "A0", "B0")

            if (seat.booked) {
                seatElement.classList.add("booked");
            } else {
                seatElement.classList.add("available");
                seatElement.onclick = () => toggleSelection(seatElement, seat.seatNameID);
            }

            seatsContainer.appendChild(seatElement);
        });
    }


    function toggleSelection(seatElement, seatNumber) {
        if (selectedSeats.has(seatNumber)) {
            selectedSeats.delete(seatNumber);
            seatElement.classList.remove("selected");
            seatElement.classList.add("available");
        } else {
            selectedSeats.add(seatNumber);
            seatElement.classList.remove("available");
            seatElement.classList.add("selected");
        }
    }

    initSeats();
});
