const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

//Registration
router.post('/register', async (req, res) => {
    try {
        const { name, surname, email, password, role, phone_number, birthday } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Employee({ name, surname, email, password: hashedPassword, role, phone_number, birthday});
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Employee.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
        const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Authentication failed' });
    }
        const token = jwt.sign({ userId: user._id }, secretKey, {
        expiresIn: '1h',
    });
        //res.status(200).json({ token });
        console.log('Login successful')
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;