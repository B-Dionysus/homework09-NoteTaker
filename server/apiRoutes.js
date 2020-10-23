const path=require("path");

function apiRoutes(server){
    server.post("/api/notes",function(req,res){
        let newNote=req.body;
        res.send(newNote);
    })
    server.get("/api/notes",function(req,res){
        let newNote=loadFile("../db/db.json");
        res.send(newNote);
    })
}


module.exports=apiRoutes;