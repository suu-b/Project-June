const TTLMap = require("../utils/ttlMap.util")

let thumbnailStore = new TTLMap();

const oneDay = 24 * 60 * 60 * 1000;

const getThumbnailByUserId = (userId) => { return thumbnailStore.get(userId); }
const setThumbnailStore = (userId, thumbnail) => {thumbnailStore.set(userId, thumbnail, oneDay) }
const deleteEntryInThumbnailStore = (userId) => {thumbnailStore.delete(userId); }
const isThumbnailStoreInitialized = () => { return thumbnailStore.size() > 0; }

module.exports = {
    setThumbnailStore,
    getThumbnailByUserId,
    deleteEntryInThumbnailStore,
    isThumbnailStoreInitialized
};