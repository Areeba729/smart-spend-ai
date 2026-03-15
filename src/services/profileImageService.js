/**
 * Profile image: store in Firestore only (no Firebase Storage required).
 * Uses a small base64 image to stay under Firestore size limits. Works on Spark (free) plan.
 */
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';

const USERS_COLLECTION = 'users';
const PROFILE_FIELD = 'profileImageUrl';

const PICKER_OPTIONS = {
  mediaType: 'photo',
  selectionLimit: 1,
  includeBase64: true,
  maxWidth: 400,
  maxHeight: 400,
  quality: 0.5,
};

/**
 * Pick image from gallery and return a data URL (base64) suitable for Firestore.
 * Keeps size small to stay under document limits. Returns null if cancelled/error.
 * @returns {Promise<string|null>} data URL like "data:image/jpeg;base64,..." or null
 */
export function pickImageFromGallery() {
  return new Promise((resolve) => {
    launchImageLibrary(PICKER_OPTIONS, (response) => {
      if (response.didCancel || response.errorCode) {
        resolve(null);
        return;
      }
      const asset = response.assets?.[0];
      if (!asset?.base64) {
        resolve(null);
        return;
      }
      const type = asset.type ?? 'image/jpeg';
      const dataUrl = `data:${type};base64,${asset.base64}`;
      resolve(dataUrl);
    });
  });
}

/**
 * Save or update the profile image URL (or data URL) in the user's Firestore document.
 * @param {string} uid - Firebase Auth user id
 * @param {string} imageUrl - URL or data URL string
 */
export async function saveProfileImageUrlToFirestore(uid, imageUrl) {
  if (!uid || !imageUrl) {
    throw new Error('uid and imageUrl are required');
  }
  const user = auth().currentUser;
  if (!user || user.uid !== uid) {
    throw new Error('User not authenticated');
  }
  await firestore().collection(USERS_COLLECTION).doc(uid).set(
    { [PROFILE_FIELD]: imageUrl },
    { merge: true }
  );
}

/**
 * Fetch the profile image URL (or data URL) from Firestore for the given user.
 * @param {string} uid - Firebase Auth user id
 * @returns {Promise<string|null>} profile image URL/data URL or null
 */
export async function getProfileImageUrlFromFirestore(uid) {
  if (!uid) return null;
  const doc = await firestore().collection(USERS_COLLECTION).doc(uid).get();
  if (!doc.exists) return null;
  return doc.data()[PROFILE_FIELD] ?? null;
}

/**
 * No-op for compatibility: "upload" is now just saving the data URL to Firestore.
 * The hook calls pickImageFromGallery (which returns data URL) then saveProfileImageUrlToFirestore.
 */
export async function uploadImageToStorage(dataUrlOrUri, uid) {
  if (!dataUrlOrUri || !uid) throw new Error('Missing data or uid');
  return dataUrlOrUri;
}
