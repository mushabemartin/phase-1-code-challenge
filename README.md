# FlatDango Movie Booking Website

FlatDango is a web application that allows users to browse and book movie tickets. This repository contains both frontend and backend components of the application, providing a seamless movie booking experience.

![FlatDango Screenshot](flatdango-screenshot.png)

## Features

- **Movie Selection**: Browse a list of currently showing movies.
- **Movie Details**: View movie information including title, runtime, showtimes, and available tickets.
- **Seat Selection**: Select and book seats for a movie.
- **Seat Reservation Persistence**: Booked seats remain marked as "booked" even after page refresh.
- **Realistic Seat Layout**: Seat selection is presented visually with a realistic layout.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: JSON Server
- **Fetch API**: For making HTTP requests between the frontend and backend.

## Prerequisites

- Node.js and npm should be installed on your system.
- JSON Server is used for simulating a backend. Install it globally with `npm install -g json-server`.

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/flatdango.git

1. Navigate to the project directory:

      cd flatdango

2. Install the project dependencies:

        npm install

   Start the Backend Server
   Start the JSON Server to simulate the backend with the provided db.json file:

    json-server --watch db.json
    The server runs on http://localhost:3000.

        Start the Frontend
Open a new terminal window and navigate to the project directory:

        cd flatdango
Start the frontend application:

         npm start
The application will run in your default web browser on http://localhost:8000.

      Using the Application
Browse the list of movies and click the "Reserve" button to book tickets for a movie.
Select the seats you want to book and click the "Book Tickets" button.
The selected seats will turn red to indicate they are booked.
Booked seats persist even after a page refresh.
Customization
Modify the db.json file to change movie data, showtimes, and available seats.
Customize the styles by editing the seat-selection.css file.
License
This project is licensed under the MIT License - see the LICENSE file for details.

       Acknowledgments
This project is designed for educational purposes and may not include real-time data.
JSON Server is used for simulating a backend. In a real-world application, a more robust backend should be implemented.
Contact
For any questions or inquiries, please contact Your Name.


Please replace `your-username`, `your-username/flatdango.git`, and `[Your Name](mailto:your.email@example.com)` with your actual username, repository URL, and contact information.
