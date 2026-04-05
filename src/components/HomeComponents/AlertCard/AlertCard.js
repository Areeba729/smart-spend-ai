import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../../NativeText/NativeText';
import { Theme } from '../../../libs';
import styles from './AlertCardStyles';

const AlertCard = ({
  icon,
  title,
  description,
  status,
  statusColor,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconStatusRow}>
        <View style={styles.iconContainer}>
          <NativeText style={styles.icon}>{icon}</NativeText>
        </View>
        <NativeText
          style={[
            styles.statusText,
            { color: statusColor || Theme.colors.secondary },
          ]}
        >
          {status}
        </NativeText>
      </View>
      <View style={styles.textContainer}>
        <NativeText style={styles.title}>{title}</NativeText>
        <NativeText style={styles.description}>{description}</NativeText>
      </View>
    </TouchableOpacity>
  );
};

export default AlertCard;
