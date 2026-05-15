// import React, { useState, useCallback } from 'react';
// import {
//   Image,
//   Modal,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { useFocusEffect } from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
// import { Theme } from '../../../libs';
// import { logout, selectUser } from '../../../redux/slices/userSlice';
// import { useProfileImage } from '../../../hooks/useProfileImage';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import styles from './style';
// import { SvgXml } from 'react-native-svg';
// import { deleteSvg } from '../../../assets/icons';

// const Profile = ({ navigation }) => {
//   const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
//   const user = useSelector(selectUser);
//   const dispatch = useDispatch();
//   const { profileImageUrl, refreshProfileImage } = useProfileImage();
//   const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
//   useFocusEffect(
//     useCallback(() => {
//       refreshProfileImage();
//     }, [refreshProfileImage]),
//   );

//   const handleLogout = () => {
//     dispatch(logout());
//     setLogoutModalVisible(false);
//   };

//   const handleCancelLogout = () => {
//     setLogoutModalVisible(false);
//   };

//   // ✅ Delete Account
//   const handleDeleteAccount = async () => {
//     try {
//       const currentUser = auth().currentUser;

//       if (currentUser) {
//         // 🔥 Delete Firestore user data first
//         await firestore().collection('users').doc(currentUser.uid).delete();

//         // 🔥 Delete Firebase Auth user
//         await currentUser.delete();
//       }

//       dispatch(logout());
//       setDeleteModalVisible(false);
//     } catch (error) {
//       console.log('Delete Error:', error);
//     }
//   };
//   const firstLetter = (user?.fullName || user?.email || '?')
//     .charAt(0)
//     .toUpperCase();

//   return (
//     <View style={styles.container}>
//       <SimpleHeader title="Profile" />
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* Profile Info - image is display only; update from Edit Profile */}
//         <View style={styles.profileSection}>
//           <View style={styles.profileImageContainer}>
//             {profileImageUrl ? (
//               <Image
//                 source={{ uri: profileImageUrl }}
//                 style={styles.profileImage}
//               />
//             ) : (
//               <View
//                 style={[styles.profileImage, styles.profileImagePlaceholder]}
//               >
//                 <Text style={styles.profilePlaceholderText}>{firstLetter}</Text>
//               </View>
//             )}
//           </View>

//           <Text style={styles.userName}>
//             {user ? user.fullName : 'User Name'}
//           </Text>
//           <Text style={styles.userEmail}>{user ? user.email : 'user?'}</Text>
//           <Text style={styles.userPhone}>
//             {user ? user.phone : '+92 300 1234567'}
//           </Text>
//         </View>

//         {/* Budget & Saving Goal Cards */}
//         <View style={styles.cardsRow}>
//           <View style={styles.budgetCard}>
//             <Text style={styles.cardIcon}>💳</Text>
//             <Text style={styles.cardLabel}>MONTHLY BUDGET</Text>
//             <Text style={styles.cardAmount}>
//               PKR {user ? user.monthlyBudget : ''}
//             </Text>
//           </View>

//           <View style={styles.budgetCard}>
//             <Text style={styles.cardIcon}>🎯</Text>
//             <Text style={styles.cardLabel}>SAVING GOAL</Text>
//             <Text style={styles.cardAmount}>PKR 50,000</Text>
//           </View>
//         </View>

//         {/* Menu List */}
//         <View style={styles.menuContainer}>
//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => navigation.navigate('UserProfile')}
//           >
//             <Text style={styles.menuIcon}>✏️</Text>
//             <Text style={styles.menuText}>Edit Profile</Text>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>

//           {/* <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => navigation.navigate('BudgetGoalScreen')}
//           >
//             <Text style={styles.menuIcon}>⚖️</Text>
//             <Text style={styles.menuText}>Budget & Goals</Text>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity> */}

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => navigation.navigate('Settings')}
//           >
//             <Text style={styles.menuIcon}>⚙️</Text>
//             <Text style={styles.menuText}>Settings</Text>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.menuItem}
//             onPress={() => navigation.navigate('HelpAndSupport')}
//           >
//             <Text style={styles.menuIcon}>❓</Text>
//             <Text style={styles.menuText}>Help & Support</Text>
//             <Text style={styles.arrow}>›</Text>
//           </TouchableOpacity>

