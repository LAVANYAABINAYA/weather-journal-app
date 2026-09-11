# 🌤️ Weather Journal App

A full stack web app that lets you check live weather for any city and save it alongside a personal note — building a simple journal of your days and the weather that came with them.

## Live Demo
🔗 [Coming soon]

## Features
- Search live weather for any city worldwide
- Save daily journal entries with weather data attached
- View a history of all past entries
- Delete entries you no longer want
- Fully responsive design (works on mobile too)

## Tech Stack
**Frontend:** React, CSS3
**Backend:** Node.js, Express
**Database:** MongoDB (Mongoose)
**External API:** OpenWeatherMap API
**Version Control:** Git & GitHub

## How It Works
1. User enters a city name and clicks "Get Weather"
2. App fetches live weather data from the OpenWeatherMap API
3. User writes a note and saves the entry
4. Entry (city, temperature, condition, note, date) is stored in MongoDB via an Express backend
5. All saved entries are displayed in a scrollable list, with the option to delete any entry

## Screenshots
![App Screenshot](screenshot.png)

## Running Locally

### Prerequisites
- Node.js installed
- A free MongoDB Atlas account
- A free OpenWeatherMap API key

### Setup
1. Clone the repo
2. git clone https://github.com/LAVANYAABINAYA/weather-journal-app.git
   cd server
npm install

   Create a `.env` file in the `server` folder with:

MONGO_URI=your_mongodb_connection_string
PORT=5000
WEATHER_API_KEY=your_openweathermap_api_key

   Then run:

node index.js


3. Set up the frontend (in a new terminal)

cd client
npm install
npm start


4. Open `http://localhost:3000` in your browser

## What I Learned
Building this project helped me understand how the different layers of a full stack app connect — from a React frontend, through an Express API, to a MongoDB database — and how to safely work with API keys and environment variables in a real project.

## Author
**Lavanya Abinayaa**
B.Tech IT Student | AWS Certified AI Practitioner
