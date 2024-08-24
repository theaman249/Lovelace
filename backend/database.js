const { Pool, Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: 'admin',
    port: 5432
});

(async () => {
    try {
        await client.connect();

        // Check if the database already exists
        const result = await client.query(
            `SELECT datname FROM pg_database WHERE datname = 'workbench'`
        );

        if (result.rows.length > 0) {

            console.log('The database "workbench" exists.');

            await client.query(`
                -- Drop the tables in reverse order of creation
                DROP TABLE IF EXISTS employees;
                DROP TABLE IF EXISTS hours_logged;
            `);

            client.end();
        } 
        else 
        {
            console.log('The database "workbench" does not exist.');
            console.log('Creating database workbench..........');

            await client.query('CREATE DATABASE workbench');

            client.end();
        }

        const clientNew = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'admin',
            port: 5432,
            database:'workbench'
        });

        await clientNew.connect();

        // Now you can create tables or perform other operations in the database
        // Example: create a 'users' table
        await clientNew.query(`
            CREATE TABLE IF NOT EXISTS "employees" (
                id INT,
                name VARCHAR(100),
                surname VARCHAR(100),
                email VARCHAR(100),
                role VARCHAR(10),
                phone_number VARCHAR(10),
                birthday DATE 
            );

            CREATE TABLE IF NOT EXISTS "hours_logged" (
                id INT,
                log_date DATE,
                hours NUMERIC,
                sick BOOLEAN,
                on_leave BOOLEAN

            );
            
        `);

        const results=await clientNew.query('SELECT * FROM employees');

        if(results)
        {
            console.log('Database and tables created successfully.');
            clientNew.end();
        }
        else
        {
            console.log('Database and tables installation unsuccessful.');
        }

        
    } catch (error) {
        console.error('Error:', error);
    } 
})();
