// Define the base URL for the API
const BASE_URL = 'http://localhost:3000'; // Replace with your API URL

// Function to fetch and populate the movie list in the movie menu
async function populateMovieMenu() {
    try {
        const response = await fetch(`${BASE_URL}/films`);
        const movieList = await response.json();

        const movieMenu = document.getElementById('films');

        movieList.forEach((movie) => {
            const listItem = document.createElement('li');
            listItem.classList.add('film', 'item');
            listItem.textContent = movie.title;
            // Create a Buy Ticket button here if needed

            movieMenu.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching movie menu:', error);
    }
}

// Function to fetch movie details and populate the movie listings
async function populateMovieList() {
    try {
        const response = await fetch(`${BASE_URL}/films`);
        const movieList = await response.json();

        const movieListSection = document.getElementById('movie-list');

        movieList.forEach((movie) => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.setAttribute('data-movie', movie.id);

            // Create and set the movie details
            const movieImage = document.createElement('img');
            movieImage.src = movie.poster;
            movieImage.alt = `Movie ${movie.id}`;

            const movieTitle = document.createElement('h2');
            movieTitle.textContent = movie.title;

            const movieRuntime = document.createElement('p');
            movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;

            const movieShowtime = document.createElement('p');
            movieShowtime.textContent = `Showtime: ${movie.showtime}`;

            const availableTickets = document.createElement('p');
            const remainingTickets = movie.capacity - movie.tickets_sold;
            availableTickets.textContent = `Available Tickets: ${remainingTickets}`;

            const reserveButton = document.createElement('button');
            reserveButton.classList.add('reserve-btn');
            reserveButton.setAttribute('data-movie', movie.id);
            reserveButton.textContent = 'Reserve';

            const seatsContainer = document.createElement('div');
            seatsContainer.classList.add('seats-container');

            // Append all elements to the movieDiv
            movieDiv.appendChild(movieImage);
            movieDiv.appendChild(movieTitle);
            movieDiv.appendChild(movieRuntime);
            movieDiv.appendChild(movieShowtime);
            movieDiv.appendChild(availableTickets);
            movieDiv.appendChild(reserveButton);
            movieDiv.appendChild(seatsContainer);

            movieListSection.appendChild(movieDiv);
        });
    } catch (error) {
        console.error('Error fetching movie list:', error);
    }
}

// Initial function calls
populateMovieMenu();
populateMovieList();


let currentSlide = 0;
const slides = document.querySelectorAll('#image-carousel img');

function showSlide(slideIndex) {
    slides.forEach((slide, index) => {
        slide.style.display = index === slideIndex ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

showSlide(currentSlide);
setInterval(nextSlide, 5000); // Auto-play the carousel


// JavaScript for movie reservation and seat selection

const reserveButtons = document.querySelectorAll('.reserve-btn');

// Function to handle "Reserve" button clicks
function handleReserveButtonClick(event) {
    const movieId = event.target.getAttribute('data-movie');
    const targetPage = document.querySelector(`[data-movie="${movieId}"]`).getAttribute('data-target');
    
    // Redirect to the corresponding seat selection page
    window.location.href = targetPage;
}

// Add click event listeners to "Reserve" buttons
reserveButtons.forEach((button) => {
    button.addEventListener('click', handleReserveButtonClick);
});


document.addEventListener("DOMContentLoaded", () => {
    // Get the available seats count from localStorage or set it to the total number of seats
    let availableSeats = localStorage.getItem('availableSeats');
    if (availableSeats === null) {
        availableSeats = totalSeats; // Assuming 'totalSeats' is defined on this page
    }
    
    // Update the available seats count on the page
    const availableSeatsElement = document.getElementById('available-seats');
    availableSeatsElement.textContent = availableSeats;

    // ...other code...
});

document.addEventListener("DOMContentLoaded", () => {
    // ... Other code ...

    const seatsContainer = document.getElementById('seats');
    const showtimeSelect = document.getElementById('showtime-select');
    const bookTicketsButton = document.getElementById('book-tickets');

    // Track selected seats
    const selectedSeats = new Set();
    // Track booked seats
    const bookedSeats = new Set();

    // Function to toggle seat selection
    function toggleSeatSelection(seat) {
        if (bookedSeats.has(seat)) {
            return; // Don't allow selecting booked seats
        }

        seat.classList.toggle('selected-seat');
        const seatNumber = 'Seat ' + seat.textContent;
        if (selectedSeats.has(seatNumber)) {
            selectedSeats.delete(seatNumber);
        } else {
            selectedSeats.add(seatNumber);
        }
    }

    // Function to mark a seat as booked
    function markSeatAsBooked(seat) {
        seat.classList.add('booked-seat');
        bookedSeats.add('Seat ' + seat.textContent);
    }

    // Event listeners for seat selection
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
        // Clear the selected seats
        selectedSeats.clear();
        // Enable all seats
        seatsContainer.querySelectorAll('.seat').forEach((seat) => {
            seat.classList.remove('booked-seat');
            seat.style.pointerEvents = 'auto'; // Enable pointer events for seats
        });
    });

    // ... Other code ...
});

document.addEventListener("DOMContentLoaded", () => {
    // Function to book a seat and persist the state
    function bookSeat(seatElement) {
        // Check if the seat is already booked
        if (!seatElement.classList.contains('booked-seat')) {
            seatElement.classList.add('booked-seat'); // Add the class to mark it as booked
            // Persist the booked seat to local storage
            saveBookedSeat(seatElement.id);
        }
    }

    // Function to save a booked seat to local storage
    function saveBookedSeat(seatId) {
        // Retrieve the previously booked seats from local storage
        const bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];
        bookedSeats.push(seatId);

        // Save the updated list of booked seats to local storage
        localStorage.setItem('bookedSeats', JSON.stringify(bookedSeats));
    }

    // Load previously booked seats from local storage
    const bookedSeats = JSON.parse(localStorage.getItem('bookedSeats')) || [];

    // Loop through the booked seats and mark them as booked
    bookedSeats.forEach((seatId) => {
        const seatElement = document.getElementById(seatId);
        if (seatElement) {
            seatElement.classList.add('booked-seat');
        }
    });

    // Add event listeners to book seats, e.g., when a user clicks on a seat
    const seats = document.querySelectorAll('.seat');
    seats.forEach((seat) => {
        seat.addEventListener('click', () => {
            bookSeat(seat);
        });
    });

    // Your other code for seat selection
});

const express = require('express');
const jsonServer = require('json-server');

const app = express();

// Create a JSON database (e.g., db.json) using json-server
const router = jsonServer.router('db.json');

app.use('/api', router);

// Your custom routes for booking and retrieving seat data
// Add routes for booking seats, retrieving booked seats, etc.

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
