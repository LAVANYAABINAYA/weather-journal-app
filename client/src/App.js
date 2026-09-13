import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');
  const [weather, setWeather] = useState(null);
  const [entries, setEntries] = useState([]);

  const API_KEY = '947af4eeeb05dd9139e4542a4deda22d';
  const BACKEND_URL = 'https://weather-journal-app-32eb.onrender.com';

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const res = await fetch(`${BACKEND_URL}/entries`);
    const data = await res.json();
    setEntries(data);
  };

  const handleGetWeather = async () => {
    if (!city) return alert('Enter a city first');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        alert('City not found');
        return;
      }
      setWeather(data);
    } catch (err) {
      alert('Error fetching weather');
    }
  };

  const handleSave = async () => {
    if (!weather) return alert('Get the weather first');
    await fetch(`${BACKEND_URL}/entries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        city: weather.name,
        temperature: weather.main.temp,
        weatherCondition: weather.weather[0].description,
        note: note
      })
    });
    setCity('');
    setNote('');
    setWeather(null);
    fetchEntries();
  };

  const handleDelete = async (id) => {
    await fetch(`${BACKEND_URL}/entries/${id}`, { method: 'DELETE' });
    fetchEntries();
  };

  return (
    <div className="app-container">
      <h1 className="app-title">🌤️ Weather Journal</h1>

      <div className="card">
        <div className="input-row">
          <input
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={handleGetWeather}>Get Weather</button>
        </div>

        {weather && (
          <div className="weather-preview">
            📍 <strong>{weather.name}</strong> — {weather.main.temp}°C, {weather.weather[0].description}
          </div>
        )}

        <textarea
          placeholder="Write a note about your day..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button onClick={handleSave}>Save Entry</button>
      </div>

      <h2 className="entries-title">Past Entries</h2>

      {entries.length === 0 && (
        <div className="empty-state">No entries yet — save your first one above!</div>
      )}

      {entries.map((entry) => (
        <div key={entry._id} className="entry-card">
          <div className="entry-header">
            <span className="entry-city">{entry.city}</span>
            <span className="entry-weather">{entry.temperature}°C, {entry.weatherCondition}</span>
          </div>
          <p className="entry-note">{entry.note}</p>
          <div className="entry-footer">
            <span className="entry-date">{new Date(entry.date).toLocaleString()}</span>
            <button className="delete-btn" onClick={() => handleDelete(entry._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;