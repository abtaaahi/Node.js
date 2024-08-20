const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

app.listen(3003, () => {
    console.log('Static file server is running on http://localhost:3003')
})

// http://localhost:3003/style.css
// http://localhost:3003/app.js
// http://localhost:3003/image.jpg

// basically i can browse any files from public directory