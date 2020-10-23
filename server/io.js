const fs=require("fs");

var fileContents;
function loadFile(location){
    console.log("Read from: "+location);
    fs.readFile(location,"utf8", (error, data)=>error ? console.log(error) : fileContents=data);
    console.log(fileContents);
    // if(fileContents) return fileContents;
    // console.log(location);
    // fs.readFile(location, "utf8",(er, da)=>er ? console.log(er) : processData(da));
    // console.log(fileContents);
}

function addToFile(){}


module.exports={
    loadFile,
    addToFile

};