let vectorStore = null;

const getVectorStore = () => { return vectorStore; }
const setVectorStore = (store) => { vectorStore = store; }
const isVectorStoreInitialized = () => { return vectorStore != null; }

module.exports = {
    getVectorStore,
    setVectorStore,
    isVectorStoreInitialized
}