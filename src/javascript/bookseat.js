import {bookSeat, cancelBooking, getSeats, getShowTimeIdDetails} from "./bookseatAPI.js";

// ******************* - global variables - *******************

const selectedSeats = new Set();
let theater;
let date;
let time;
let movie;
let showTimeID;

// ******************** - DOM elements - *******************

//modals and overlay
const modal = document.getElementById("modal");
const modalBody = document.querySelector(".modal-body");
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

//seat selection elements
const seatsContainer = document.querySelector(".seats-container");
const seatDetails = document.getElementById("seat-details");



// ******************** - eventlisteners(modal) - *******************


openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

// ******************** - modal functions - *******************

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}


// ******************** - utility to update global variables and fetch from backend - *******************


async function getSeatReservationData(showTimeID) {
    const results = await getShowTimeIdDetails(showTimeID);

    //update the variables
    if (results) {
        theater = results.theater.name || "N/A";
        date = results.date || "N/A";
        time = results.startTime || "N/A";
        movie = results.movie.title || "N/A"

        console.log("Updated Details:");
        console.log("Movie:m ", movie)
        console.log("Theater:", theater);
        console.log("Date:", date);
        console.log("Time:", time);
    } else {
        console.log("Failed to update showtime details.");
    }
}

// ******************** - page loading logic - *******************

document.addEventListener("DOMContentLoaded", async () => {
    //fetches the showtimeID (from the URL) from the helper function at the bottom
    showTimeID = getQueryParam("showTimeID");

    if (showTimeID) {
        await getSeatReservationData(showTimeID);
        await initSeats();
    } else {
        console.error("showTimeID is missing in the URL parameters.");
    }
});

// ******************** - seat rendering and selection - *******************


    // initialize seats by calling get endpoint in backend
async function initSeats() {
        const seats = await getSeats(showTimeID);
        renderSeats(seats);
    }

    // rendering the seats in a grid
function renderSeats(seats) {
        seatsContainer.innerHTML = ""; // to clear existing seats

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
                seatElement.classList.add("selected"); // this keeps the selected seats highlighted
            }

            seatElement.dataset.seatId = seat.seatID; // store seat ID for updates
            seatsContainer.appendChild(seatElement); //and append the seat
        });
    }

    // handle seat selection, display details and update the ui
function toggleSelection(seatElement, seat) {

    const seatID = seat.seatID.toString()

    if (selectedSeats.has(seatID)) {
        selectedSeats.delete(seatID);
        seatElement.classList.remove("selected");
    } else {
        selectedSeats.add(seatID);
        seatElement.classList.add("selected");
    }

    displaySeatDetails();
}

// to display seat details
function displaySeatDetails() {
    if (selectedSeats.size === 0) {
        seatDetails.innerHTML = "<p>Vælg et sæde for at se detaljer</p>"
        return
    }

    const seatnames = loopSeatsHelper(selectedSeats)

    seatDetails.innerHTML = `
       <p><strong>Film:</strong> ${movie}</p>
       <p><strong>Theater:</strong> ${theater}</p>
       <p><strong>Sæde:</strong> ${seatnames || "N/A"}</p>
       <p><strong>Visning:</strong> ${showTimeID || "N/A"}</p>
       <p><strong>Dato:</strong> ${date}</p>
       <p><strong>Klokken:</strong> ${time}</p>
       <button id="book-seat-btn">Book Sæde</button>
       <button id="cancel-seat-btn">Annuller Booking</button>
   `;

    seatDetails.style.display = "block";

    document.getElementById("cancel-seat-btn").onclick = handleCancelBooking

        // booking button event listener
    document.getElementById("book-seat-btn").onclick = handleBooking

    }

// ******************** - booking logic - *******************

// for booking
async function handleBooking() {
    if (selectedSeats.size === 0) {
        alert("Vælg mindst et sæde!")
        return
    }

    //convert to Array for sending the JSON to the backend (sends an array of IDs)
    const seatIDs = Array.from(selectedSeats)
    const success = await bookSeat(seatIDs)
        if(success) {
            seatIDs.forEach(seatID => updateSeatUI(seatID, true));
            showBookingConfirmation()
        } else {
            alert("Nogle sæder kunne ikke bookes")
        }
}

//for canceling a booking - as of now, the endpoint doesn't take a list so this is only proof of concept
async function handleCancelBooking() {
    if(selectedSeats.size === 0) {
        alert("Vælg mindst et sæde!")
        return
    }

    const seatIDs = Array.from(selectedSeats)
    const succces = await cancelBooking(selectedSeats)
        if(succces) {
            seatIDs.forEach(seatID => updateSeatUI(seatID, true))
            alert("Booking er hermed annuleret")
        } else {
            alert("Bookingen kunne ikke annuleres")
        }

}


// ******************** - show booking logic - *******************

function showBookingConfirmation() {
    const seatnames = loopSeatsHelper(selectedSeats)

    modalBody.innerHTML = `
       <h3>✅ Du har booket!</h3>
       <p><strong>Film:</strong> ${movie}</p>
       <p><strong>Theater:</strong> ${theater}</p>
       <p><strong>Sæde:</strong> ${seatnames || "N/A"}</p>
       <p><strong>Visnings nummer:</strong> ${showTimeID || "N/A"}</p>
       <p><strong>Dato:</strong> ${date}</p>
       <p><strong>Klokken:</strong> ${time}</p>
   `;

    openModal(modal);
    selectedSeats.clear()
    displaySeatDetails()
}

// update seat UI dynamically (no reload) after a booking or cancelation
function updateSeatUI(seatID, isBooked) {
    const seatElement = document.querySelector(`[data-seat-id='${seatID}']`);
    if (seatElement) {
        seatElement.classList.toggle("booked", isBooked);
        seatElement.classList.toggle("available", !isBooked);
        if (isBooked) {
            seatElement.classList.remove("selected"); //this removes selection highlighting
        }
    }
}


function positionSeatDetails(seatElement) {
    const details = seatDetails

    // ensures that details are visible
    details.style.display = "block";

    // this gets seat position (relative to the viewport)
    const seatRect = seatElement.getBoundingClientRect();

    // positions the ticket details near the seat
    details.style.position = "absolute";
    details.style.left = `${seatRect.right + 10}px`; // 10px to the right of the seat
    details.style.top = `${seatRect.top}px`; // and align with the top of the seat
}

// attaching eventlisteners to all seats
document.querySelectorAll(".seat").forEach(seat => {
    seat.addEventListener("click", function () {
        positionSeatDetails(this);
    });
});


//helper function for showing array of seats (a comma-seperated string of selected seat names
//this is needed for showing the seats in the booking
function loopSeatsHelper(selectedSeats) {
    return Array.from(selectedSeats)
        .map(seatID => {
            const seatElement = document.querySelector(`[data-seat-id='${seatID}']`);
            return seatElement ? seatElement.textContent : "Ukendt sæde";
        })
        .join(", ");
}

//to get showtimeID from queryParams
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}


