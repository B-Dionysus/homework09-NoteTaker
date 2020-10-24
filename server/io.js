const fs=require("fs");
let currentId=0;

function addNote(newNote, path){
    fs.readFile(path,"utf8",(err, data)=>{
        if(err) console.log("Error in api/notes: "+err);
        else{
            // noteDb=JSON.parse(data);                
            // newNote.id=1+noteDb.length;
            console.log(currentId);
            newNote.id=currentId;
            noteDb.push(newNote);
            writeError=writeDb(noteDb, path);
            if(writeError) console.log("Error!! "+writeError);
        }
    });
}
function writeDb(array, path){
    let content=JSON.stringify(array);
    // This line doesn't ever seem to return true, and I have to admit 
    // I don't know why.
    return fs.writeFile(path, content, err=>err ? err : true);
}




function setCurrentId(path){    
    
    fs.readFile(path,"utf8",(err, data)=>{
        if(err) throw ("Error in db retrieval: "+err);
        else{
            noteDb=JSON.parse(data);   
            currentId=1+noteDb.length
            require("./server.js").init(currentId);            
        }
    });
}



module.exports={
    addNote,
    setCurrentId
}