const { OLLAMA_BASE_URL, OLLAMA_MODEL, SYSTEM_PROMPT } = require('../config/ollama');

/**
 * POST /chat
 * Body: { messages: [{ role: 'user' | 'assistant', content: string }] }
 *
 * Accepts a conversation history so multi-turn context is preserved on the client side.
 * The system prompt is always prepended server-side.
 */
async function chat(req, res) {
  console.log('request received');
  
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: '`messages` must be a non-empty array.' });
  }

  const validRoles = ['user', 'assistant'];
  const isValid = messages.every(
    m => validRoles.includes(m.role) && typeof m.content === 'string' && m.content.trim(),
  );

  if (!isValid) {
    return res
      .status(400)
      .json({ error: 'Each message must have a `role` (user|assistant) and a `content` string.' });
  }

  const payload = {
    model: OLLAMA_MODEL,
    stream: false,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
  };

  try {
    const ollamaRes = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!ollamaRes.ok) {
      const text = await ollamaRes.text();
      console.error('Ollama error:', text);
      return res.status(502).json({ error: 'Ollama server returned an error.' });
    }

    const data = await ollamaRes.json();
    const reply = data?.message?.content ?? '';

    return res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({ error: 'Failed to reach Ollama server.' });
  }
}

module.exports = { chat };
