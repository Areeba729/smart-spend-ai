/**
 * Parses raw OCR text extracted from a receipt.
 *
 * Returns:
 *   merchant {string}  - first non-empty line (assumed to be the store name)
 *   amount   {string}  - numeric string near a "total" keyword (e.g. "10.00")
 *   date     {Date|null} - first valid date found in the text
 */
export function parseReceiptText(rawText) {
  const lines = rawText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { merchant: '', amount: '', date: null };
  }

  // ── Merchant ─────────────────────────────────────────────────────────────
  const merchant = lines[0];

  // ── Amount ────────────────────────────────────────────────────────────────
  // Look for a line that contains a "total" keyword, then grab the number after it.
  let amount = '';
  const totalKeywordRegex =
    /(?:grand\s?total|total\s?amount|amount\s?due|total|subtotal)\s*[:\-]?\s*/i;

  for (const line of lines) {
    if (totalKeywordRegex.test(line)) {
      // Extract the first number-like value on this line
      const numMatch = line.match(/([0-9]+(?:[.,][0-9]{1,2})?)/);
      if (numMatch) {
        amount = numMatch[1].replace(',', '.');
        break;
      }
    }
  }

  // ── Date ─────────────────────────────────────────────────────────────────
  // Supported formats (in order of priority):
  //   YYYY-MM-DD  (ISO)
  //   DD/MM/YYYY, DD-MM-YYYY, DD.MM.YYYY  (Pakistan convention)
  let date = null;

  const isoRegex = /\b(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})\b/;
  const dmy4Regex = /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/;

  for (const line of lines) {
    let m;

    // ISO: YYYY-MM-DD
    m = line.match(isoRegex);
    if (m) {
      const candidate = new Date(
        `${m[1]}-${m[2].padStart(2, '0')}-${m[3].padStart(2, '0')}`,
      );
      if (!isNaN(candidate.getTime())) {
        date = candidate;
        break;
      }
    }

    // DD/MM/YYYY (Pakistan standard)
    m = line.match(dmy4Regex);
    if (m) {
      const candidate = new Date(
        `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`,
      );
      if (!isNaN(candidate.getTime())) {
        date = candidate;
        break;
      }
    }
  }

  return { merchant, amount, date };
}
