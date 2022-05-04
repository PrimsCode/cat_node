const fs = require('fs');
const process = require('process');
const axios = require('axios');

//step 1 print the content of the file path
function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

//step 2 print the content of the url path
async function webCat(url){
    try {
        let res = await axios.get(url);
        console.log(res);        
    } catch (err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);        
    }    
}

//recognizing the specific path type (file or url)
let path = process.argv[2];

if (path.slice(0,4) === 'http'){
    webCat(path);
} else {
    cat(path);
}

