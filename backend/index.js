require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./conn'); //import the database module
const authRoutes = require('./routes/auth');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes); // Mount routes

app.get('/', (req, res) => {

  const message ={
    "msg": "Lovelace backend is running"
  };

  res.send(JSON.stringify(message));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});



/////////////////////////DB API FUNCTIONS/////////////////////////////////

/**
 * This function returns all employees from the database as a JSON array
 * that contains json employee objects.
*/
app.get('/getAllEmployees', async (req,res) =>{

  const query = 'SELECT * FROM employees';
  const errorMessage = 'employees relation not found.';

  try {
    const { rows } = await db.query(query);

    if (rows.length === 0) {
      res.status(404).json({ error: errorMessage });
    } 
    else {
      res.json(rows);
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Internal Server Error');
  }

});



/**
 * This function returns an employee from the database as a JSON object
 * It returns their full details: id,name,surname,email,role,phone number,birthay
*/
app.post('/getEmployeeVEmail', async (req,res) =>{

  const email = req.body('')

  const query = 'SELECT * FROM employees WHERE email';
  const errorMessage = 'employees relation not found.';

  try {
    const { rows } = await db.query(query);

    if (rows.length === 0) {
      res.status(404).json({ error: errorMessage });
    } 
    else {
      res.json(rows);
    }
  } catch (error) {
    console.error('Error querying the database:', error);
    res.status(500).send('Internal Server Error');
  }



});




