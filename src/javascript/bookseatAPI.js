const BASE_URL = "http://localhost:8080/seat";

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
