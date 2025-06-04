// /routes/chat.js
import express from 'express';
import { getGeminiReply } from '../models/utils/ElenaAi.js';

const router = express.Router();

router.post('/ElenaAI', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
    const reply = await getGeminiReply(message);
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate reply.' });
  }
});

export default router;
