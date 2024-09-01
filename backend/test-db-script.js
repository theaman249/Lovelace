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

            console.log('The database "workbench" exists on your system');

            client.end();
        } 
        else 
        {
            console.log('The database "workbench" does not exist. Something went wrong.');
            
            client.end();
        }
        
    } catch (error) {
        console.error('Error:', error);
    } 
})();
