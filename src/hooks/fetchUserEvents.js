// hooks/fetchUserEvents.js
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const fetchUserEvents = async (uidParam = null) => {
  try {
    const uid = uidParam || auth().currentUser?.uid;
    if (!uid) throw new Error('User not logged in');

    const docSnap = await firestore().collection('usersEvents').doc(uid).get();

    if (!docSnap.exists()) return [];

    const data = docSnap.data();
    const events = data?.events || [];

    // Normalize timestamps (if stored as Firestore Timestamp)
    return events.map((event, index) => ({
      ...event,
      id: event.id || `legacy-${index}`,
      start: event.start?.toDate ? event.start.toDate() : event.start,
      end: event.end?.toDate ? event.end.toDate() : event.end,
    }));
  } catch (error) {
    console.log('Error fetching user events:', error);
    return [];
  }
};
