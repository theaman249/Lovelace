# Team Lovelace

# How to Run our System

## Running the PostgreSQL Database (Do first)

**Installing PostgreSQL**
<p>Postgres is required to be installed on your system</p>
1. Download PostgreSQL from: https://www.postgresql.org/download. Please install the latest version (15) <br>
2. Depending on your machine, you can download the any package that suits your needs. <br>
3. Please ensure that Postgres is running on your system. You might need to restart your machine <br><br>

**Creating the database and tables**
<p>Go into the directory, backend in the source code and open the terminal there.</p>
<p>This step also needs you to have npm (nodejs) installed. Please refer to "Running the Backend" subsection</p>
1. run the command > node database.js. <br>
2. A message should show in the terminal saying "Database and tables created successfully."<br>
3. You can use a tool such as PGAdmin 4 or any Database management software tool to verify the database is running.<br>
4. You can also use one of our test scripts, "test-db-script", to check if the db is running. use command > node test-db-script<br><br>


## Running the Backend (Nodejs)

**installing nodejs** <br>
<p>Nodejs is required for npm and for running the backend.</p>
1. Download nodejs from: https://nodejs.org/en/download/package-manager. Please install the latest v22.5.1 <br>
2. Depending on your machine, you can download the any package that suits your needs. <br><br>

**Running the server** <br>
<p> After downloading nodejs, it's time to run the server. </p>
1. go into the backend directory. <br>
2. type the command > node index.js <br>
3. After the command is run, the server should be running on host: http://localhost:3000

# git cheatsheet

**> git branch -a**
<p>The above command is used to view all branches.</p>

**> git flow feature start my_feature**
<p>The above command is used to create a feature (my_feature) branch from the develop branch.</p>

**> git flow feature finish my_feature**
<p>The above command is used to merge the feature branch (my_feature) into the develop branch.</p>

**> git pull origin develop**
<p>The above command is used to pull code from the remote develop branch to the local current branch</p>

**> git push origin develop**
<p>The above command is used to push code from the current local branch to origin develop</p>

**> git pull origin main**
<p>The above command is used to pull code from the remote main branch to the local current branch</p>

**This was made in my_feature**
