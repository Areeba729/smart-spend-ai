import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const saveEventToFirestore = async event => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    const userDocRef = firestore().collection('usersEvents').doc(user.uid);

    await userDocRef.set(
      {
        events: firestore.FieldValue.arrayUnion({
          title: event.title,
          description: event.description,
          start: event.start.toISOString(),
          end: event.end.toISOString(),
        }),
      },
      { merge: true }, // 👈 merge with existing array
    );

    console.log('Event saved successfully!');
  } catch (error) {
    console.log('Error saving event:', error.message);
  }
};

// Fetch Curretent User Events
export const fetchUserEvents = async () => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    const userDocRef = firestore().collection('usersEvents').doc(user.uid);
    const docSnapshot = await userDocRef.get();

    if (!docSnapshot.exists()) {
      return []; // No events yet
    }

    const userData = docSnapshot.data();
    return userData.events || [];
  } catch (error) {
    console.log('Error fetching events:', error.message);
    return [];
  }
};
