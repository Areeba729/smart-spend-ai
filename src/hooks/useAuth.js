import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

/**
 * Custom authentication hook
 * All auth + Firestore logic lives here
 */
const useAuth = () => {
  /**
   * Save user data in Firestore
   */
  const saveUserToFirestore = async (uid, userData) => {
    try {
      await firestore()
        .collection('users')
        .doc(uid)
        .set(
          {
            ...userData,
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        );
    } catch (error) {
      console.log('Firestore Save Error:', error);
      throw error;
    }
  };

  /**
   * Signup user using Firebase Auth
   */
  const signup = async formValues => {
    try {
      const { email, password, confirmPassword, ...rest } = formValues;

      // 1️⃣ Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const uid = userCredential.user.uid;

      // 2️⃣ Optional Firebase Cloud Function call
      // (example use case: welcome email, analytics, etc.)
      try {
        const signupTrigger = functions().httpsCallable('onUserSignup');
        await signupTrigger({ uid, email });
      } catch (fnError) {
        console.log('Function Error (non-blocking):', fnError);
      }

      // 3️⃣ Save user data in Firestore
      await saveUserToFirestore(uid, {
        email,
        ...rest,
        // isProfileComplete: false,
      });

      return {
        uid,
        email,
        ...rest,
        // isProfileComplete: false,
      };
    } catch (error) {
      console.log('Signup Error:', error);
      throw error;
    }
  };

  const loginUser = async formValues => {
    try {
      const { email, password } = formValues;

      // 1️⃣ Firebase Authentication
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const uid = userCredential.user.uid;

      // 2️⃣ Fetch user data from Firestore
      const userDoc = await firestore().collection('users').doc(uid).get();

      if (!userDoc.exists) {
        throw new Error('User data not found');
      }

      const userData = userDoc.data();

      // 3️⃣ Return combined user object
      return {
        uid,
        email: userCredential.user.email,
        ...userData,
      };
    } catch (error) {
      console.log('Login Error:', error);
      throw error;
    }
  };
  /**
   * Send password reset email
   */
  const resetPassword = async email => {
    try {
      await auth().sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.log('Reset Password Error:', error);
      throw error;
    }
  };

  return {
    signup,
    loginUser,
    resetPassword,
  };
};

export default useAuth;
