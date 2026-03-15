import { useState, useCallback, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../redux/slices/userSlice';
import {
  pickImageFromGallery,
  uploadImageToStorage,
  saveProfileImageUrlToFirestore,
  getProfileImageUrlFromFirestore,
} from '../services/profileImageService';

/**
 * Hook: load profile image URL, pick + upload new image, update UI and Firestore.
 * Uses Redux user.uid and updates Redux with profileImageUrl for immediate UI.
 */
export function useProfileImage() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.userReducer?.user);
  const uid = user?.uid ?? auth().currentUser?.uid;

  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = user?.profileImageUrl ?? null;
    setProfileImageUrl(url);
  }, [user?.uid, user?.profileImageUrl]);

  const refreshProfileImage = useCallback(async () => {
    if (!uid) return;
    setError(null);
    try {
      const url = await getProfileImageUrlFromFirestore(uid);
      setProfileImageUrl(url);
      if (url) dispatch(updateUser({ profileImageUrl: url }));
    } catch (e) {
      setError(e.message);
    }
  }, [uid, dispatch]);

  const pickAndUploadProfileImage = useCallback(async () => {
    if (!uid) {
      setError('Not logged in');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const localUri = await pickImageFromGallery();
      if (!localUri) {
        setLoading(false);
        return;
      }
      const downloadUrl = await uploadImageToStorage(localUri, uid);
      await saveProfileImageUrlToFirestore(uid, downloadUrl);
      setProfileImageUrl(downloadUrl);
      dispatch(updateUser({ profileImageUrl: downloadUrl }));
    } catch (e) {
      setError(e.message ?? 'Upload failed');
    } finally {
      setLoading(false);
    }
  }, [uid, dispatch]);

  const displayUrl = profileImageUrl ?? user?.profileImageUrl ?? null;

  return {
    profileImageUrl: displayUrl,
    loading,
    error,
    refreshProfileImage,
    pickAndUploadProfileImage,
  };
}
