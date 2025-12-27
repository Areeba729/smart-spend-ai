import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { cheveron } from '../../assets/icons';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import { Theme } from '../../libs';
import getStyles from './style';

const Notification = () => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  const mockNotifications = [
    {
      id: '1',
      message: '[$.message]',
      date: '[convertStringToDate(a)]',
    },
    {
      id: '2',
      message: '[$.message]',
      date: '[convertStringToDate(a)]',
    },
    {
      id: '3',
      message: '[$.message]',
      date: '[convertStringToDate(a)]',
    },
    {
      id: '4',
      message: '[$.message]',
      date: '[convertStringToDate(a)]',
    },
  ];

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        index === mockNotifications.length - 1 && { borderBottomWidth: 0 },
      ]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.arrowIcon}>
        <SvgXml
          xml={cheveron}
          width={12}
          height={12}
          color="#000"
          style={{ transform: [{ rotate: '-90deg' }] }}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Notifications" showBack={true} />

      <View style={styles.container}>
        <View style={styles.contentArea}>
          <FlatList
            data={mockNotifications}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Notification;
