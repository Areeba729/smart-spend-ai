import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { bellIcon, logoutIcon, profileIcon } from '../../assets/icons';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import getStyles from './style';
import { Theme } from '../../libs';

const Home = () => {
  const [activeTab, setActiveTab] = useState('About Us');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = Theme;
  const styles = getStyles(colors);

  const handleLogout = () => {
    dispatch(logout());
  };

  const tabs = ['About Us', 'Quote Manager', 'Profile'];

  return (
    <View style={styles.container}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />

      {/* Blue Header Section */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <SvgXml xml={profileIcon} width={50} height={50} color="#999" />
            <TouchableOpacity style={styles.plusButton}>
              <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.companyName}>companyname</Text>
            <Text style={styles.userEmail}>email</Text>
          </View>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.notificationContainer}
            onPress={() => navigation.navigate('Notification')}
          >
            <SvgXml xml={bellIcon} width={24} height={24} color="#3E64FF" />
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>$.c</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <SvgXml
              xml={logoutIcon}
              width={20}
              height={20}
              color={Theme.colors.white}
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Card Area */}
      <View style={styles.contentCard}>
        {/* Segmented Tab Bar */}
        <View style={styles.tabBar}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => {
                if (tab === 'Quote Manager') {
                  navigation.navigate('QuoteManager');
                } else {
                  setActiveTab(tab);
                }
              }}
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

        {/* Tab Content */}
        <ScrollView
          style={styles.mainContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Mock Background Image Effect */}
          <View style={styles.bgImage}>
            {/* This would be an Actual Image component in a real app */}
          </View>

          <Text style={styles.sectionTitle}>
            Simplify Your Material Sourcing
          </Text>

          {/* Video Placeholder */}
          <View style={styles.videoPlaceholder}>
            <View
              style={[
                styles.placeholderLine,
                { transform: [{ rotate: '25deg' }] },
              ]}
            />
            <View
              style={[
                styles.placeholderLine,
                { transform: [{ rotate: '-25deg' }] },
              ]}
            />
            <Text style={styles.videoText}>Video Player Placeholder</Text>
          </View>

          <Text style={styles.subTitle}>Manage Your Projects Like a Boss!</Text>

          <Text style={styles.description}>
            The SnapQuote App is our mobile solution to SupplyQuoteGT, our web
            service, we understand that sourcing building materials can be a
            time-consuming and challenging process. That's why we've created a
            platform that simplifies everything. Our service empowers you to...
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default Home;
