const {RecursiveCharacterTextSplitter} = require('langchain/text_splitter');

async function chunkText(rawText){
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });

    const docs = await splitter.createDocuments([rawText]);
    const chunks = docs.map(doc => doc.pageContent);
    return chunks;
}

module.exports = chunkText;