//           {/* Logout Button */}
//           <TouchableOpacity
//             style={[styles.menuItem, styles.logoutItem]}
//             onPress={() => setLogoutModalVisible(true)}
//           >
//             <Text style={styles.logoutIcon}>⎋</Text>
//             <Text style={styles.logoutText}>Logout</Text>
//           </TouchableOpacity>

//           {/* Delete Account */}
//           <TouchableOpacity
//             style={[styles.menuItem, styles.deleteItem]}
//             onPress={() => setDeleteModalVisible(true)}
//           >
//             <SvgXml xml={deleteSvg} />
//             <Text style={styles.deleteText}>Delete Account</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>

//       {/* Logout Confirmation Modal */}
//       <Modal
//         transparent={true}
//         animationType="slide"
//         visible={isLogoutModalVisible}
//         onRequestClose={handleCancelLogout}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Log Out</Text>
//             <Text style={styles.modalMessage}>
//               Are you sure you want to log out of your account? You will need to
//               sign in again to access your budget data.
//             </Text>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={handleCancelLogout}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.logoutButton}
//                 onPress={handleLogout}
//               >
//                 <Text style={styles.logoutButtonText}>Yes, Logout</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>

//       <Modal
//         transparent
//         animationType="slide"
//         visible={isDeleteModalVisible}
//         onRequestClose={() => setDeleteModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Delete Account</Text>
//             <Text style={styles.modalMessage}>
//               This action is permanent. All your data will be deleted.
//             </Text>

//             <View style={styles.modalButtons}>
//               <TouchableOpacity
//                 style={styles.cancelButton}
//                 onPress={() => setDeleteModalVisible(false)}
//               >
//                 <Text style={styles.cancelButtonText}>Cancel</Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={styles.logoutButton}
//                 onPress={handleDeleteAccount}
//               >
//                 <Text style={styles.logoutButtonText}>Yes, Delete</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default Profile;

import React, { useState, useCallback } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { logout, selectUser } from '../../../redux/slices/userSlice';
import { useProfileImage } from '../../../hooks/useProfileImage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './style';
import { SvgXml } from 'react-native-svg';
import { deleteSvg, eyeIcon, eyeOffIcon } from '../../../assets/icons';
import { Theme } from '../../../libs';

