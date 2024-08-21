const express = require('express')
const app = express()
app.use(express.json())

const users = [
    { username: 'samina', password: '7890' },
    { username: 'abtahi', password: '1234'},
    { username: 'admin', password: '0000'}
]

const authMiddleware = (req, res, next) => {
    const { username, password } = req.headers
    const user = users.find( u => u.username  === username && u.password === password)
    if (user){
        next()
    } else{
        res.status(401).json({ message: 'Unauthorized' })
    }
}

app.post('/login', (req, res) => {
    const{ username, password } = req.body
    const user = users.find(u => u.username === username && u.password === password)
    if(user){
        res.json({ message: 'Login Successful'})
    } else{
        res.status(401).json({ message: 'Invalid Credentials' })
    }
})

app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'This is protected data'})
})

app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001')
})

// Postman

/*

2. Create a New Request
Open Postman.
Click on the "New" button and select "Request".
Name your request something like Login Request and choose an existing collection or create a new one.
3. Test the Login Endpoint (POST /login)
Set the Request Type:

In the dropdown next to the URL field, select POST.
Enter the Request URL:

Type http://localhost:3000/login in the URL field.
Set the Headers:

Click on the Headers tab.
Add a new key-value pair:
Key: Content-Type
Value: application/json
Set the Body:

Click on the Body tab.
Select the raw radio button.
In the dropdown next to raw, select JSON.
Enter the following JSON in the text area:
{
  "username": "admin",
  "password": "1234"
}
Send the Request:

Click the Send button.
If successful, you should see a response indicating that the login was successful.
4. Test the Protected Route (GET /protected)
Create Another Request:

Click on the "New" button and select "Request".
Name this request something like Protected Route Request.
Set the Request Type:

In the dropdown next to the URL field, select GET.
Enter the Request URL:

Type http://localhost:3000/protected in the URL field.
Set the Headers:

Click on the Headers tab.
Add two key-value pairs:
Key: username
Value: admin
Key: password
Value: 1234
Send the Request:

Click the Send button.
If the credentials are correct, you should see the protected data in the response.
5. Inspect Responses
Login Endpoint: You should receive a message like "Login successful" if the credentials are correct.
Protected Route: You should see the message "This is protected data" if the authentication is successful. If not, you'll get an "Unauthorized" error.

*/