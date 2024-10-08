const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('myfile');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(500).json({ message: 'File upload failed' });
    } else {
      res.json({ message: 'File uploaded successfully', filename: req.file.filename });
    }
  });
});

app.use('/uploads', express.static('uploads'));

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});