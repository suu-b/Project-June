const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config();

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.7,
});

async function runLLM(query, context) {
  const contextString = Array.isArray(context)
    ? context.map((chunk, i) => `[${i + 1}] ${chunk.pageContent || chunk}`).join("\n")
    : "";

  const prompt = `
You are a helpful research assistant.
User query: "${query}"
Context:
${contextString}

Answer:
`;

  try {
    const response = await llm.invoke(prompt);
    return response;
  } catch (err) {
    console.error("LLM Error:", err);
    throw new Error("Failed to get response from Gemini.");
  }
}

async function runLLMToGetFormattedTitle(fileName) {
  const prompt = `
You are a master of wordplays. Can you rename the following the title of a file in not more than three words?. However, to not lose the essential meaning of the title.
file name: "${fileName}"
Answer:
`;
  try {
    const response = await llm.invoke(prompt);
    return response;
  } catch (err) {
    console.error("LLM Error:", err);
    throw new Error("Failed to get response from Gemini.");
  }
}

module.exports = { runLLM , runLLMToGetFormattedTitle};
