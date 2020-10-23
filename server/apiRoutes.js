const { fstat } = require("fs");
const path=require("path");
const fs=require("fs");

function apiRoutes(server){
    server.post("/api/notes",function(req,res){
        let newNote=req.body;
        addToFile(newNote, "../db/db.json");
        res.send(newNote);
    })
    server.get("/api/notes",function(req,res){
        return fs.readFile(path.join(__dirname, "../db/db.json"),"utf8", 
        // If there is an error, log the error
        (err, data)=> err 
        ? console.log("Error in api/notes: "+err) 
        // Otherwise, send the results to the user
        : res.json(JSON.parse(data)));
    })
    // server.get("/api/notes",function(req,res){
    //     fs.readFile(path.join(__dirname, "../db/db.json"),"utf8", 
    //     function(err, data){
    //         if(err) console.log(err);
    //         else{
    //             console.log(data);
    //             return res.json(JSON.parse(data));
    //         }
    //     });
    // });
}


module.exports=apiRoutes;