const Profile = ({ navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { profileImageUrl, refreshProfileImage } = useProfileImage();

  useFocusEffect(
    useCallback(() => {
      refreshProfileImage();
    }, [refreshProfileImage]),
  );

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    setLogoutModalVisible(false);
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  // Re-authenticate with email + password
  const reAuthenticateUser = async (email, password) => {
    const userAuth = auth().currentUser;
    const credential = auth.EmailAuthProvider.credential(email, password);
    return userAuth.reauthenticateWithCredential(credential);
  };

  // Delete account
  const handleDeleteAccount = async () => {
    if (!emailInput || !passwordInput) {
      Alert.alert('Missing Fields', 'Please enter both email and password.');
      return;
    }

    if (emailInput !== user.email) {
      Alert.alert(
        'Email Mismatch',
        'Entered email does not match your account.',
      );
      return;
    }

    try {
      setIsDeleting(true);

      const currentUser = auth().currentUser;

      if (currentUser) {
        // 🔐 Re-authenticate
        await reAuthenticateUser(emailInput, passwordInput);

        // 🔥 Delete Firestore data
        await firestore().collection('users').doc(currentUser.uid).delete();

        // 🔥 Delete Firebase Auth user
        await currentUser.delete();
      }

      // Clear Redux
      dispatch(logout());

      // Navigate to Signup
      navigation.reset({
        index: 0,
        routes: [{ name: 'Signup' }],
      });
    } catch (error) {
      console.log('Delete Error:', error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Wrong password. Please try again.');
      } else if (error.code === 'auth/requires-recent-login') {
        Alert.alert('Error', 'Please login again to delete your account.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setIsDeleting(false);
      setPasswordInput('');
      setEmailInput('');
      setDeleteModalVisible(false);
    }
  };

  const firstLetter = (user?.fullName || user?.email || '?')
    .charAt(0)
    .toUpperCase();

  return (
    <View style={styles.container}>
      <SimpleHeader title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {profileImageUrl ? (
              <Image
                source={{ uri: profileImageUrl }}
                style={styles.profileImage}
              />
            ) : (
              <View
                style={[styles.profileImage, styles.profileImagePlaceholder]}
              >
                <Text style={styles.profilePlaceholderText}>{firstLetter}</Text>
              </View>
            )}
          </View>

          <Text style={styles.userName}>
            {user ? user.fullName : 'User Name'}
          </Text>
          <Text style={styles.userEmail}>{user ? user.email : 'user?'}</Text>
          <Text style={styles.userPhone}>
            {user ? user.phone : '+92 300 1234567'}
          </Text>
        </View>
        {/* Budget & Saving Goal Cards
        <View style={styles.cardsRow}>
          <View style={styles.budgetCard}>
            <Text style={styles.cardIcon}>💳</Text>
            <Text style={styles.cardLabel}>MONTHLY BUDGET</Text>
            <Text style={styles.cardAmount}>
              PKR {user ? user.monthlyBudget : ''}
            </Text>
          </View>

          <View style={styles.budgetCard}>
            <Text style={styles.cardIcon}>🎯</Text>
            <Text style={styles.cardLabel}>SAVING GOAL</Text>
            <Text style={styles.cardAmount}>PKR 50,000</Text>
          </View>
        </View> */}
        {/* Menu */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('UserProfile')}
          >
            <Text style={styles.menuIcon}>✏️</Text>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.menuIcon}>⚙️</Text>
            <Text style={styles.menuText}>Settings</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('HelpAndSupport')}
          >
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={styles.menuText}>Help & Support</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => setLogoutModalVisible(true)}
          >
            <Text style={styles.logoutIcon}>⎋</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          {/* Delete Account */}
          {/* <TouchableOpacity
            style={[styles.menuItem, styles.deleteItem]}
            
            onPress={() => setDeleteModalVisible(true)}
          > */}

          <TouchableOpacity
            style={[styles.menuItem, styles.deleteItem]}
            onPress={() => {
              setEmailInput(''); // Reset email
              setPasswordInput(''); // Reset password
              setDeleteModalVisible(true); // Open modal
            }}
          >
            <SvgXml xml={deleteSvg} width={20} height={20} />
            <Text style={styles.deleteText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={isLogoutModalVisible}
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out of your account?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancelLogout}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Yes, Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={isDeleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Account</Text>
            <Text style={styles.modalMessage}>
              Enter your email and password to confirm account deletion.
            </Text>

            <TextInput
              style={styles.passwordInput}
              placeholder="Email"
              placeholderTextColor={Theme.colors.grey}
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailInput}
              onChangeText={setEmailInput}
            />

            {/* <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={passwordInput}
                onChangeText={setPasswordInput}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <SvgXml xml={eyeIcon} />
                ) : (
                  <SvgXml xml={eyeOffIcon} />
                )}
              </TouchableOpacity>
            </View> */}

            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.passwordInputField}
                placeholder="Password"
                secureTextEntry={!isPasswordVisible}
                value={passwordInput}
                onChangeText={setPasswordInput}
              />
              <TouchableOpacity
                style={styles.eyeIconInside}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <SvgXml xml={eyeIcon} width={14} height={14} />
                ) : (
                  <SvgXml xml={eyeOffIcon} width={14} height={14} />
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleDeleteAccount}
                disabled={isDeleting}
              >
                <Text style={styles.logoutButtonText}>
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
