/***
 * The main aim of this script is to populate the database with Mock data
 */

const { Pool, Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    port: 5432,
    database: 'workbench'
});

(async () => {
    try {
        await client.connect(); 
        
        console.log('Database connection was successful');
        
        //populate the employees
        await client.query(`

            INSERT INTO employees
                (id,name,surname,email,password,role,phone_number,birthday)
            VALUES
                (nextval('employee_seq'),'Jensen','Huang','jensen@workbench.co.za','Password@123','user','0792726980','1993-04-05'),
                (nextval('employee_seq'),'Ada','Lovelace','ada@workbench.co.za','Secure@123','admin','0786369895','1815-12-10'),
                (nextval('employee_seq'),'Stephan','Grunner','profg@workbench.co.za','algorith@123','user','0812567896','1946-08-11');

            INSERT INTO hours_logged
                (id,log_date,hours_worked,sick,on_leave,employee_id)
            VALUES
                (nextval('hours_logged_seq'),'2024-08-26','8',false,false,1),
                (nextval('hours_logged_seq'),'2024-08-27','7.5',false,false,1),
                (nextval('hours_logged_seq'),'2024-08-28','6',false,false,1),
                (nextval('hours_logged_seq'),'2024-08-29','8.5',false,false,1),
                (nextval('hours_logged_seq'),'2024-08-30','6',false,false,1);
            
        `);

        const result = await client.query(`SELECT * FROM employees`);

        if(result.rows.length>0)
        {
            console.log("Entries were successfully inserted");
        }
        else
        {
            console.log("Could not insert entries into the database");
        }
        
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.end();
    }
})();
