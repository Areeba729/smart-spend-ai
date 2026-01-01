// screens/Reports/components/RecentList/RecentList.js
import React from 'react';
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import styles from './style';

import { grocerySvg } from '../../assets/icons';
import { entertainmentSvg } from '../../assets/icons';

const iconMap = {
  Grocery: grocerySvg,
  Entertainment: entertainmentSvg,
};

const RecentItem = ({ title, amount, time }) => (
  <View style={styles.itemContainer}>
    <View style={styles.left}>
      <View style={styles.iconWrapper}>
        <SvgXml xml={iconMap[title]} width={22} height={22} />
      </View>

      <View>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemTime}>{time}</Text>
      </View>
    </View>

    <Text style={styles.amount}>- PKR {amount}</Text>
  </View>
);

const RecentList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Recent Details</Text>

      <RecentItem title="Grocery" amount="3,200" time="Today, 10:23 AM" />

      <RecentItem title="Entertainment" amount="1,500" time="Yesterday" />
    </View>
  );
};

export default RecentList;
