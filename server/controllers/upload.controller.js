const path = require('path');
const fs = require('fs');
const extractText = require('../utils/extractText.util');
const chunkText = require('../utils/chunkText.util');

const handleFileUpload = async(req, res) => {
    const filePath = req?.file.path;

    try{
        if(!req.file) return res.status(400).json({error: "No file uploaded"});
        const extractedText = await extractText(filePath);
        const chunks = await chunkText(extractedText);
        const uploadDirectory = path.join(__dirname, "../../temp");
        if(!fs.existsSync(uploadDirectory)) fs.mkdirSync(uploadDirectory);
        const outputPath = path.join(uploadDirectory, "chunks.json")

        await fs.promises.writeFile(outputPath, JSON.stringify(chunks, null, 2));
        return res.status(200).json({
            message: "File uploaded successfully",
            chunksCount: chunks.length
        });
    }
    catch (e){
        console.error("Upload Failed:", e);
        return res.status(500).json({error: "File upload failed"});
    } finally {
        if(filePath && fs.existsSync(filePath)){
            fs.unlink(filePath, (err) => {if(err) console.error("Failed to delete file:", err)});
        }
    }
}

module.exports = { handleFileUpload }