require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define the schema for a journal entry
const entrySchema = new mongoose.Schema({
  city: String,
  temperature: Number,
  weatherCondition: String,
  note: String,
  date: { type: Date, default: Date.now }
});

const Entry = mongoose.model('Entry', entrySchema);

// Routes
app.get('/entries', async (req, res) => {
  const entries = await Entry.find().sort({ date: -1 });
  res.json(entries);
});

app.post('/entries', async (req, res) => {
  const { city, temperature, weatherCondition, note } = req.body;
  const newEntry = new Entry({ city, temperature, weatherCondition, note });
  await newEntry.save();
  res.json(newEntry);
});

app.delete('/entries/:id', async (req, res) => {
  await Entry.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));