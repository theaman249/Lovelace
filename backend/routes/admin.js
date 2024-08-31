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
router.post('/updateRole', authenticateToken, async (req, res) => {
    const { email, newRole } = req.body;
    
    if((req.user).role !== 'admin'){
        return res.status(403).json({ error: 'User unauthorized'})
    }

    try {
        const user = await Employee.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        user.role = newRole;
        await user.save();

        res.json({ success: 'Role updated successfully' });
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.get('/testing',authenticateToken,async(req,res) =>{
    res.status(200).send('user router working');
})

module.exports = router;