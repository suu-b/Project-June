const store = require("../store/vector.store");
const thumbnailStore = require("../store/thumbnail.store");
const { runLLM, runLLMToGetFormattedTitle, runLLMToSummarize } = require("../utils/llmwrapper.util");
const  searchWeb  = require("../utils/searchWeb.util");


const handleQuery = async (req, res) => {
  const keywordsRequireForRealTimeSearch = [
         "latest", "today", "now", "current", "trending",
         "breaking", "updated", "2025", "2024", "news",
         "recent", "new discovery", "who is the", "when is the",
         "price of", "market", "event", "release date"
  ]

  try {
    if (!store.isVectorStoreInitialized()) {
      return res.status(404).json({ error: "Vector store is not yet initialized" });
    }

    const vectorStore = store.getVectorStore();
    const query = req.body.query;
    const isWebSearchAllowed = req.body.isWebSearchAllowed
    const messageHistory = req.body.messages;

    const messageContext = messageHistory.slice(-5); //to keep only last 5 messages as a context
    const messages = `${messageContext.map((message, index) => `${index + 1}. ${message.sender}: ${message.content}`).join("\n")}`

    if (!query || typeof query !== "string" || query.trim() === "") {
      return res.status(400).json({ error: "Query must be a non-empty string" });
    }

    const ifSearchOnWeb = isWebSearchAllowed && keywordsRequireForRealTimeSearch.some(keyword => query.toLowerCase().includes(keyword)) ;   

    const isItLocalTesting = process.env.IS_IT_LOCAL;
    const webResults = isItLocalTesting ? "N/A" : ifSearchOnWeb ? await searchWeb(query) : "N/A"  
    const nearestVectors = await vectorStore.similaritySearch(query, 4); 

     const context = [
      `DOCUMENT CONTEXT:\n${nearestVectors.map((v, i) => `[D${i + 1}] ${v.pageContent}`).join("\n")}`,
      `WEB SEARCH RESULTS:\n${webResults}`
    ]

    const response = await runLLM(query, context, messages);
    return res.status(200).json({ result: response.content });
  } catch (e) {
    console.error("Failed to handle the query:", e);
    return res.status(500).json({ error: "Failed to handle the query. Try again later." });
  }
};

const handleTitleFormat = async (req, res) => {
    try{
      const fileName = req.body.fileName;

    if (!fileName || typeof fileName !== "string" || fileName.trim() === "") {
      return res.status(400).json({ error: "Query must be a non-empty string" });
    }

    const response = await runLLMToGetFormattedTitle(fileName);
    return res.status(200).json({ result: response.content });
    } catch (e) {
    console.error("Failed to format the name:", e);
    return res.status(500).json({ error: "Failed to handle the query. Try again later." });
  }
};

const handleSummarize = async (req, res) => {
    try{
      const vectorStore = store.getVectorStore();
      const thumbnail = thumbnailStore.getThumbnailStore();
      thumbnailStore.setThumbnailStore(null);

      const summaryQuery = "Summarize the document...";

      const nearestVectors = await vectorStore.similaritySearch(summaryQuery, 4); 

      const context = [`DOCUMENT CONTEXT:\n${nearestVectors.map((v, i) => `[D${i + 1}] ${v.pageContent}`).join("\n")}`];
      const summaryResponse = await runLLMToSummarize(summaryQuery, context);
      console.log(summaryResponse);
      const summary = summaryResponse.content;

      console.log(thumbnail)

      return res.status(200).json({summary, thumbnail});
    } catch (e) {
    console.error("Failed to format the name:", e);
    return res.status(500).json({ error: "Failed to handle the query. Try again later." });
  }
};

module.exports = { handleQuery, handleTitleFormat, handleSummarize };
