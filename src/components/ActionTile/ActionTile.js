import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../NativeText/NativeText';
import { styles } from './style';

const ActionTile = ({
  icon,
  label,
  onPress,
  isAI = false,
  hasNotification = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, isAI && styles.aiTipsContainer]}
      onPress={onPress}
    >
      {hasNotification && <View style={styles.dot} />}
      <View style={[styles.iconWrapper, isAI && styles.aiIconWrapper]}>
        <NativeText style={styles.tileEmoji}>{icon}</NativeText>
      </View>
      <NativeText style={[styles.label, isAI && styles.aiLabel]}>
        {label}
      </NativeText>
    </TouchableOpacity>
  );
};

export default ActionTile;
