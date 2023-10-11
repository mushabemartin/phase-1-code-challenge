document.addEventListener("DOMContentLoaded", () => {
    const movieList = document.getElementById("movie");
    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const runtime = document.getElementById("runtime");
    const showtime = document.getElementById("showtime");
    const ticketsAvailable = document.getElementById("tickets-available");
    const buyTicketButton = document.getElementById("buy-ticket")});

    // JavaScript for movie seat selection

const seatsContainer = document.getElementById('seats');
const bookTicketsButton = document.getElementById('book-tickets');

// Define the total number of seats
const totalSeats = 80; // Total number of seats

// Function to generate seat layout
function generateSeatLayout() {
    for (let seatNumber = 1; seatNumber <= totalSeats; seatNumber++) {
        const seat = document.createElement('div');
        seat.classList.add('seat');
        seat.textContent = seatNumber; // Assign the seat number
        seatsContainer.appendChild(seat);
    }
}

generateSeatLayout();

// Function to handle seat selection
function toggleSeatSelection(seat) {
    seat.classList.toggle('selected');
}

// Event listeners for seat selection
seatsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat')) {
        toggleSeatSelection(event.target);
    }
});

// Event listener for booking tickets
bookTicketsButton.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert('Please select at least one seat.');
    } else {
        const seatNumbers = Array.from(selectedSeats).map((seat) => {
            // Get the seat number or any other relevant data
            return 'Seat ' + seat.textContent;
        });
        alert(`You have booked the following seats:\n${seatNumbers.join('\n')}`);
    }
})

document.addEventListener("DOMContentLoaded", () => {
    // Declare seatsContainer outside of the event listeners
    const seatsContainer = document.getElementById('seats');
    const showtimeSelect = document.getElementById('showtime-select');
    const bookTicketsButton = document.getElementById('book-tickets');
    const availableTicketsElement = document.getElementById('available-tickets');

    // Track selected seats
    const selectedSeats = new Set();

    // Track booked seats
    const bookedSeats = new Set();

    // Function to toggle seat selection
    function toggleSeatSelection(seat) {
        const seatNumber = 'Seat ' + seat.textContent;
        if (bookedSeats.has(seatNumber)) {
            return; // Don't allow selecting booked seats
        }

        seat.classList.toggle('selected-seat');
        if (selectedSeats.has(seatNumber)) {
            selectedSeats.delete(seatNumber);
        } else {
            selectedSeats.add(seatNumber);
        }
    }

    // Function to mark a seat as booked
    function markSeatAsBooked(seat) {
        seat.classList.add('booked-seat');
        const seatNumber = 'Seats' + seat.textContent;
        bookedSeats.add(seatNumber);
        // Reduce the available tickets count
        availableTickets--;
        // Update the available tickets count on the page
        updateAvailableTickets();
    }

    // Function to update the available tickets count on the page
    function updateAvailableTickets() {
        availableTicketsElement.textContent = availableTickets;
    }

    // Event listener for seat selection
    seatsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('seat')) {
            toggleSeatSelection(event.target);
        }
    });

    // Event listener for booking tickets
    bookTicketsButton.addEventListener('click', () => {
        if (selectedSeats.size === 0) {
            alert('Please select at least one seat.');
        } else {
            // Mark selected seats as booked
            selectedSeats.forEach((seatNumber) => {
                const seat = document.querySelector(`.seat:contains("${seatNumber}")`);
                if (seat) {
                    markSeatAsBooked(seat);
                }
            });
            // Clear the selected seats
            selectedSeats.clear();
        }
    });

    // Event listener for changing showtime
    showtimeSelect.addEventListener('change', () => {
        // Clear the selected seats and reset visual selection
        selectedSeats.forEach((seatNumber) => {
            const seat = document.querySelector(`.seat:contains("${seatNumber}")`);
            if (seat) {
                seat.classList.remove('selected-seat');
            }
        });

        // Enable all seats
        seatsContainer.querySelectorAll('.seat').forEach((seat) => {
            seat.style.pointerEvents = 'auto'; // Enable pointer events for seats
        });
    });

    // Initialize the available tickets count
    let availableTickets = 80; // Replace with the actual available tickets for the selected movie
    updateAvailableTickets(); // Initialize the available tickets count

    // ...other code...
});

document.addEventListener("DOMContentLoaded", () => {
    // Initialize the available seats and booked seats count
    let availableSeats = 80; // Change this to the actual available seats count
    let bookedSeats = 0;

    // Function to book a seat
    function bookSeat() {
        if (availableSeats > 0) {
            bookedSeats++;
            availableSeats--;
        } else {
            alert('sold out')
        }

        // Update the available seats count on the page
        const availableSeatsElement = document.getElementById('available-seats');
        availableSeatsElement.textContent = availableSeats;
    }

    // Add event listeners to your book button, for example:
    const bookButton = document.getElementById('book-tickets');
    bookButton.addEventListener('click', () => {
        // Simulate booking a seat when the button is clicked
        bookSeat();
    });

    // You can also update availableSeats based on your real booking system
});


// Function to book a seat and persist the state
function bookSeat(seatElement) {
    // Check if the seat is already booked
    if (!seatElement.classList.contains('booked-seat')) {
        seatElement.classList.add('booked-seat'); // Add the class to mark it as booked
        // Send a POST request to book the seat on the server
        bookSeatOnServer(seatElement.id);
    }
}

// Function to send a POST request to book a seat on the server
function bookSeatOnServer(seatId) {
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ seatId }),
    })
        .then((response) => response.json())
        .then((data) => {
            // Handle the response if needed
        })
        .catch((error) => {
            console.error('Error booking seat:', error);
        });
}

// Load previously booked seats from the server
function loadBookedSeatsFromServer() {
    fetch('/api/bookedSeats')
        .then((response) => response.json())
        .then((bookedSeats) => {
            // Loop through the booked seats and mark them as booked
            bookedSeats.forEach((seatId) => {
                const seatElement = document.getElementById(seatId);
                if (seatElement) {
                    seatElement.classList.add('booked-seat');
                }
            });
        })
        .catch((error) => {
            console.error('Error loading booked seats:', error);
        });
}

// Call the function to load booked seats when the page loads
loadBookedSeatsFromServer();
