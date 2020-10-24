const fs=require("fs");

function addNote(newNote, path){
    fs.readFile(path,"utf8",(err, data)=>{
        if(err) console.log("Error in api/notes: "+err);
        else{
            let noteArray=[];
            noteDb=JSON.parse(data);                
            newNote.id=1+noteDb.length;
            noteDb.push(newNote);
            if(err=writeDb(noteDb, path)!=true) console.log("Error!! "+err);
        }
    });
}
function writeDb(array, path){
    let content=JSON.stringify(array);
    return fs.writeFile(path, content, err=>err ? err : true);
}

module.exports={
    addNote
}