// registration.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = []; // Simulated in-memory "database"

app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(400).send('User already exists');
    }

    const newUser = { username, password, email, balance: 0 };
    users.push(newUser);
    res.status(201).send('User registered successfully');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
