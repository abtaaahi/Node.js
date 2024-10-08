const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Define rate limit: 5 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests, please try again later."
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the Rate Limiter API!" });
});

app.get('/data', (req, res) => {
  res.json({ message: "This is protected data" });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});