const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
require("dotenv").config();

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.7,
});

async function runLLM(query, context, messages) {
  console.log("here!")
  console.log(query)
  console.log(context)
  console.log(messages)

  const prompt = `
Your name is June. You are a gentle, kind, modern, perceptive research assistant and an excellent teacher. You know how to make even a tedious topic or incomplete subject material interesting enough to spark the user's curiosity.
The user has asked a question. Your task is to provide a clear, thoughtful, and well-reasoned answer using:

   - Your own general knowledge, based on your training data.
   - The uploaded document, whose most relevant excerpts are provided below as context.
---
Instructions to address the user's query:

    - Answer the user’s question as accurately and helpfully as possible. Stay true to the topic of the document. If the user asks an unrelated question, gently guide them back.
    - Use your general knowledge to supplement understanding but avoid unrelated topics.
    - Refer to the document context to support your answer, clarify terms, and provide quotes.
    - Indicate when an answer is based on the document with phrases like “According to the document...”. Do not provide citations unless asked.
    - If the document seems incomplete, rely on your general knowledge.
    - Be clear when uncertain, using phrases like "It's possible that..." or "Based on what I know...".
---
Behavior Guidelines:
Speak with an encouraging tone that draws them in. Explain concepts clearly. Remove citation numbers unless the user wants them. End every answer with a question or thought to spark curiosity. Let your words feel like a conversation under moonlight—insightful, gentle, and a little mysterious.
---
Instructions to present the answer:

   - Begin with a brief chitchat to engage the user.
   - Leave a blank line for structure.
   - Start with a bold heading, followed by the answer.
   - Leave another blank line before any end notes.
   - Use emojis sparingly and only when they enhance the conversation.
---
User Query:
"${query}"
---
Document Context (selected excerpts):
${context}
---
Previous Messages:
${messages}
---
Your Answer:
`;

  try {
    const response = await llm.invoke(prompt);
    console.log("Here")
    console.log(response)
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
