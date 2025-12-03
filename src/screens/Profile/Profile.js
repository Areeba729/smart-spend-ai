import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import {
  cheveron,
  infoIcon,
  lockIcon,
  logoutIcon,
  profileIcon,
  trashIcon,
  usersIcon,
} from '../../assets/icons/index.js';
import { Theme } from '../../libs/index.js';

import NativeText from '../../components/NativeText/NativeText.js';
import PageHeader from '../../components/PageHeader/PageHeader';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

import { images } from '../../assets/images/index.js';
import CustomBackDrop from './CustomBackDrop.js';
import styles from './Style';

const { colors } = Theme;

// Constants
const getModalContent = () => ({
  delete: {
    title: 'Delete Account',
    description:
      'Are you sure you want to delete your account? This action cannot be undone.',
    confirmText: 'Delete',
  },
  logout: {
    title: 'Logout',
    description: 'Are you sure you want to logout?',
    confirmText: 'Logout',
  },
});

// Menu items configuration
const getMenuItems = () => [
  {
    color: colors.primary,
    icon: profileIcon,
    label: 'Account Details',
    route: 'AccountDetail',
  },

  {
    color: colors.primary,
    icon: lockIcon,
    label: 'Privacy Policy',
    route: 'PrivacyPolicy',
  },
  {
    color: colors.primary,
    icon: infoIcon,
    label: 'Help Center',
    route: 'HelpCenter',
  },
  {
    color: colors.primary,
    icon: usersIcon,
    label: 'Invite Friends',
    route: 'InviteFriends',
  },
  // {
  //   color: colors.primary,
  //   icon: usersIcon,
  //   label: 'Subscription',
  //   route: 'Subscription',
  // },
  {
    color: colors.error,
    icon: trashIcon,
    label: 'Delete Account',
    isDelete: true,
  },
  {
    color: colors.error,
    icon: logoutIcon,
    label: 'Logout',
    isLogout: true,
  },
];

// Main Profile Component
export default function Profile({ navigation }) {
  const [modalType, setModalType] = useState(null);
  const bottomSheetRef = useRef(null);
  // const snapPoints = useMemo(() => SNAP_POINTS, []);

  // Mock data - replace with your actual data source
  const isEmployer = false; // Set to true/false based on your needs

  const menuItems = useMemo(() => getMenuItems(), []);

  const handleMenuPress = useCallback(
    item => {
      if (item.isDelete) {
        setModalType('delete');
        bottomSheetRef.current?.present();
      } else if (item.isLogout) {
        setModalType('logout');
        bottomSheetRef.current?.present();
      } else if (item.route) {
        navigation?.navigate(item.route);
      }
    },
    [navigation],
  );

  const handleCloseModal = useCallback(() => {
    bottomSheetRef.current?.close();
    setTimeout(() => setModalType(null), 300);
  }, []);

  const handleConfirm = useCallback(() => {
    handleCloseModal();
    // TODO: Implement actual delete/logout logic
    console.log('Logout/Delete action triggered');
  }, [handleCloseModal]);

  return (
    <View style={styles.container}>
      <PageHeader showBack={false} showBookmark={false} title="Profile" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProfileHeader isEmployer={isEmployer} />

        <View style={styles.menuContainer}>
          {menuItems.map((item, idx) => (
            <MenuItem
              key={item.label}
              item={item}
              isLast={idx === menuItems.length - 1}
              onPress={handleMenuPress}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Sheet Modal */}
      <BottomSheetModal
        ref={bottomSheetRef}
        enablePanDownToClose
        onClose={handleCloseModal}
        backdropComponent={CustomBackDrop}
        backgroundStyle={styles.bottomSheet}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <ConfirmationModal
          modalType={modalType}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      </BottomSheetModal>
    </View>
  );
}

// Profile Header Component
const ProfileHeader = ({ isEmployer }) => {
  // Mock user data - replace with your actual data source
  const user = {
    firstName: 'John',
    surname: 'Doe',
    fullName: 'John Doe',
    profile: null,
  };

  return (
    <View style={styles.profileContainer}>
      <TouchableOpacity onPress={() => {}} style={styles.profileImageContainer}>
        <Image
          source={user.profile ? { uri: user.profile } : images.signal}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <NativeText style={styles.userName}>User name</NativeText>
    </View>
  );
};

// Menu Item Component
const MenuItem = ({ item, isLast, onPress }) => (
  <TouchableOpacity
    style={[styles.menuRow, isLast && styles.lastMenuRow]}
    onPress={() => onPress(item)}
    activeOpacity={0.7}
  >
    <SvgXml xml={item.icon} color={item.color} />
    <NativeText style={styles.menuText}>{item.label}</NativeText>
    {!item.isLogout && (
      <View style={styles.menuRight}>
        {item.rightText && (
          <NativeText style={styles.menuRightText}>{item.rightText}</NativeText>
        )}
        <SvgXml xml={cheveron} color={colors.primary} style={styles.cheveron} />
      </View>
    )}
  </TouchableOpacity>
);

// Confirmation Modal Component
const ConfirmationModal = ({ modalType, onClose, onConfirm }) => {
  if (!modalType) return null;
  const modalContent = getModalContent()[modalType];

  return (
    <BottomSheetView style={styles.modalContent}>
      <NativeText style={styles.modalTitle}>{modalContent.title}</NativeText>

      <View style={styles.modalDivider} />

      <NativeText style={styles.modalDescription}>
        {modalContent.description}
      </NativeText>

      <View style={styles.modalButtonContainer}>
        <TouchableOpacity
          style={styles.modalCancelButton}
          onPress={onClose}
          activeOpacity={0.7}
        >
          <NativeText style={styles.modalCancelButtonText}>Cancel</NativeText>
        </TouchableOpacity>

        <PrimaryButton
          title={modalContent.confirmText}
          onPress={onConfirm}
          containerStyle={styles.modalConfirmButton}
          titleStyle={styles.modalConfirmButtonText}
        />
      </View>
    </BottomSheetView>
  );
};
