const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getChatModel = () =>
  genAI.getGenerativeModel({
    model: 'gemini-3.1-flash-lite',
    generationConfig: { maxOutputTokens: 512, temperature: 0.7 },
  });

const getModel = (maxTokens = 512) =>
  genAI.getGenerativeModel({
    model: 'gemini-3.1-flash-lite',
    generationConfig: { maxOutputTokens: maxTokens, temperature: 0.5 },
  });

module.exports = { getChatModel, getModel };
