const axios = require('axios');

const handleRandomWikiPageRoll = async (req, res) => {
  try {
    const summaryResponse = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary");
    const articleTitle = summaryResponse.data?.title;

    if (!articleTitle) {
      console.error("Not able to find a random page. Article title couldn't be found.");
      return res.status(500).json({ error: "Some error occurred while fetching a random wiki page" });
    }

    const extractResponse = await axios.get(
      `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&explaintext&titles=${encodeURIComponent(articleTitle)}&format=json&origin=*`
    );

    const pages = extractResponse.data.query.pages;
    const firstPageId = Object.keys(pages)[0];
    const articleExtract = pages[firstPageId].extract;

    return res.status(200).json({
      title: articleTitle,
      content: articleExtract
    });
  } catch (err) {
    console.error("Error in fetching a random wiki page:", err.message);
    res.status(500).json({ error: "Some error occurred while fetching a random wiki page" });
  }
};

module.exports = { handleRandomWikiPageRoll }