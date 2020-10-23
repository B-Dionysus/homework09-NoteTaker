const express=require("express");
const app=express();
const PORT=8080;


// Check the GET routes
require("./htmlRoutes.js")(app);
require("./apiRoutes.js")(app);

app.listen(PORT, ()=>console.log("Listening to http://localhost:"+PORT));

