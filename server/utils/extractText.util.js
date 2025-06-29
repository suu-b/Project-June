const fs = require('fs/promises');
const pdfParse = require('pdf-parse');
const path = require('path');

async function extractText(filePath){
    const fileExtension = path.extname(filePath).toLowerCase();

    if(fileExtension == ".pdf"){
        const data = await fs.readFile(filePath);
        const pdfData =  await pdfParse(data);
        return pdfData.text;
    }
    else if(fileExtension == ".txt" || fileExtension == ".html") return fs.readFile(filePath, 'utf8');
    console.log("The file extension is:", fileExtension)
    throw new Error("Unsupported file type. Only .pdf, .txt and .html files are supported.");
}

module.exports = extractText;