import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useDispatch } from 'react-redux';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { bellIcon, logoutIcon } from '../../assets/icons'; // Ensure these icons exist
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import { logout } from '../../redux/slices/userSlice';
import styles from './style';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('Profile');

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileInfoRow}>
            <View style={styles.profileImageWrapper}>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  style={styles.profileImage}
                />
              </View>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userInfoText}>
              <Text style={styles.userName}>EwayBuilder</Text>
              <Text style={styles.userEmailHeader}>ewaybuilder@gmail.com</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.bellButton}>
              <SvgXml
                xml={
                  bellIcon ||
                  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E64FF" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`
                }
                width={18}
                height={18}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <SvgXml
                xml={
                  logoutIcon ||
                  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`
                }
                width={14}
                height={14}
              />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Tabs */}
          <View style={styles.tabContainer}>
            {['About Us', 'Quote Manager', 'Profile'].map(tab => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form */}
          <ScrollView
            style={styles.formScroll}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                value="ewaybuilder@gmail.com"
                editable={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value="16148889999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Company Name</Text>
              <TextInput style={styles.input} value="EwayBuilder" />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Company Address <Text style={styles.mandatoryStar}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value="18001 Nashport Road Nashport OH 43830 United States"
                multiline
              />
              <TouchableOpacity>
                <Text style={styles.addressLink}>Select Another Address</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Default Bidding Expiration (After how many days the bidding will
                be closed? <Text style={styles.mandatoryStar}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Bidding Expiry"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Construction Types <Text style={styles.mandatoryStar}>*</Text>
              </Text>
              <View
                style={[
                  styles.input,
                  { height: verticalScale(40), justifyContent: 'center' },
                ]}
              >
                {/* Mock Dropdown Placeholder */}
              </View>
              <Text
                style={{
                  fontSize: moderateScale(11),
                  color: '#94A3B8',
                  marginTop: 5,
                }}
              >
                Please select all that apply for best results
              </Text>
            </View>

            <TouchableOpacity style={styles.checkboxContainer}>
              <View style={styles.checkbox} />
              <Text style={styles.checkboxLabel}>Change Password?</Text>
            </TouchableOpacity>
          </ScrollView>

          <TouchableOpacity style={styles.updateButton}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
