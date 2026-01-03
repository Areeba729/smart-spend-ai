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
