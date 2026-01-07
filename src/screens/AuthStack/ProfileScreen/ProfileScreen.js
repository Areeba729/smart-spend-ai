import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { images } from '../../../assets/images';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { Theme } from '../../../libs';
import { logout, selectUser } from '../../../redux/slices/userSlice';
import styles from './style'; // Separate style file

// Placeholder profile image - replace with your actual image
// const PROFILE_IMAGE = require('../../../assets/profile.jpg'); // Or use { uri: 'https://...' }

const Profile = ({ navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    console.log('User logged out');
    setLogoutModalVisible(false);
    // Navigate to login screen or perform other actions
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />

      <SimpleHeader title="Profile" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image source={images.profile} style={styles.profileImage} />
            <View style={styles.verifiedBadge}>
              <Text style={styles.verifiedIcon}>✎</Text>
            </View>
          </View>

          <Text style={styles.userName}>
            {user ? user.fullName : 'User Name'}
          </Text>
          <Text style={styles.userEmail}>{user ? user.email : 'user?'}</Text>
          <Text style={styles.userPhone}>
            {user ? user.phone : '+92 300 1234567'}
          </Text>
        </View>

        {/* Budget & Saving Goal Cards */}
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
        </View>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('UserProfile')}
          >
            <Text style={styles.menuIcon}>✏️</Text>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('BudgetGoalScreen')}
          >
            <Text style={styles.menuIcon}>⚖️</Text>
            <Text style={styles.menuText}>Budget & Goals</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity> */}

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

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={() => setLogoutModalVisible(true)}
          >
            <Text style={styles.logoutIcon}>⎋</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={isLogoutModalVisible}
        onRequestClose={handleCancelLogout}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log Out</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out of your account? You will need to
              sign in again to access your budget data.
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
                <Text style={styles.logoutButtonText}>Yes, Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
