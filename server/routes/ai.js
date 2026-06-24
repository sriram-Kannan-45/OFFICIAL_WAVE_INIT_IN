const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { getChatModel, getModel } = require('../lib/gemini');
const ChatSession = require('../models/ChatSession');
const FaqCache = require('../models/FaqCache');

const aiLimiter = rateLimit({ windowMs: 60_000, max: 20,
  message: { error: 'Too many requests, slow down.' } });
router.use(aiLimiter);

router.post('/chat', async (req, res) => {
  try {
    const { messages, sessionId } = req.body;
    if (!messages?.length) return res.status(400).json({ error: 'No messages' });

    const model = getChatModel();
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));
    const chat = model.startChat({
      history,
      systemInstruction: { parts: [{ text: 'You are a helpful assistant for this web application. Keep replies concise.' }] },
    });
    const result = await chat.sendMessage(messages.at(-1).content);
    const reply = result.response.text();

    if (sessionId) {
      try {
        await ChatSession.findOneAndUpdate(
          { sessionId },
          {
            $push: {
              messages: {
                $each: [
                  { role: 'user', content: messages.at(-1).content },
                  { role: 'assistant', content: reply },
                ],
              },
            },
          },
          { upsert: true }
        );
      } catch (dbErr) {
        console.error('Failed to save chat session to MongoDB:', dbErr.message);
      }
    }

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI service error' });
  }
});

router.post('/faq', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question required' });

    const normalized = question.toLowerCase().trim();
    let cached = null;
    try {
      cached = await FaqCache.findOneAndUpdate(
        { question: normalized },
        { $inc: { hitCount: 1 } }
      );
    } catch (dbErr) {
      console.error('Failed to query FaqCache from MongoDB:', dbErr.message);
    }

    if (cached) return res.json({ answer: cached.answer, suggestions: cached.suggestions });

    const model = getModel(256);
    const prompt = `Answer this question about our web app: "${question}"
Reply ONLY with valid JSON, no markdown:
{ "answer": "string", "suggestions": ["string", "string"] }`;
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json|```/g, '').trim();
    const json = JSON.parse(text);

    try {
      await FaqCache.create({ question: normalized, ...json, hitCount: 1 });
    } catch (dbErr) {
      console.error('Failed to cache FAQ response in MongoDB:', dbErr.message);
    }

    res.json(json);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI service error' });
  }
});

router.post('/summarize', async (req, res) => {
  try {
    const { text, style = 'paragraph' } = req.body;
    if (!text || text.length < 50 || text.length > 5000)
      return res.status(400).json({ error: 'Text must be 50–5000 characters' });

    const styleMap = {
      tldr:      'Summarize in one sentence (TL;DR):',
      bullets:   'Summarize as 4-5 bullet points using the • character:',
      paragraph: 'Summarize in a short paragraph (3-5 sentences):',
    };
    const instruction = styleMap[style] || styleMap.paragraph;
    const model = getModel(300);
    const result = await model.generateContent(`${instruction}\n\n${text}`);
    res.json({ summary: result.response.text() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI service error' });
  }
});

module.exports = router;
