const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const app = express();
// Set EJS as template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Static folder (for CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// can be used for layouts 
app.use(expressLayouts);

// Home route
app.get("/", (req, res) => {
  // res.render("index");
  res.json("ooook");
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});