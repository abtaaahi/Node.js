const express = require('express')
const app = express()

app.use(express.json())

let items = []

app.post('/items', (req, res) => {
    const newItem = { id: items.length + 1, name: req.body.name}
    items.push(newItem)
    res.status(201).json(newItem)
})

app.get('/items', (req, res) => {
    res.json(items)
})

app.get('/items/:id', (req, res) => {
    const item = items.find( i => i.id === parseInt(req.params.id))
    if(!item) 
        return res.status(404).json({ message: 'Item not found'})
    res.json(item)
})

app.put('/items/:id', (req, res) => {
    const item = items.find( i => i.id === parseInt(req.params.id))
    if(!item) 
        return res.status(404).json({ message: 'Item not found'})
    item.name = req.body.name
    res.json(item)
})

app.delete('/items/:id', (req, res) => {
    const itemIndex =  items.findIndex( i => i.id === parseInt(req.params.id))
    if(itemIndex === -1)
        return res.status(404).json({ message: 'Item not found'})
    items.splice(itemIndex, 1)
    res.status(204).send()
})

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002')
})


// in Curl
//for Post
// Invoke-RestMethod -Uri http://localhost:3002/items -Method POST -Body '{"name": "Item 1"}' -ContentType "application/json"

//for Get all
// Invoke-RestMethod -Uri http://localhost:3001/items -Method GET

// get single
// Invoke-RestMethod -Uri http://localhost:3001/items/1 -Method GET

//update
// Invoke-RestMethod -Uri http://localhost:3001/items/1 -Method PUT -Body '{"name": "Updated Item 1"}' -ContentType "application/json"

// delete
// Invoke-RestMethod -Uri http://localhost:3002/items/2 -Method DELETE