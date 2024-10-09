require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = process.env.API_KEY;
const BASE_URL = `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`;

app.get('/convert', async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({ message: 'Please provide from, to, and amount query parameters.' });
  }

  try {
    const response = await axios.get(`${BASE_URL}`);
    const rates = response.data.rates;

    if (!rates[from] || !rates[to]) {
      return res.status(400).json({ message: `Cannot convert from ${from} to ${to}` });
    }

    const rate = rates[to] / rates[from];
    const convertedAmount = rate * amount;
    
    res.json({ from, to, amount, convertedAmount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching conversion data', error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});


/// Sample 
/*

http://localhost:3000/convert?from=USD&to=EUR&amount=100

*/