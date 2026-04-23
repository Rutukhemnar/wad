const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://wad:root@cluster0.tey7a61.mongodb.net/?appName=Cluster0')
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log("DB Error:", err));

app.post('/api/register', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        });

        if (user) {
            res.send(user);
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
app.get('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.put('/api/user/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete('/api/user/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.send({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).send(err);
    }
});
// Test route
app.get('/', (req, res) => {
    res.send("Backend is working 🚀");
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
