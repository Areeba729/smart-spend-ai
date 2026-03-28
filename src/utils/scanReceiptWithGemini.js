import RNFS from 'react-native-fs';

// ── Config ──────────────────────────────────────────────────────────────────
// Replace with your free key from https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = '';

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

const PROMPT = `You are a receipt data extractor. Look at this receipt image and extract:
- merchant: the store or business name printed at the top
- amount: the final total amount paid as a plain decimal number (e.g. "720.00"), no currency symbols
- date: the transaction date in YYYY-MM-DD format

Reply ONLY with valid JSON — no explanation, no markdown:
{"merchant": "...", "amount": "...", "date": "..."}

If a field cannot be found, use null for that field.`;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function callGemini(base64) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: base64 } },
            { text: PROMPT },
          ],
        },
      ],
      generationConfig: { temperature: 0, maxOutputTokens: 256 },
    }),
  });

  if (res.status === 429) {
    return null; // signal to retry
  }

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status}`);
  }

  return res.json();
}

// ── Main export ──────────────────────────────────────────────────────────────
/**
 * Sends a receipt image to Gemini and returns structured data.
 * Retries once after 5 s if the API returns 429 (rate limit).
 *
 * @param {string} imagePath - Native file path (no file:// prefix) from takePhoto()
 * @returns {{ merchant: string, amount: string, date: Date|null }}
 */
export async function scanReceiptWithGemini(imagePath) {
  const base64 = await RNFS.readFile(imagePath, 'base64');

  let data = await callGemini(base64);
  if (data === null) {
    // 429 — wait 5 s and retry once
    await sleep(5000);
    data = await callGemini(base64);
    if (data === null) {
      throw new Error('Rate limit exceeded. Please wait a moment and try again.');
    }
  }

  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  // Strip markdown code fences if Gemini wraps the JSON in them
  const jsonStr = rawText
    .replace(/^```json?\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();

  const parsed = JSON.parse(jsonStr);

  const parsedDate = parsed.date ? new Date(parsed.date) : null;

  return {
    merchant: parsed.merchant ?? '',
    amount: parsed.amount != null ? String(parsed.amount) : '',
    date: parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null,
  };
}
