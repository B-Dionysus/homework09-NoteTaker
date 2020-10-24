const { fstat } = require("fs");
const path=require("path");
const fs=require("fs");
const dbPath=(path.join(__dirname, "../db/db.json"));



function apiRoutes(server){
    // We're getting a POST request from the user on the notes page.
    // They must be sending us a note!!!
    server.post("/api/notes",function(req,res){
        let newNote=req.body;
        let {addNote}=require("./io.js");
        addNote(newNote, dbPath);
        newNote=JSON.stringify(newNote);
        return res.json(newNote);
    });
    // If the user specifies an id, then they are out for blood and we must destroy
    // one of the notes that we so recently created!
    server.get("/api/notes/:noteId",(req,res)=>{
        console.log("ID RECEIVED! "+req.params.noteId);
        
        return res.json({"status":"true"});

    });
    // The GET request on the notes page means they want a list of all of the notes
    server.get("/api/notes",function(req,res){
        return fs.readFile(dbPath,"utf8", 
        // If there is an error, log the error
        (err, data)=> err 
        ? console.log("Error in api/notes: "+err) 
        // Otherwise, send the results to the user
        : res.json(JSON.parse(data)));
    });
}


module.exports=apiRoutes;