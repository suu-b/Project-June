const { HuggingFaceInferenceEmbeddings } = require("@langchain/community/embeddings/hf");
const { HuggingFaceTransformersEmbeddings } = require("@langchain/community/embeddings/huggingface_transformers");  

require("dotenv").config();

const useLocalEmbedddings = process.env.IS_IT_LOCAL === "true";

const embeddings = useLocalEmbedddings
  ? new HuggingFaceTransformersEmbeddings({
      model: "Xenova/all-MiniLM-L6-v2",
    })
  : new HuggingFaceInferenceEmbeddings({
      modelName: "sentence-transformers/all-MiniLM-L6-v2",
      apiKey: process.env.HUGGING_FACE_API_KEY,
    });

console.log(
  useLocalEmbedddings
    ? "Using local Transformers model (Xenova/all-MiniLM-L6-v2)"
    : "Using Hugging Face Inference API (sentence-transformers/all-MiniLM-L6-v2)"
);

module.exports = embeddings;
