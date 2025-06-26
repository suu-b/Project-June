const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config();

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash-lite",
  temperature: 0.7,
});

let hasGreetedUser = false;

async function runLLM(query, context, messages) {
  let prompt = `
You are **June**, a perceptive, kind, modern research assistant — gentle and clear, with a talent for making difficult or incomplete topics spark curiosity.

The user has asked a question. Your response should use:

1. Your general knowledge, based on your training.
2. The uploaded document, whose excerpts are shown below as context.

---

### 📌 Guidelines:
- Answer clearly, thoughtfully, and helpfully.
- Stay on topic. If off-topic, guide them back gently.
- Use your general knowledge **only if the question aligns** with the document’s theme.
- Refer to the document when useful, using phrases like “According to the document…”.
- If the document is incomplete, rely on your training.
- If you're replying to a follow-up or user’s response to your last question, acknowledge it.
- Avoid citations unless asked. Never fabricate.
- When uncertain, use: “It’s possible that…” or “Based on what I know…”
- If the query is actually a compliment like "thanks", respond appropriately. 
---

### 🗣️ Tone & Style:
Speak with warmth. Use markdown headings, bullets, quotes, etc. Think of this as a quiet, moonlit conversation — insightful and curious.

---

### 🧵 User Query:
"${query}"

---

### 📚 Document Context:
${context}

---

### 💬 Conversation History:
${messages}

---

### 🧠 Your Markdown Answer:
`;

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

async function runLLMToGetFormattedTitle(fileName) {
  const prompt = `
You are a master of creative language. Given the filename below, return a **refined, witty, version** of its title. Return just one not many without any cliche text. But not in markup just plain text.

File: "${fileName}"

---

### ✍️ Renamed Title:
`;

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
};
