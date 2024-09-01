const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtKey = process.env.JWT_SECRET;
const validator = require('validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

router.post('/register', async (req, res) => {

    try {
        const { name, surname, email, password, role, phone_number, birthday } = req.body;

        console.log(req.body);

        const sanitizedName = validator.escape(name.trim());
        const sanitizedSurname = validator.escape(surname.trim());
        const sanitizedEmail = validator.normalizeEmail(email);
        const sanitizedRole = role.trim().toLowerCase();
        const sanitizedPhoneNumber = validator.trim(phone_number);
        const sanitizedBirthday = validator.trim(birthday);

        if (!validator.isEmail(sanitizedEmail)) {
            return res.status(200).json({ message: 'Invalid email format' });
        }
     
        if(!['admin', 'employee'].includes(sanitizedRole)) {
            return res.status(200).json({ message: 'Invalid role'});
        }

        if (!validator.isMobilePhone(sanitizedPhoneNumber)) {
            return res.status(200).json({ message: 'Invalid phone number format' });
        }

        if (!validator.isDate(sanitizedBirthday, { format: 'YYYY-MM-DD'})) {
            return res.status(200).json({ message: 'Invalid date format' });
        }


        // Check if the user already exists
        const existingEmail = await Employee.findOne({ where: { email: sanitizedEmail } });
        const existingNumber = await Employee.findOne({ where: { phone_number: sanitizedPhoneNumber } });

        if (existingEmail || existingNumber) {
            return res.status(200).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Employee({ 
            name: sanitizedName, 
            surname: sanitizedSurname, 
            email: sanitizedEmail, 
            password: hashedPassword, 
            role: sanitizedRole, 
            phone_number: sanitizedPhoneNumber,
            //reset_token:'null', //default
            //token_expiration:'2023-12-25 14:30:00+02:00', //default
            birthday: sanitizedBirthday
        });

        await user.save();

        res.status(201).json({ message: 'registration successful' });
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
            return res.status(200).json({ error: 'Invalid email' });
        }


        const user = await Employee.findOne({ where: { email: sanitizedEmail }});

        // Check if user was found
        if (!user) {
            return res.status(200).json({ message: 'user not found' });
        }

        // Check password match
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(200).json({ message: 'incorrect password' });
        }

        const token = jwt.sign({ email: user.email, role: user.role }, jwtKey, { expiresIn: '5h' });
        res.status(200).json({ 
            token: token,
            name:user.name,
            surname:user.surname,
            role:user.role,
            email:email,
            phone_number:user.phone_number,
            birthday:user.birthday,
            message:'login successful'
        });
        console.log('Login successful');

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Login failed' });
    }
});


/*
router.post('/forgotPassword', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Employee.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a one-time token for password reset
        const reset_token = jwt.sign({ email: user.email }, jwtKey, { expiresIn: '15m' });
        user.reset_token = reset_token;
        user.token_expiration = Date.now() + 15 * 60 * 1000; // 15 minutes expiration
        await user.save();

        res.json({ message: 'Token generated successfully', reset_token });
    } catch (error) {
        console.error('Error handling forgot password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/resetPassword', async (req, res) => {
    const { reset_token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(reset_token, jwtKey);

        const user = await Employee.findOne({ where: { email: decoded.email } });

        if (!user || user.reset_token !== reset_token || user.token_expiration < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.reset_token = null; // Clear the token after use
        user.token_expiration = null;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
*/
module.exports = router;