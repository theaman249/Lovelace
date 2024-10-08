/*const { Pool, Client } = require('pg');
const { Sequelize } = require('sequelize');

// New Sequelize instance
const sequelize = new Sequelize('workbench', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

module.exports = sequelize;

(async () => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'admin',
        port: 5432
    });

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
                id INT PRIMARY KEY,
                name VARCHAR(100),
                surname VARCHAR(100),
                email VARCHAR(100),
                password VARCHAR(255),
                role VARCHAR(10),
                phone_number VARCHAR(10),
                birthday DATE 
            );

            CREATE TABLE IF NOT EXISTS "hours_logged" (
                id INT PRIMARY KEY,
                log_date DATE,
                hours_worked NUMERIC,
                sick BOOLEAN,
                on_leave BOOLEAN,

                employee_id INT REFERENCES "employees"(id)
            );

            CREATE SEQUENCE "employee_seq"
            START 1
            INCREMENT 1
            MINVALUE 1
            OWNED BY "employees".id;

            CREATE SEQUENCE "hours_logged_seq"
            START 1
            INCREMENT 1
            MINVALUE 1
            OWNED BY "hours_logged".id;

            
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

        clientNew.end();
    } catch (error) {
        console.error('Error:', error);
    } 
})();
*/

const { Client } = require('pg');

// Database initialization
(async () => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        password: 'admin',
        port: 5432
    });

    try {
        await client.connect();

        // Check if the database already exists
        const result = await client.query(
            `SELECT datname FROM pg_database WHERE datname = 'workbench'`
        );

        if (result.rows.length > 0) {
            console.log('The database "workbench" exists.');
        } else {
            console.log('The database "workbench" does not exist.');
            console.log('Creating database workbench..........');
            await client.query('CREATE DATABASE workbench');
        }

        client.end();

        // Connect to the newly created database
        const clientNew = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'admin',
            port: 5432,
            database: 'workbench'
        });

        await clientNew.connect();

        // Create tables first
        await clientNew.query(`
            CREATE TABLE IF NOT EXISTS employees (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                surname VARCHAR(100),
                email VARCHAR(100),
                password VARCHAR(100),
                role VARCHAR(10),
                phone_number VARCHAR(100),
                birthday DATE,
                reset_token VARCHAR(255),
                token_expiration TIMESTAMPTZ
            );

            CREATE TABLE IF NOT EXISTS hours_logged (
                id SERIAL PRIMARY KEY,
                log_date DATE,
                hours_worked NUMERIC,
                sick BOOLEAN,
                on_leave BOOLEAN,
                employee_id INT REFERENCES employees(id)
            );
        `);

        await clientNew.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'employee_seq') THEN
                    CREATE SEQUENCE employee_seq
                    START 1
                    INCREMENT 1
                    MINVALUE 1
                    OWNED BY employees.id;
                END IF;

                IF NOT EXISTS (SELECT 1 FROM pg_class WHERE relname = 'hours_logged_seq') THEN
                    CREATE SEQUENCE hours_logged_seq
                    START 1
                    INCREMENT 1
                    MINVALUE 1
                    OWNED BY hours_logged.id;
                END IF;
            END
            $$;
        `);

        console.log('Database and tables created successfully.');

        clientNew.end();

    } catch (error) {
        console.error('Error:', error);
    }
})();
