import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';
import styles from './style';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import ScreenLoader from '../../../components/ScreenLoader/ScreenLoader';
import { selectUser } from '../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useProfileImage } from '../../../hooks/useProfileImage';

const UserProfile = ({ navigation }) => {
  const user = useSelector(selectUser);
  const {
    profileImageUrl,
    loading: imageLoading,
    error: imageError,
    refreshProfileImage,
    pickAndUploadProfileImage,
  } = useProfileImage();

  useFocusEffect(
    useCallback(() => {
      refreshProfileImage();
    }, [refreshProfileImage])
  );

  const [name, setName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleChangePhoto = () => {
    pickAndUploadProfileImage();
  };

  const handleSave = () => {
    console.log('Saving:', { name, phone });
    navigation.goBack();
  };

  const firstLetter = (user?.fullName || user?.email || '?').charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <SimpleHeader
        title="Edit Profile"
        onBackPress={() => navigation.goBack()}
      />

      {imageLoading ? (
        <ScreenLoader color={Theme.colors.secondary} />
      ) : (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingBottom: moderateScale(30) }}
          >
            {/* ---------- PROFILE PHOTO (update only here) ---------- */}
            <View style={styles.photoSection}>
              <View style={styles.avatarContainer}>
                {profileImageUrl ? (
                  <Image source={{ uri: profileImageUrl }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, styles.avatarPlaceholder]}>
                    <Text style={styles.avatarPlaceholderText}>{firstLetter}</Text>
                  </View>
                )}
                <TouchableOpacity
                  style={styles.cameraButton}
                  onPress={handleChangePhoto}
                >
                  <Text style={styles.cameraIcon}>📷</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleChangePhoto}>
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
              {imageError ? (
                <Text style={styles.photoErrorText}>{imageError}</Text>
              ) : null}
            </View>

            {/* ---------- FORM ---------- */}
            <View style={styles.formContainer}>
            {/* Full Name */}
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>👤</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                placeholderTextColor="#666"
                returnKeyType="next"
              />
            </View>

            {/* Phone */}
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📞</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="Phone Number"
                placeholderTextColor="#666"
                returnKeyType="next"
              />
            </View>

            {/* Email - read-only (linked to account) */}
            <Text style={styles.label}>Email</Text>
            <View style={[styles.inputContainer, styles.inputReadOnly]}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={[styles.input, styles.inputReadOnlyText]}
                value={user?.email || ''}
                editable={false}
                placeholder="Email"
                placeholderTextColor="#666"
              />
            </View>
          </View>

            {/* ---------- SAVE BUTTON ---------- */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default UserProfile;
