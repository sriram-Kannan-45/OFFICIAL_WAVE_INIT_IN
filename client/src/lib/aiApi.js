import axios from 'axios';
const BASE = '/api/ai';

export const sendChatMessage = (messages, sessionId) =>
  axios.post(`${BASE}/chat`, { messages, sessionId });

export const askFaq = (question) =>
  axios.post(`${BASE}/faq`, { question });

export const summarizeText = (text, style) =>
  axios.post(`${BASE}/summarize`, { text, style });
