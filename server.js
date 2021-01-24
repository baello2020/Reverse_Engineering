// Requires mysql
var mysql = require("mysql2");

var connection;

// Creates connection
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "cis9cbtgerlk68wl.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    //Port
    port: 3306,
    // Username
    user: "r9q5r8c3sqih0onq",
    // Password
    password: "o40guqx7pn61v7dj",
    // DataBase
    database: "fucnaad9s32phnwf"
  });
};

// Error handling
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Test comment
module.exports = connection;

// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
