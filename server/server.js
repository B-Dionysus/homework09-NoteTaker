const express=require("express");
const app=express();
var PORT = process.env.PORT || 8080;

// The nice folks at the following URL explained this to me, more or less:
// https://stackoverflow.com/questions/5924072/express-js-cant-get-my-static-files-why
app.use("*/css",express.static("public/assets/css"));
app.use("*/js",express.static("public/assets/js"));

// Sets up the Express app to handle data parsing
// This turns out to be very important!
// 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Check the GET routes
require("./htmlRoutes.js")(app);
require("./apiRoutes.js")(app);

app.listen(PORT, ()=>console.log("Listening to http://localhost:"+PORT));

