import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  notificationIcon,
  cameraIcon,
  heartIcon,
  documentIcon,
  chatIcon,
  contactIcon,
  createOrderIcon,
  bellIcon,
} from '../../assets/icons';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import { Theme } from '../../libs';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { images } from '../../assets/images';

const DashboardHome = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const cards = [
    {
      title: 'Create New\nMaterial Request\nOrder',
      icon: images.document,
      isImage: true,
      routeName: 'CreateRFQ',
    },
    {
      title: 'Dashboard',
      icon: images.dashboard,
      isImage: true,
      routeName: 'RFQDashboard',
    },
    {
      title: 'Quote Inbox',
      icon: images.chat,
      isImage: true,
      routeName: 'QuoteInbox',
    },
    {
      title: 'Favorite Supplier',
      icon: images.heart,
      isImage: true,
      routeName: 'FavoriteSupplier',
    },
    {
      title: 'Create Support\nTicket',
      icon: images.document,
      isImage: true,
      routeName: 'supportTicket',
    },
    {
      title: 'Contact Us',
      icon: images.call,
      isImage: true,
      routeName: 'heartFile',
    },
  ];

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.logoText}>SnapQuoteGT</Text>
          <View style={styles.logoRow}>
            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <SvgXml
                  xml={
                    cameraIcon ||
                    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`
                  }
                  width={24}
                  height={24}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}
              >
                <SvgXml
                  xml={bellIcon}
                  width={24}
                  height={24}
                  color={Theme.colors.white}
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={styles.profileRow}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>EwayBuilder</Text>
              <Text style={styles.profileEmail}>ewaybuilder@gmail.com</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.navLinks}>
            <TouchableOpacity>
              <Text style={styles.navLinkText}>What We Do</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('QuoteManager')}
            >
              <Text style={styles.navLinkText}>Project Quote Management</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.navLinkText}>Logout</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileScreen')}
            >
              <Text style={styles.navLinkText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Grid */}
        <View style={styles.grid}>
          {cards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => navigation.navigate(card.routeName)}
            >
              <View style={styles.cardIcon}>
                {card.isImage ? (
                  <Image
                    source={card.icon}
                    style={{ width: 34, height: 34 }}
                    resizeMode="contain"
                  />
                ) : (
                  <SvgXml
                    xml={
                      card.icon ||
                      `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3E64FF" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>`
                    }
                    width={34}
                    height={34}
                    color="#3E64FF"
                    fill="#3E64FF"
                  />
                )}
              </View>
              <Text style={styles.cardText}>{card.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardHome;
