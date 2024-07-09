## Coursework Template ##
### CM2040 Database Networks and the Web ###

#### Installation requirements ####

* NodeJS 
* Sqlite3 

#### Using this template ####

* Run ```npm install``` from the project directory to install all the node packages.
* Run ```npm run start``` to start serving the web app (Access via http://localhost:3000)

Test the app by browsing to the following routes:

* http://localhost:3000
* http://localhost:3000/author
* http://localhost:3000/reader

##### Creating database tables #####

 ```npm run build-db```

* **Additional Libraries**:
  - `express`
  - `ejs`
  - `sqlite3`
  - `express-session`

* **Routes**:
  - `/`: Main Home Page
  - `/author`: Author Home Page (requires login)
  - `/reader`: Reader Home Page
  - `/auth/login`: Author Login Page

#### Extension Implemented ####

* **Password access for author pages and routes**:
  - Secure the author pages with password authentication and write middleware to prevent any unauthorized access to author endpoints.
  - Created an author login page which authenticates the author against a naively stored server-side password.
  - Used `express-session` to create secure sessions.
