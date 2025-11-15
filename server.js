const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
//import { index } from "./controllers/homeController";

const app = express();
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
app.get("/", (req, res) => {
  res.render("syntax" ,{title:"hii"});
});





// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});