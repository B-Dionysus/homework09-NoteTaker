const fs=require("fs");
// This will get set to one plus the highest id currently in our db.json file
let currentId=0;

function addNote(newNote, path){
    fs.readFile(path,"utf8",(err, data)=>{
        if(err) console.log("Error in api/notes: "+err);
        else{
            // currentId was set before we started the server
            newNote.id=currentId;
            // Increment currentId for the next note we add
            currentId++;
            noteDb=JSON.parse(data);   
            noteDb.push(newNote);
            writeError=writeDb(noteDb, path);
            // Ideally we'd have better error handling here, you know.
            // throw an error, and the catch would pop up a modal to the user
            // or something? But I'm not 100% on how throw and catch work
            // And our front-end people didn't give me a mdoal. So...
            if(writeError) console.log("Error!! "+writeError);
        }
    });
}
function deleteNote(id, path, res){
    fs.readFile(path,"utf8",(err, data)=>{
        if(err) console.log("Error in deleting notes: "+err);
        else{
            noteDb=JSON.parse(data);   
            newDb=noteDb.filter(note=>note.id!=id);
            writeError=writeDb(newDb, path);
            if(writeError) console.log("Error!! "+writeError);
            else return res.json(true);
        }
    });
}


function writeDb(array, path){
    let content=JSON.stringify(array);
    // This line doesn't ever seem to return true, and I have to admit 
    // I don't know why.
    return fs.writeFile(path, content, err=>err ? err : true);
}



// We need to assign every new file a unique id. We do this by making sure that
// we always know the highest id in the database. This function runs at the very beginning
// of the process, before we start our server (to guarantee that no one will mess with our
// files while we're in the process of looking at them). It calls init() (in server.js) which
// starts the server.
function setCurrentId(path){    
    // load in our "databse" file
    fs.readFile(path,"utf8",(err, data)=>{
        if(err) throw ("Error in db retrieval: "+err);
        else{
            // Parse the data, and then loop through it
            noteDb=JSON.parse(data);   
            for(note of noteDb) 
                // Set currentId to be the highest id in the database
                if(note.id>currentId) currentId=note.id;         
            // And then increment it by one. Now we're ready to store some files!
            currentId++;
            require("./server.js").init(currentId);            
        }
    });
}



module.exports={
    addNote,
    setCurrentId,
    deleteNote
}