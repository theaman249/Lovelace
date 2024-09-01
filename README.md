# Team Lovelace

## Team Members
<p>
  <img width="250" height="240" align='left' src="agape.jpg">
</p>

#### Agape Mamphasa

#### Role(s): Database Engineer, DevOps Engineer, Backend Engineer

#### BSc(Hons) Computer Science Student at The University Of Pretoria

#### Favourite Language(s): Java, JavaScript, php

<br>
<br>
<br>
<br>

<p>
  <img width="250" height="240" align='left' src="amanda.jfif">
</p>

#### Amanda Khuzwayo

#### Role(s): Backend Engineer, Frontend Engineer, Database Engineer

#### BSc(Hons) Computer Science Student at The University Of Pretoria

#### Favourite Language(s): Java, C++

<br>
<br>
<br>
<br>

<p>
  <img width="250" height="240" align='left' src="mbofho.jfif">
</p>

#### Mbofho Mamatsharaga

#### Role(s): Frontend Engineer

#### 3rd Year Computer Science Student at The University Of Pretoria

#### Favourite Language(s): Java, dart

<br>
<br>
<br>
<br>

<p>
  <img width="250" height="240" align='left' src="kea.jpg">
</p>

#### Kea Motapo

#### Role(s): Frontend Engineer

#### 3rd Year Information Knowledge Systems student at the University Of Pretoria

#### Favourite Language(s): Java, C++, Javascript

<br>
<br>
<br>
<br>



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
4. You can also use one of our test scripts, "test-db-script", to check if the db is running. use command > node test-db-script.js<br><br>


## Running the Backend (Nodejs)

**installing nodejs** <br>
<p>Nodejs is required for npm and for running the backend.</p>
1. Download nodejs from: https://nodejs.org/en/download/package-manager. Please install the latest v22.5.1 <br>
2. Depending on your machine, you can download the any package that suits your needs. <br><br>

**Installing The all of the backedn packages and dependencies** <br>
<p>All our packages and dependencies is really simple.</p>
1. Run the command: npm install <br><br>

**Running the server** <br>
<p> After downloading nodejs, it's time to run the server. </p>
1. go into the backend directory. <br>
2. type the command > node index.js <br>
3. After the command is run, the server should be running on host: http://localhost:3000 <br><br>

## Running the Frontend (Angular)

**Installing Angular** <br>
<p>Angular is needed for the front end</p>
1. In the command prompt, run the command npm: install -g @angular/cli@17<br><br>

**Installing Tailwindcss** <br>
<p>We are using tailwind as our frontend styling library</p>
1. Run the command: npm install -D tailwindcss <br><br>

**Installing daisyui** <br>
<p>another library we arer using is daisyui, which works with tailwindcss</p>
1. Run the command: npm -i -D daisyui@latest <br><br>

**Installing ApexCharts** <br>
<p>For charts we are using Apex Charts </p>
1. Run the command: npm install apexcharts --save <br><br>

**Installing The rest of the frontend packages and dependencies** <br>
<p>All our packages and dependencies is really simple.</p>
1. Run the command: npm install <br><br>

**Running the Frontend** <br>
1.change directories to the Workbench subdirectory within the frontend subdirectory. This can be done using the command

cd frontend/Workbench

2. Once inside Workbench, run the command ng serve --open
3. Should you get an error relating to a material component or ngx cookie, run the following commands

npm add @angular/material

npm install ngx-cookie

**Should the routing not work for any reason please just add the link to the url manually as follows**<br>
1. The base url should be 'localhost:4200', This should land you on the Login page.
2. Clicking on the log in button should route you to the Home page, 
3. Clicking on the Sign up text should route you to the Sign up page,
4. Clicking on the Forgot Password text should route you to the Forgot Password page.
5. Should this not work for whatever reason you can manually access any of the pages as follows:
6. Add the name of the page to the end of the base url, preceeded by a '/', e.g. "localhost:4200/Home" where /Home is the name of the page.
7. Here are the names of the individual pages:
8. Login: This is just the base url, i.e. "localhost:4200"
9 Signup: '/Signup'
10. Forgot Password: '/Forgot'
11. Home: '/Home'
12. Profile: '/Pp'
13. Personal Dashboard: '/Dashboard'
14. Office Booking: '/Office' (Not working)


# Our solutions

## Security

<p>To enhance security, we implemented the following features to ensure security
for employee data and the system as a whole</p>

1. Token-based access control: We used JWT Tokens for our token-based-access control.
<p>The tokens were primarily used to protect our endpoints from any unauthorized access. Only
registered users within our system may access these endpoints.</p>

<p>The tokens were implemented as middleware between the client and the endpoint. An unauthorized 
exception would be thrown if a user attempted to connect without a JWT token</p>

2. Role-based access control:
<p>We used a Role-based access control mechanism to prevent unauthorised access to admin endpoints. This was just 
another layer of security on top of the JWT middleware. In the event someone  has their token compromised, the role-based 
access control measures will prevent that person from going any further.</p>

3. Backend input validators:
<p>We use validator functions in the backend to sanitize the data we receive from the outside world. It's very important that
we validate the data that we are receiving as our code is very exposed to SQL and SQL Injection as a result.</p>

4. Hashing passwords:
<p>Our system doesn't store passwords as plain text but stores their hashes. Compared to encryption, hashing is not reversible, hence
why it's usually most preferred </p>

<p>The hash algorithm we use is Bcrypt. This is a robust algorithm that can withstand rainbow table attacks and Brute force attacks.
Another perk of the algorithm is it's internal salting. This makes passwords hard to crack, as the salts are randomised.</p>

## Features that work

1. Registration: new users can register and choose their roles.
2. Login: existing users can login and continue with their progress.
3. View workhours: Users can view their weekly workhours on our dashboard.
4. Password reset and recovery works as well.

## Features that don't work

1. The profile page and updating of details: The routes broke at some point and we were unable to navigate to some of the pages.
2. Number of hours worked tracker: The function isn't plugged into the database. Meaning the user is viewing a static number.




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
