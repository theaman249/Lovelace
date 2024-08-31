const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;
const validator = require('validator');
const crypto = require('crypto');


router.post('/register', async (req, res) => {
    try {
        const { name, surname, email, password, role, phone_number, birthday } = req.body;

        const sanitizedName = validator.escape(name.trim());
        const sanitizedSurname = validator.escape(surname.trim());
        const sanitizedEmail = validator.normalizeEmail(email);
        const sanitizedRole = role.trim().toLowerCase();
        const sanitizedPhoneNumber = validator.trim(phone_number);
        const sanitizedBirthday = validator.trim(birthday);

        if (!validator.isEmail(sanitizedEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Enforce strong password
        if (!validator.isStrongPassword(password, { minLength: 8, minSymbols: 1, minNumbers: 1, minLowercase: 0, minUppercase: 0})) {
            return res.status(400).json({ error: 'Password too weak' });
        }
     
        if(!['admin', 'employee'].includes(sanitizedRole)) {
            return res.status(400).json({ error: 'Invalid role'});
        }

        if (!validator.isMobilePhone(sanitizedPhoneNumber)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        if (!validator.isDate(sanitizedBirthday, { format: 'YYYY-MM-DD'})) {
            return res.status(400).json({ error: 'Invalid date format' });
        }


        // Check if the user already exists
        const existingEmail = await Employee.findOne({ where: { email: sanitizedEmail } });
        const existingNumber = await Employee.findOne({ where: { phone_number: sanitizedPhoneNumber } });

        if (existingEmail || existingNumber) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Employee({ 
            name: sanitizedName, 
            surname: sanitizedSurname, 
            email: sanitizedEmail, 
            password: hashedPassword, 
            role: sanitizedRole, 
            phone_number: sanitizedPhoneNumber,
            birthday: sanitizedBirthday
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const sanitizedEmail = validator.normalizeEmail(email);

        if (!validator.isEmail(sanitizedEmail)) {
            return res.status(400).json({ error: 'Invalid email' });
        }


        const user = await Employee.findOne({ where: { email: sanitizedEmail }});

        // Check if user was found
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed: User not found' });
        }

        // Check password match
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed: Incorrect password' });
        }

        const token = jwt.sign({ email: user.email, role: user.role }, jwtKey, { expiresIn: '5h' });
        res.status(200).json({ 
            token: token,
            name:user.name,
            surname:user.surname,
            role:user.role,
            email:email,
            phone_number:user.phone_number,
            birthday:user.birthday

        });
        console.log('Login successful');

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});


module.exports = router;