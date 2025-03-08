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
        seatsContainer.innerHTML = "";
        seats.forEach(seat => {
            const seatElement = document.createElement("div");
            seatElement.classList.add("seat");
            seatElement.textContent = seat.seatNumber;

            if (seat.booked) {
                seatElement.classList.add("booked");
            } else {
                seatElement.classList.add("available");
                seatElement.onclick = () => toggleSelection(seatElement, seat.seatNumber);
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
