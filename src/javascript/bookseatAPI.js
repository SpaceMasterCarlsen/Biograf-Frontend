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

export {getSeats};