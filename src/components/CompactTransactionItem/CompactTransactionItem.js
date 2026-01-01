import React from 'react';
import { View } from 'react-native';
import NativeText from '../NativeText/NativeText';
import { styles } from './style';

const CompactTransactionItem = ({ icon, name, date, amount }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <View style={styles.iconWrapper}>
          <NativeText style={styles.listEmoji}>{icon}</NativeText>
        </View>
        <View>
          <NativeText style={styles.name}>{name}</NativeText>
          <NativeText style={styles.date}>{date}</NativeText>
        </View>
      </View>
      <NativeText style={styles.amount}>
        - PKR {amount.toLocaleString()}
      </NativeText>
    </View>
  );
};

export default CompactTransactionItem;
