const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("path");
require("./config/passport"); // load passport config
//const expressLayouts = require("express-ejs-layouts");
//import { index } from "./controllers/homeController";

const app = express();
// Session middleware
app.use(
  session({
    secret: "supersecretkey", // change for production
    resave: false,
    saveUninitialized: false,
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// it is used in Express (Node.js) to parse incoming JSON request bodies.
// For every incoming request, if the body contains JSON, it automatically parse it and store it in req.body."
// without it req.body would be undefined
app.use(express.json());

// Static folder (for CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));


app.use(express.urlencoded({ extended: true }));
// can be used for layouts 
//app.use(expressLayouts);



// Home route
const homeRoutes = require('./routes/homeRoutes');
app.use('/', homeRoutes);



// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});