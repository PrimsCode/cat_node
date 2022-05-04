const fs = require('fs');
const process = require('process');
const axios = require('axios');

//step 3 outputting content of the path to a new file
function outputFile(text, output){
    if (output){
        fs.writeFile(output, text, 'utf8', function(err){
            if (err) {
                console.error(`Couldn't write ${output}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

//step 1 print the content of the file path
function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            outputFile(data, output);
        }
    });
}

//step 2 print the content of the url path
async function webCat(url){
    try {
        let res = await axios.get(url);
        outputFile(res.data, output);        
    } catch (err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);        
    }    
}

//recognising if there's an outputting to a new file in the path argument
let path;
let output;

if (process.argv[2] === '--out'){
    output = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

//recognizing the specific path type (file or url)
if (path.slice(0,4) === 'http'){
    webCat(path, output);
} else {
    cat(path, output);
}