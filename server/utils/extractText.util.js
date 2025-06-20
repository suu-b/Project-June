const fs = require('fs');
const pdfParse = require('pdf-parse');
const path = require('path');

async function extractText(filePath){
    const fileExtension = path.extname(filePath).toLowerCase();

    if(fileExtension == ".pdf"){
        const data = fs.readFileSync(filePath);
        const pdfData =  await pdfParse(data);
        return pdfData.text;
    }
    else if(fileExtension == ".txt") return fs.readFileSync(filePath, 'utf8');
    console.log("The file extension is:", fileExtension)
    throw new Error("Unsupported file type. Only .pdf and .txt files are supported.");
}

module.exports = extractText;