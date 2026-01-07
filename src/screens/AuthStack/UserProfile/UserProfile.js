import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';
import styles from './style';
import { images } from '../../../assets/images';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import SimpleHeader from '../../../components/SimpleHeader/SimpleHeader';
import { selectUser } from '../../../redux/slices/userSlice';
import { useSelector } from 'react-redux';
const UserProfile = ({ navigation }) => {
  const user = useSelector(selectUser);

  // Initialize state with user data
  const [name, setName] = useState(user?.fullName || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleChangePhoto = () => {
    console.log('Change Photo Pressed');
  };

  const handleSave = () => {
    console.log('Saving:', { name, phone, email });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.black}
      />

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
          <SimpleHeader
            title="Edit Profile"
            onBackPress={() => navigation.goBack()}
          />

          {/* ---------- PROFILE PHOTO ---------- */}
          <View style={styles.photoSection}>
            <View style={styles.avatarContainer}>
              <Image source={images.profile} style={styles.avatar} />
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

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉️</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#666"
                returnKeyType="done"
              />
            </View>
          </View>

          {/* ---------- SAVE BUTTON ---------- */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default UserProfile;
