const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const users = [];

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username }, 'your_jwt_secret');
    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
    res.json({ message: 'Welcome to the protected route!', username: decoded.username });
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3000');
});