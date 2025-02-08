// dashboard.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [{ username: 'testUser', password: 'password123', balance: 0 }]; // Simulated user

app.get('/dashboard/:username', (req, res) => {
    const { username } = req.params;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(404).send('User not found');
    }

    res.send({ balance: user.balance });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
