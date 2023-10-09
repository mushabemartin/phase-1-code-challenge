
// Find all the "Reserve" buttons (assuming you have multiple movies with reserve buttons)
const reserveButtons = document.querySelectorAll('.reserve-btn');

// Add a click event listener to each "Reserve" button
reserveButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Scroll to the "seat-selection" section smoothly
        document.querySelector('#seat-selection').scrollIntoView({ behavior: 'smooth' });
    });
});

// JavaScript for movie reservation and seat selection

const movieButtons = document.querySelectorAll('.reserve-btn');
const seatsContainer = document.getElementById('seats');
const bookTicketsButton = document.getElementById('book-tickets');

// Define seat layout, e.g., rows and columns
const totalSeats = 80; // Total number of seats

for (let seatNumber = 1; seatNumber <= totalSeats; seatNumber++) {
    const seat = document.createElement('div');
    seat.classList.add('seat');
    seat.textContent = seatNumber; // Assign the seat number
    seatsContainer.appendChild(seat);
}

// Function to generate seat layout
function generateSeatLayout() {
    // Your seat layout generation logic goes here
    // Modify this function to generate rows and columns as needed
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
});

// Define the base URL for the API
const BASE_URL = 'http://localhost:3000';

// Function to fetch movie details by ID
async function fetchMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/films/${movieId}`);
        const movieData = await response.json();

        // Update the movie-details section with movieData
        const movieDetailsSection = document.getElementById('movie-details');
        // Create HTML elements and populate them with movieData
        // Append them to the movie-details section
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

// Function to fetch and populate the movie list
async function populateMovieList() {
    try {
        const response = await fetch(`${BASE_URL}/films`);
        const movieList = await response.json();

        // Clear any existing movie listings
        const movieListSection = document.getElementById('movie-list');
        movieListSection.innerHTML = '';

        movieList.forEach((movie) => {
            // Create an <div> element for each movie and add details
            // Append it to the movieListSection
        });

        // Add event listeners to movie listings to display details
        // Use fetchMovieDetails to get details when a movie is clicked
    } catch (error) {
        console.error('Error fetching movie list:', error);
    }
}

// Initial function calls
populateMovieList();
fetchMovieDetails(1); // Display details of the first movie on page load

// Fetch the first movie's details when the page loads
async function fetchFirstMovieDetails() {
    try {
        const response = await fetch('http://localhost:3000/films/1');
        const movieData = await response.json();

        const moviePoster = document.querySelector('#movie-details img');
        const movieTitle = document.querySelector('#movie-details h2');
        const movieRuntime = document.querySelector('#movie-details p:nth-child(2)');
        const movieShowtime = document.querySelector('#movie-details p:nth-child(3)');
        const availableTickets = document.querySelector('#movie-details p:nth-child(4)');
        const buyTicketButton = document.querySelector('#movie-details .buy-ticket-btn');

        moviePoster.src = movieData.poster;
        movieTitle.textContent = movieData.title;
        movieRuntime.textContent = `Runtime: ${movieData.runtime} minutes`;
        movieShowtime.textContent = `Showtime: ${movieData.showtime}`;
        const remainingTickets = movieData.capacity - movieData.tickets_sold;
        availableTickets.textContent = `Available Tickets: ${remainingTickets}`;
        buyTicketButton.addEventListener('click', () => buyTicket(1, remainingTickets)); // Call the buyTicket function
    } catch (error) {
        console.error('Error fetching movie details:', error);
    }
}

fetchFirstMovieDetails();

// Function to handle buying a ticket
function buyTicket(movieId, remainingTickets) {
    if (remainingTickets > 0) {
        // Implement code to decrease available tickets (on the frontend)
        // You can also send a request to update tickets_sold on the server (extra bonus).
        remainingTickets--;
        availableTickets.textContent = `Available Tickets: ${remainingTickets}`;
    } else {
        alert('This movie is sold out.');
    }
}

