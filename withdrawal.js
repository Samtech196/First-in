// withdrawal.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
    { username: 'testUser', balance: 5000, withdrawalHistory: [] }
]; // Simulated user
let withdrawals = [];

app.post('/withdraw', (req, res) => {
    const { amount, accountNumber, accountName } = req.body;
    const user = users.find(user => user.username === 'testUser'); // Simulate logged-in user

    if (!user) {
        return res.status(404).send('User not found');
    }

    if (amount < 1500) {
        return res.status(400).send('Minimum withdrawal amount is ₦1500');
    }

    if (amount > user.balance) {
        return res.status(400).send('Insufficient balance');
    }

    user.balance -= amount; // Deduct from user balance
    user.withdrawalHistory.push({ amount, accountNumber, accountName });
    withdrawals.push({ amount, accountNumber, accountName });

    res.send({ message: 'Withdrawal request successful. Funds will be processed within 24hrs - 72hrs.' });
});

app.get('/withdraw/history', (req, res) => {
    const user = users.find(user => user.username === 'testUser'); // Simulate logged-in user
    if (!user) {
        return res.status(404).send('User not found');
    }

    res.send(user.withdrawalHistory);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
