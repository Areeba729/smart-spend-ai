// components/HomeHeader.js
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import NativeText from '../NativeText/NativeText';
import styles from './style';

const HomeHeader = ({
  initial = 'A',
  greeting = 'Good Morning',
  userName = 'Alex',
  profileImageUrl,
  onNotificationPress,
}) => {
  const imageUri =
    typeof profileImageUrl === 'string' ? profileImageUrl.trim() : '';
  const showProfileImage = imageUri.length > 0;

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {showProfileImage ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.profileImage}
          />
        ) : (
          <View style={styles.profilePic}>
            <NativeText style={styles.profileInitial}>{initial}</NativeText>
          </View>
        )}

        <View>
          <NativeText style={styles.greeting}>{greeting}</NativeText>
          <NativeText style={styles.userName}>Hi, {userName}!</NativeText>
        </View>
      </View>

      <TouchableOpacity
        style={styles.notificationButton}
        onPress={onNotificationPress}
        hitSlop={20} 
      >
        <NativeText style={styles.notificationIcon}>🔔</NativeText>
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
