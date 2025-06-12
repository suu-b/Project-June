const path = require('path');
const fs = require('fs');
const { MemoryVectorStore } = require("langchain/vectorstores/memory")
require('dotenv').config();

const extractText = require('../utils/extractText.util');
const chunkText = require('../utils/chunkText.util');
const embeddings = require('../utils/embedding.util');
const store = require('../store/vector.store')

const handleFileUpload = async(req, res) => {
    const filePath = req?.file.path;

    try{
        if(!req.file) return res.status(400).json({error: "No file uploaded"});
        const extractedText = await extractText(filePath);
        const chunks = await chunkText(extractedText);
        const metadata = chunks.map((_, index) => ({
            index, 
            filename: req.file.originalname,
            uploadedAt: new Date().toISOString()
        }))

        const vectorStore = await MemoryVectorStore.fromTexts(chunks, metadata, embeddings);
        store.setVectorStore(vectorStore);

        return res.status(200).json({ message: "File processed successfully" });
    }
    catch (e){
        console.error("Upload Failed:", e);
        return res.status(500).json({error: "Failed to process the file. Try again later."});
    } finally {
        if(filePath && fs.existsSync(filePath)){
            fs.unlink(filePath, (err) => {if(err) console.error("Failed to delete file:", err)});
        }
    }
}

module.exports = { handleFileUpload }