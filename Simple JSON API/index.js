const express = require('express')
const app = express()

app.get('/api', (req, res) => {
    res.json([{ id: 221006012, name: 'Samina Rahman', position: 'Web Developer' },
        { id: 221004112, name: 'Abtahi Mahib', position: 'App Developer' }
    ])
})

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001') // add endpoint
})

// node index.js
// using CURL
// curl http://localhost:3001/api