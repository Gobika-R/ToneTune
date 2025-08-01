const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const DATASET_DIR = path.join(__dirname, '../mightymerge.io__km2b3us0');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + GEMINI_API_KEY;

console.log('GEMINI_API_KEY loaded:', GEMINI_API_KEY ? 'YES' : 'NO');
console.log('GEMINI_API_URL:', GEMINI_API_URL);

const app = express();
app.use(express.json());
app.use(cors());

let dataset = [];

// Load all CSVs and merge into dataset
function loadDataset() {
  dataset = [];
  const files = fs.readdirSync(DATASET_DIR).filter(f => f.endsWith('.csv'));
  files.forEach(file => {
    fs.createReadStream(path.join(DATASET_DIR, file))
      .pipe(csv())
      .on('data', (row) => {
        dataset.push(row);
      });
  });
}

// Call this at startup
loadDataset();

// Simple retrieval: find the most similar original sentence (case-insensitive substring match)
function retrieveExample(sentence) {
  const lower = sentence.toLowerCase();
  return dataset.find(row => row.Original && lower.includes(row.Original.toLowerCase())) || dataset[0];
}

// POST /rephrase { sentence, tone }
app.post('/rephrase', async (req, res) => {
  const { sentence, tone } = req.body;
  if (!sentence || !tone) return res.status(400).json({ error: 'Missing sentence or tone' });

  // Retrieve example
  const example = retrieveExample(sentence);
  const context = `Original: ${example.Original}\nPolite: ${example.Polite}\nProfessional: ${example.Professional}\nCasual: ${example.Casual}`;

  // Gemini prompt
  const prompt = `Rephrase the following sentence in a ${tone} tone. Provide ONLY the rephrased sentence without any explanations, options, or additional text.

Original sentence: "${sentence}"

Here is an example for reference:
Original: ${example.Original}
Polite: ${example.Polite}
Professional: ${example.Professional}
Casual: ${example.Casual}

Rephrase "${sentence}" in ${tone} tone:`;

  console.log('Making Gemini API call with prompt:', prompt);

  try {
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };
    
    console.log('Gemini API request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await axios.post(GEMINI_API_URL, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Gemini API response status:', response.status);
    console.log('Gemini API response data:', JSON.stringify(response.data, null, 2));
    
    const rephrased = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.json({ rephrased });
  } catch (err) {
    console.log('Gemini API error status:', err.response?.status);
    console.log('Gemini API error data:', err.response?.data);
    console.log('Gemini API error message:', err.message);
    res.status(500).json({ error: 'Gemini API error', details: err.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));