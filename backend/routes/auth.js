const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;
const validator = require('validator');

//Registration
router.post('/register', async (req, res) => {
    try {
        const { name, surname, email, password, role, phone_number, birthday } = req.body;

        // Validate email 
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Enforce strong password
        if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1, minNumbers: 1, minLowercase: 0, minUppercase: 0})) {
            return res.status(400).json({ error: 'Password too weak' });
        }
     
        // Validate role
        if(!['admin', 'employee'].includes(role.toLowerCase())) {
            return res.status(400).json({ error: 'Invalid role'});
        }

        // Validate phone number format 
        if (!validator.isMobilePhone(phone_number)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        // Validate birthday
        if (!validator.isDate(birthday, { format: 'YYYY-MM-DD'})) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Check if the user already exists
        const existingEmail = await Employee.findOne({ where: { email } });
        const existingNumber = await Employee.findOne({ where: { phone_number } });
        if (existingEmail || existingNumber) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Employee({ name, surname, email, password: hashedPassword, role, phone_number, birthday });
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

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }
        
        const user = await Employee.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed: User not found' });
        }
            const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed: Incorrect password' });
        }
            const token = jwt.sign({ userId: user._id }, secretKey, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
        console.log('Login successful')
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});


module.exports = router;