const path = require('path');
const fs = require('fs');
const cheerio = require('cheerio')
const { MemoryVectorStore } = require("langchain/vectorstores/memory")
require('dotenv').config();

const extractText = require('../utils/extractText.util');
const chunkText = require('../utils/chunkText.util');
const embeddings = require('../utils/embedding.util');
const store = require('../store/vector.store');
const { setThumbnailStore } = require('../store/thumbnail.store');

const handleFileUpload = async(req, res) => {
    const filePath = req?.file.path;
    const userId = req.headers['user-id'];

    try{
        if(!req.file) return res.status(400).json({error: "No file uploaded"});

        let textToChunk = ""
        const extractedText = await extractText(filePath);

        const fileExtension = path.extname(filePath).toLowerCase();
        if(fileExtension == ".html"){
            const $ = cheerio.load(extractedText);
            $('script, style, noscript').remove();
            textToChunk = $('body').text();
        } else textToChunk = extractedText

        const chunks = await chunkText(textToChunk);
        const metadata = chunks.map((_, index) => ({
            index, 
            filename: req.file.originalname,
            uploadedAt: new Date().toISOString()
        }))

        const vectorStore = await MemoryVectorStore.fromTexts(chunks, metadata, embeddings);
        store.setVectorStore(userId, vectorStore);

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

const handleThumbnailUpload = async(req, res) => {
    try{
        const thumbnailSrc = req.body?.thumbnailSrc;
        const userId = req.headers['user-id'];
        setThumbnailStore(userId, thumbnailSrc);
        return res.status(200).json({message: "Thumbnail uploaded successfully!"});        
    }
    catch(error){
        console.error("Thumbnail upload failed:", error);
        return res.status(500).json({message: "Thumbail upload failed. Try again later."});
    }
}

module.exports = { handleFileUpload, handleThumbnailUpload}