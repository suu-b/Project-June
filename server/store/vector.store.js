const TTLMap = require("../utils/ttlMap.util")

let vectorStore = new TTLMap();

const oneDay = 24 * 60 * 60 * 1000;

const getVectorStoreByUserId = (userId) => { return vectorStore.get(userId); }
const setVectorStore = (userId, store) => {vectorStore.set(userId, store, oneDay) }
const isVectorStoreInitialized = () => { return vectorStore.size() > 0; }

module.exports = {
    getVectorStoreByUserId,
    setVectorStore,
    isVectorStoreInitialized
}
