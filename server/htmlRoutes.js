const path=require("path");

function htmlRoutes(server){
    server.get("/", (req, res)=>res.sendFile(path.join(__dirname, "../public/index.html")));
    
    server.get("/notes",(req, res)=>res.sendFile(path.join(__dirname,"../public/notes.html")));
}




module.exports=htmlRoutes;