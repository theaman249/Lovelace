// For protecting routes
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) 
        return res.status(401).json({ error: 'Access denied' });
    
    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };

module.exports = verifyToken;

/*TO-DO (when protected routes are specified)

routes/protectedRoute.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Protected route
router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
});

module.exports = router;

//
// app.js
 const express = require('express');
 const app = express();
 const authRoutes = require('./routes/auth');
 const protectedRoute = require('./routes/protectedRoute');

 app.use(express.json());
 app.use('/auth', authRoutes);
 app.use('/protected', protectedRoute);

 const PORT = process.env.PORT || 3000;
 
 app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
 });

*/