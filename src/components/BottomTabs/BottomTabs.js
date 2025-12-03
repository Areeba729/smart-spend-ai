import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Theme } from '../../libs';
import NativeText from '../NativeText/NativeText';
import {
  complaintIcon,
  complaintIconFilled,
  homeIcon,
  homeIconFilled,
  profileIcon,
  profileIconFilled,
} from '../../assets/icons';
import { SvgXml } from 'react-native-svg';

const { colors } = Theme;

const BottomTabs = ({ activeTab, onTabPress }) => {
  const tabs = [
    {
      name: 'Home',
      icon: homeIcon,
      iconFilled: homeIconFilled,
      label: 'Home',
    },
    {
      name: 'Complaints',
      icon: complaintIcon,
      iconFilled: complaintIconFilled,
      label: 'Complaints',
    },
    {
      name: 'Profile',
      icon: profileIcon,
      iconFilled: profileIconFilled,
      label: 'Profile',
    },
  ];

  return (
    <View
      style={{ paddingHorizontal: 10, paddingTop: 10, flexDirection: 'row' }}
    >
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.name}
          style={[
            styles.tabItem,
            {
              borderTopWidth: activeTab === tab.name ? 2 : 0,
              borderTopColor: colors.primary,
            },
          ]}
          onPress={() => onTabPress(tab.name)}
        >
          <SvgXml
            xml={activeTab === tab.name ? tab.iconFilled : tab.icon}
            style={[
              styles.tabIcon,
              {
                color: activeTab === tab.name ? colors.primary : colors.text,
              },
            ]}
          />
          {activeTab === tab.name && (
            <NativeText style={[styles.tabText, { color: colors.primary }]}>
              {tab.label}
            </NativeText>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    marginTop: 'auto',
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(10),
  },
  // tabIcon: {
  width: scale(24),
  height: scale(24),
  resizeMode: 'contain',
  marginBottom: scale(4),

  tabText: {
    fontSize: scale(11),
    marginBottom: 10,
    ...Theme.fontWeight[500],
  },
});

export default BottomTabs;
