import firestore from '@react-native-firebase/firestore';

// ── Config ──────────────────────────────────────────────────────────────────
// Use your machine's local IP when testing on a physical device.
// e.g. 'http://192.168.1.100:8080'
// Android emulator: 'http://10.0.2.2:8080'
const SERVER_URL = 'http://192.168.1.6:8080';

// ── Main export ──────────────────────────────────────────────────────────────
/**
 * Sends a receipt image to the Mindee backend and returns structured data.
 *
 * @param {string} imagePath - Native file path from takePhoto() (no file:// prefix)
 * @returns {{ merchant: string, amount: string, date: Date|null }}
 */
export const scanReceiptWithMindee = async imagePath => {
  const formData = new FormData();
  formData.append('receipt', {
    uri: `file://${imagePath}`,
    type: 'image/jpeg',
    name: 'receipt.jpg',
  });

  const res = await fetch(`${SERVER_URL}/scan`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Server error: ${res.status}`);
  }

  const response = await res.json();
  const prediction = response.data || {};

  // Mindee ReceiptV5 prediction fields
  const merchant = prediction?.supplier_name ?? '';
  const amount =
    prediction?.total_amount != null ? String(prediction.total_amount) : '';

  const rawDate = prediction?.date ?? null;
  const rawTime = prediction?.time ?? null;
  const category = prediction?.purchase_category ?? null;
  const currency = prediction?.currency ?? null;

  const date = createFirestoreTimestamp(rawDate, rawTime);

  return {
    title: merchant,
    amount,
    date,
    category,
    note: `${merchant} receipt Scanned`,
    currency,
  };
};

export function createFirestoreTimestamp(date, time) {
  let dateObj;

  // If both date and time are provided
  if (date) {
    // Combine date and time if time exists
    const dateTimeString = time ? `${date}T${time}:00` : `${date}T00:00:00`;

    dateObj = new Date(dateTimeString);

    // If the date is invalid, fallback to current timestamp
    if (isNaN(dateObj.getTime())) {
      dateObj = new Date();
    }
  } else {
    // No date provided, use current timestamp
    dateObj = new Date();
  }

  return firestore.Timestamp.fromDate(dateObj);
}
