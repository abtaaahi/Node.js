const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json())

const FILE_PATH = './todos.json'

const readTodos = () => {
    const data = fs.readFileSync(FILE_PATH)
    return JSON.parse(data)
}

const writeTodos = (todos) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2))
}

app.get('/todos', (req, res) => {
    const todos = readTodos()
    res.json(todos)
})

app.post('/todos', (req, res) => {
    const todos = readTodos()
    const newTodo = req.body
    todos.push(newTodo)
    writeTodos(todos)
    res.status(201).json(newTodo)
})

app.put('/todos/:id', (req, res) => {
    const todos = readTodos()
    const id = parseInt(req.params.id)
    todos[id] = req.body
    writeTodos(todos)
    res.json(todos[id])
})

app.delete('/todos/:id', (req, res) => {
    let todos = readTodos()
    const id = parseInt(req.params.id)
    todos = todos.filter((_, index) => index !== id)
    writeTodos(todos)
    res.status(204).end()
})

app.listen(3002, () => {
    console.log('Server is running on http://localhost:3002')
})

/*

Test the API
You can use Postman, curl, or any other HTTP client to interact with your API.

Testing with Postman:
GET All Todos:

Method: GET
URL: http://localhost:3000/todos
This should return the current list of todos.
POST a New Todo:

Method: POST
URL: http://localhost:3000/todos
Body (JSON):
{
  "title": "Buy groceries",
  "completed": false
}
This should add a new todo to the list.
PUT to Update a Todo:

Method: PUT
URL: http://localhost:3000/todos/0 (Replace 0 with the appropriate index)
Body (JSON):
{
  "title": "Buy groceries and cook dinner",
  "completed": true
}
This should update the specified todo.
DELETE a Todo:

Method: DELETE
URL: http://localhost:3000/todos/0 (Replace 0 with the appropriate index)
This should delete the specified todo.
6. Review the Todos JSON File
Open the todos.json file to see the stored todos.
Each time you perform a POST, PUT, or DELETE operation, the file will be updated accordingly.

*/