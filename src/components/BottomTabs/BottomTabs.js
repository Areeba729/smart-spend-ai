import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Theme } from '../../libs';
import NativeText from '../NativeText/NativeText';
import {
  homeIcon,
  homeIconFilled,
  budgetIcon,
  reportsIcon,
  profileIcon,
  profileIconFilled,
  plusIcon,
} from '../../assets/icons';
import { SvgXml } from 'react-native-svg';

const { colors } = Theme;

const BottomTabs = ({ activeTab, onTabPress }) => {
  const tabs = [
    {
      name: 'Home',
      icon: homeIcon,
      iconFilled: homeIcon,
      label: 'Home',
    },
    {
      name: 'Budget',
      icon: budgetIcon,
      iconFilled: budgetIcon,
      label: 'Budget',
    },
    {
      name: 'AddExpense',
      isPlus: true,
    },
    {
      name: 'Report',
      icon: reportsIcon,
      iconFilled: reportsIcon,
      label: 'Reports',
    },
    {
      name: 'Profile',
      icon: profileIcon,
      iconFilled: profileIconFilled,
      label: 'Profile',
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        if (tab.isPlus) {
          return (
            <TouchableOpacity
              key="plus"
              style={styles.plusButtonContainer}
              onPress={() => onTabPress(tab.name)}
            >
              <View style={styles.plusButton}>
                <SvgXml xml={plusIcon} />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.name)}
          >
            <SvgXml
              xml={activeTab === tab.name ? tab.iconFilled : tab.icon}
              style={[
                styles.tabIcon,
                {
                  color:
                    activeTab === tab.name
                      ? colors.secondary
                      : colors.lighttextcolor,
                },
              ]}
            />
            <NativeText
              style={[
                styles.tabText,
                {
                  color:
                    activeTab === tab.name
                      ? colors.secondary
                      : colors.lighttextcolor,
                },
              ]}
            >
              {tab.label}
            </NativeText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: scale(70),
    backgroundColor: Theme.colors.black,
    borderTopWidth: 1,
    borderTopColor: '#1C1C1E',
    alignItems: 'center',
    paddingBottom: scale(10),
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(-30),
  },
  plusButton: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: Theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: Theme.colors.black,
    elevation: 8,
    shadowColor: Theme.colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabIcon: {
    width: scale(22),
    height: scale(22),
    marginBottom: scale(4),
  },
  tabText: {
    fontSize: scale(10),
    fontWeight: '500',
  },
});

export default BottomTabs;
