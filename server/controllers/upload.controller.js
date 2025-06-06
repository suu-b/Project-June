const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const handleFileUpload = async(req, res) => {
    try{
        if(!req.file) return res.status(400).json({error: "No file uploaded"});

        const filePath = req.file.path;
        const originalName = req.file.originalName;
        const fileExtension = path.extname(originalName).toLowerCase();

        let extractedText = "";

        if(fileExtension == ".pdf"){
            const data = fs.readFileSync(filePath);
            extractedText = await pdfParse(data).then(data => data.text);
        }
        else if(fileExtension == ".txt"){
            extractedText = fs.readFileSync(filePath, 'utf8')
        }
        else return res.status(400).json({error: "Unsupported file type"});

        fs.unlinkSync(filePath);

        return res.status(200).json({
            message: "File uploaded successfully",
            path: filePath,
            originalName,
            text: extractedText
        });
    }
    catch (e){
        console.error("Upload Failed:", e);
        return res.status(500).json({error: "File upload failed"});
    }
}

module.exports = { handleFileUpload }