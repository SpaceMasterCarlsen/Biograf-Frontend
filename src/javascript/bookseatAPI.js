const BASE_URL = "http://localhost:8080/seat";

const ShowTimeDetailsUrl = "http://localhost:8080/showtime";

//keeping it incase it will be needed later
async function getShowTimeIdDetails(id) {
    try {
        console.log("Fetching showtime details for ID:", id); // Log the ID to ensure it's passed correctly
        const response = await fetch(`${ShowTimeDetailsUrl}/${id}`);

        if (!response.ok) {
            throw new Error('Showtime not found');
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching show time ID details:", error);
        return null;  // Return null in case of error
    }
}


async function getSeats(showTimeID) {
    try {
        const response = await fetch(`${BASE_URL}/allSeats/${showTimeID}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching seats:", error);
        return [];
    }
}



async function bookSeat(seatID) {
    try {
        const response = await fetch(`${BASE_URL}/bookseat/${seatID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Seat booked successfully!');
            return true;
        } else {
            console.log('Failed to book seat');
            return false;
        }
    } catch (error) {
        console.error('Error booking seat:', error);
        return false;
    }
}

async function cancelBooking(seatID) {
    try {
        const response = await fetch(`${BASE_URL}/unbookseat/${seatID}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Booking canceled successfully!');
            return true;
        } else {
            console.log('Failed to cancel booking');
            return false;
        }
    } catch (error) {
        console.error('Error canceling booking:', error);
        return false;
    }
}

export { getSeats, bookSeat, cancelBooking };
