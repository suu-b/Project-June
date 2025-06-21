require('dotenv').config()

const serpapi = require('serpapi')

async function searchWeb(query) {
    const rawResults = await serpapi.getJson({
        engine: "google",
        q: query,
        api_key: process.env.SERP_API_KEY,
        num: 3,
    })
    const results = rawResults.organic_results?.map((res, i) => `[${i + 1}] ${res.title}\n${res.snippet}`).join("\n\n") || "No results found.";
    return results;
}

module.exports = searchWeb