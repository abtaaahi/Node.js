const express = require('express')
const axios = require('axios')
const app = express()

app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London'
    try{
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: 'api-key'
            }
        })
        res.json(response.data)
    } catch(error) {
        res.status(500).json({ message: 'Error fetching weather data'})
    }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

// default
// http://localhost:3000/weather

// dynamic
// http://localhost:3000/weather?city=Paris

// 7f8f0196528096af5cdfad45e6be1733