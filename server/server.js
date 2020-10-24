const express=require("express");
const app=express();
let io = require("./io.js");
let path=require("path");
const PORT = process.env.PORT || 8080;

// The nice folks at the following URL explained this to me, more or less:
// https://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why
app.use("*/css",express.static("public/assets/css"));
app.use("*/js",express.static("public/assets/js"));

// Sets up the Express app to handle data parsing
// This turns out to be very important!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up the GET and POST routes
require("./htmlRoutes.js")(app);
require("./apiRoutes.js")(app);

// Before we can start the server, we need to know how many files are in our database. If we wait
// until after we start the server, some sneaky cabbage could come change the files while we're looking
// (or, worse, just *after* we've looked). 
// serCurrentId get the number of files and sets a variable, currentId, equal to thatnumber plus one
// After that's done, it calls init.
io.setCurrentId(path.join(__dirname, "../db/db.json"));

function init(id){
    app.listen(PORT, ()=>console.log("Listening to http://localhost:"+PORT));
}

module.exports={
    init
}