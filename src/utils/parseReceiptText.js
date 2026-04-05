/**
 * Fixes common OCR character substitutions inside a string that is
 * expected to represent a number (e.g. "72o" → "720").
 */
function fixOcrNumber(str) {
  return str
    .replace(/[oO]/g, '0')
    .replace(/[lI|]/g, '1')
    .replace(/[zZ]/g, '2')
    .replace(/[sS]/g, '5');
}

/**
 * Returns true when a line looks like a printed receipt label rather than
 * meaningful content (e.g. the word "Amount" or "Merchant" on its own).
 */
function isLabelLine(line) {
  // Single-word common labels, optionally followed by a colon
  return /^(amount|g[a-z]?mount|merchant|m[o0]rchant|total|subtotal|date|tax|gst|vat|qty|item|price|receipt|invoice|bill|cashier|change|cash|card|paid)\s*:?\s*$/i.test(
    line,
  );
}

/**
 * Returns true when a line is (almost) entirely a price / number.
 */
function isPriceLine(line) {
  return /^[Rs.\sPKR]*[0-9oOlI\/]+([.,][0-9oOlI]{1,2})?\/?\s*$/i.test(line);
}

/**
 * Parses raw OCR text extracted from a receipt.
 *
 * Returns:
 *   merchant {string}    - best-guess store / merchant name
 *   amount   {string}    - numeric string for the total (e.g. "720.00")
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

  const dateLineRegex = /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/;

  // ── Merchant ─────────────────────────────────────────────────────────────
  // Skip label lines, price-only lines, and date lines.
  // Take the first line that looks like an actual name.
  let merchant = '';
  for (const line of lines) {
    if (
      !isLabelLine(line) &&
      !isPriceLine(line) &&
      !dateLineRegex.test(line) &&
      line.length >= 3 &&
      /[a-zA-Z]{2,}/.test(line)
    ) {
      merchant = line;
      break;
    }
  }

  // ── Amount ────────────────────────────────────────────────────────────────
  let amount = '';

  // Pass 1 – keyword on the same line (tolerant of OCR misreads like "T0tal")
  const totalKeywordRegex =
    /(?:grand\s?total|total\s?amount|amount\s?due|t[o0]tal|sub\s?total|net\s?amount|payable|to\s?pay|g?mount)\s*[:\-]?\s*/i;

  for (const line of lines) {
    if (totalKeywordRegex.test(line)) {
      const numMatch = fixOcrNumber(line).match(/([0-9]+(?:[.,][0-9]{1,2})?)/);
      if (numMatch) {
        amount = numMatch[1].replace(',', '.');
        break;
      }
    }
  }

  // Pass 2 – value is on the next line after a standalone label
  if (!amount) {
    for (let i = 0; i < lines.length - 1; i++) {
      if (
        /^(amount|g[a-z]?mount|total|payable|due)\s*:?\s*$/i.test(lines[i])
      ) {
        const numMatch = fixOcrNumber(lines[i + 1]).match(
          /([0-9]+(?:[.,][0-9]{1,2})?)/,
        );
        if (numMatch) {
          amount = numMatch[1].replace(',', '.');
          break;
        }
      }
    }
  }

  // Pass 3 – fallback: largest numeric value on the receipt
  if (!amount) {
    let maxVal = 0;
    for (const line of lines) {
      const nums = fixOcrNumber(line).match(/\b([0-9]{2,}(?:[.,][0-9]{1,2})?)\b/g);
      if (nums) {
        for (const n of nums) {
          const val = parseFloat(n.replace(',', '.'));
          if (val > maxVal) {
            maxVal = val;
            amount = n.replace(',', '.');
          }
        }
      }
    }
  }

  // ── Date ─────────────────────────────────────────────────────────────────
  let date = null;

  const isoRegex = /\b(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})\b/;
  const dmy4Regex = /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/;

  for (const line of lines) {
    let m;

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
