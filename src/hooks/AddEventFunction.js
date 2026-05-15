import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const createEventId = () => firestore().collection('usersEvents').doc().id;

const getEventId = (event, index) => event?.id || `legacy-${index}`;

export const deleteEventFromFirestore = async eventId => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    const userDocRef = firestore().collection('usersEvents').doc(user.uid);
    const docSnapshot = await userDocRef.get();

    if (!docSnapshot.exists()) {
      throw new Error('No events found');
    }

    const events = docSnapshot.data()?.events || [];
    const updatedEvents = events.filter(
      (event, index) => getEventId(event, index) !== eventId,
    );

    if (updatedEvents.length === events.length) {
      throw new Error('Event not found');
    }

    await userDocRef.set({ events: updatedEvents }, { merge: true });

    console.log('Event deleted successfully!');
  } catch (error) {
    console.log('Error deleting event:', error.message);
    throw error;
  }
};

export const updateEventInFirestore = async (eventIndex, event) => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    const userDocRef = firestore().collection('usersEvents').doc(user.uid);
    const docSnapshot = await userDocRef.get();

    if (!docSnapshot.exists()) {
      throw new Error('No events found');
    }

    const events = docSnapshot.data()?.events || [];

    if (eventIndex < 0 || eventIndex >= events.length) {
      throw new Error('Event not found');
    }

    const existingId = getEventId(events[eventIndex], eventIndex);

    events[eventIndex] = {
      id: existingId,
      title: event.title,
      description: event.description,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    };

    await userDocRef.set({ events }, { merge: true });

    console.log('Event updated successfully!');
    return events[eventIndex];
  } catch (error) {
    console.log('Error updating event:', error.message);
    throw error;
  }
};

export const saveEventToFirestore = async event => {
  try {
    const user = auth().currentUser;
    if (!user) throw new Error('User not logged in');

    const userDocRef = firestore().collection('usersEvents').doc(user.uid);

    const eventData = {
      id: event.id || createEventId(),
      title: event.title,
      description: event.description,
      start: event.start.toISOString(),
      end: event.end.toISOString(),
    };

    await userDocRef.set(
      {
        events: firestore.FieldValue.arrayUnion(eventData),
      },
      { merge: true }, // 👈 merge with existing array
    );

    console.log('Event saved successfully!');
    return eventData;
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
