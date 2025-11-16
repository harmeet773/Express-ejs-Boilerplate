/* CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    password VARCHAR(255)
);
 as users*/ 



const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
require("./db.js"); // load passport config

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // FETCH USER FROM DB
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );

      if (rows.length === 0) {
        return done(null, false, { message: "User not found" });
      }

      const user = rows[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    done(null, rows[0]);
  } catch (err) {
    done(err);
  }
});
