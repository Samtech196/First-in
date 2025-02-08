// topup.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [{ username: 'testUser', balance: 0 }]; // Simulated user
const adminAccount = {
    accountNumber: '9060097054',
    accountName: 'Samuel Olamide',
    bankName: 'Palmpay'
};

app.post('/topup', (req, res) => {
    const { username, amount } = req.body;

    if (amount < 3000 || amount > 15000) {
        return res.status(400).send('Amount must be between ₦3000 and ₦15000');
    }

    const user = users.find(user => user.username === username);
    if (!user) {
        return res.status(404).send('User not found');
    }

    // Simulate funding to admin account
    console.log(`Funding admin account: ${adminAccount.accountNumber}, Amount: ₦${amount}`);

    // Update user balance
    user.balance += amount;
    res.send({ message: `Successfully recharged ₦${amount}`, balance: user.balance });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
