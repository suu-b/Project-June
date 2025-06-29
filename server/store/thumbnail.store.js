let thumbnailStore = null;

const getThumbnailStore = () => { return thumbnailStore; }
const setThumbnailStore = (store) => { thumbnailStore = store; }
const isThumbnailStoreInitialized = () => { return thumbnailStore != null; }

module.exports = {
    getThumbnailStore,
    setThumbnailStore,
    isThumbnailStoreInitialized
}