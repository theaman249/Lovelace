const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const db = require('../conn');

const validator = require('validator');

const Employee = require('../models/employee');
/**
 * This is the middleware that we will inject on all requests to authenticate
 * the jwt token. The jwt token is returned in the login payload and
 * saved as a cookie on the client side.
 * 
 * If the token is valid, we store the decoded payload in req.user and 
 * proceed with the request. If the token is invalid, we return a 403 
 * Forbidden status with an error message.
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns the Data that
 */

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
      return res.sendStatus(401);
    }
  
    const result = verifyAccessToken(token);
  
    if (!result.success) { //forbidden
      return res.status(403).json({ error: result.error });
    }
  
    req.user = result.data;
    next(); //the middleware actually forms part of the function that is using it.
}

function verifyAccessToken(token) {

    const secret = process.env.JWT_SECRET;
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } 
    catch (error) 
    {
      return { success: false, error: error.message };
    }
}

/**
 * This function returns an array of log objects. These objects contain
 * the dates, times and hours logged.
*/
router.post('/getHoursLogged',authenticateToken, async(req,res) =>{
    const { email } = req.body;

    if(email === undefined){
        return res.status(401).json({error:'user not found'});
    }

    const user = await Employee.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    else{
        id = user.id;

        const query = `SELECT * FROM hours_logged WHERE employee_id = ${id}`;

        try {
            const { rows } = await db.query(query);
        
            res.json(rows);

        } catch (error) {
            console.error('Error querying the database:', error);
            res.status(500).send('Internal Server Error');
        }
    }

});

/**
 * This function returns an array of log objects. These objects contain
 * the dates, times and hours logged.
*/
router.post('/updateDetails', async (req, res) => {
    const { name, surname, email,newEmail, phoneNumber, birthday } = req.body;

    try {
        const user = await Employee.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        const id = user.id;

        // Dynamically build the update query based on the provided fields
        const fields = [];
        const values = [];
        let paramIndex = 1;

        if (name && name != '') {
            fields.push(`name = $${paramIndex++}`);
            values.push(name);
        }

        if (surname && surname != '') {
            fields.push(`surname = $${paramIndex++}`);
            values.push(surname);
        }

        if (phoneNumber && phoneNumber != '') {
            fields.push(`phone_number = $${paramIndex++}`);
            values.push(phoneNumber);
        }

        if (birthday && birthday!= '') {
            fields.push(`birthday = $${paramIndex++}`);
            values.push(birthday);
        }

        if (newEmail && newEmail != "") {
            fields.push(`email = $${paramIndex++}`);
            values.push(newEmail);
        }

        // If there are fields to update, proceed
        if (fields.length > 0) {
            const query = `UPDATE employees SET ${fields.join(', ')} WHERE id = $${paramIndex}`;
            values.push(id);
            console.log(query);

            await db.query(query, values);
        }
        else{
            console.log('Nothing to update');
        }

        res.json({ success: 'Details updated successfully' });
    } catch (error) {
        console.error('Error updating user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.get('/testing',authenticateToken, async(req,res) =>{
    res.status(200).send('user router working');
})

module.exports = router;