import React, { useState, useCallback } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { Theme } from '../../../libs';
import { logout, selectUser } from '../../../redux/slices/userSlice';
import { useProfileImage } from '../../../hooks/useProfileImage';
import styles from './style';

const Profile = ({ navigation }) => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { profileImageUrl, refreshProfileImage } = useProfileImage();

  useFocusEffect(
    useCallback(() => {
      refreshProfileImage();
    }, [refreshProfileImage])
  );

  const handleLogout = () => {
    dispatch(logout());
    setLogoutModalVisible(false);
  };

  const handleCancelLogout = () => {
    setLogoutModalVisible(false);
  };

  const firstLetter = (user?.fullName || user?.email || '?').charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <SimpleHeader title="Profile" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Info - image is display only; update from Edit Profile */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {profileImageUrl ? (
              <Image source={{ uri: profileImageUrl }} style={styles.profileImage} />
            ) : (
              <View style={[styles.profileImage, styles.profileImagePlaceholder]}>
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
