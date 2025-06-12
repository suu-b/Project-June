const store = require("../store/vector.store");

const handleQuery = async (req, res) => {
  try {
    if (!store.isVectorStoreInitialized()) {
      return res.status(404).json({ error: "Vector store is not yet initialized" });
    }

    const vectorStore = store.getVectorStore();
    const query = req.body.query;

    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({ error: "Query must be a non-empty string" });
    }

    const nearestVectors = await vectorStore.similaritySearch(query, 4); 

    return res.status(200).json({ result: nearestVectors });
  } catch (e) {
    console.error("Failed to handle the query:", e);
    return res.status(500).json({ error: "Failed to handle the query. Try again later." });
  }
};

module.exports = { handleQuery };
