const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config();
const fs = require("fs");
const path = require("path")

const prompts = JSON.parse(fs.readFileSync(path.join(__dirname, "../prompts/prompts.json"), "utf8"));

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-lite",
  temperature: 0.7,
});

let hasGreetedUser = false;

function fillTemplate(template, vars) {
  return template.replace(/\${(.*?)}/g, (_, key) => vars[key.trim()] || "");
}

async function runLLM(query, context, messages = "") {
  let prompt = fillTemplate(prompts.basePrompt, { query, context, messages });

  if (!hasGreetedUser) {
    prompt = `Hello! ${prompt}`;
    hasGreetedUser = true;
  }

  try {
    const response = await llm.invoke(prompt);
    return response;
  } catch (err) {
    console.error("LLM Error:", err);
    throw new Error("Failed to get response from Gemini.");
  }
}

async function runLLMToSummarize(query, context) {
  const prompt = fillTemplate(prompts.summarizingPrompt, { query, context });

  try {
    const response = await llm.invoke(prompt);
    return response;
  } catch (err) {
    console.error("LLM Error:", err);
    throw new Error("Failed to get response from Gemini.");
  }
}

async function runLLMToGetFormattedTitle(fileName) {
  const prompt = fillTemplate(prompts.titlePrompt, { fileName });

  try {
    const response = await llm.invoke(prompt);
    return response;
  } catch (err) {
    console.error("LLM Error:", err);
    throw new Error("Failed to get response from Gemini.");
  }
}

module.exports = {
  runLLM,
  runLLMToGetFormattedTitle,
  runLLMToSummarize,
};
