// login.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
    { username: 'testUser', password: 'password123', balance: 0 }
]; // Simulated user for testing

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).send('Invalid credentials');
    }

    res.send({ message: 'Login successful', balance: user.balance });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
