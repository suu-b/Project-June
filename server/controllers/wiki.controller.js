const axios = require('axios');

const handleRandomWikiPageRoll = async (req, res) => {
  try {
    const summaryResponse = await axios.get("https://en.wikipedia.org/api/rest_v1/page/random/summary");
    const articleTitle = summaryResponse.data?.titles?.canonical || "Albert_Einstein";
    const articleThumbnail = summaryResponse.data?.thumbnail?.source || "https://en.wikipedia.org/wiki/Albert_Einstein#/media/File:Albert_Einstein_1947.jpg";

    if (!articleTitle) {
      console.error("Not able to find a random page. Article title couldn't be found.");
      return res.status(500).json({ error: "Some error occurred while fetching a random wiki page" });
    }
    const extractResponse = await axios.get(
      `https://api.wikimedia.org/core/v1/wikipedia/en/page/${articleTitle}/with_html`
    );

    const article = extractResponse.data.html;

    return res.status(200).json({
      title: articleTitle,
      content: article,
      thumbnailSrc: articleThumbnail
    });
  } catch (err) {
    console.error("Error in fetching a random wiki page:", err.message);
    res.status(500).json({ error: "Some error occurred while fetching a random wiki page" });
  }
};

module.exports = { handleRandomWikiPageRoll }