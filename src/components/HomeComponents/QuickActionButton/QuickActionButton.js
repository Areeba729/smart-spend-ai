import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import NativeText from '../../NativeText/NativeText';
import styles from './QuickActionButtonStyles';

const QuickActionButton = ({ icon, label, onPress, isPrimary }) => {
  return (
    <View style={styles.Bigcontainer}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconContainer,
            isPrimary && styles.primaryIconContainer,
          ]}
        >
          <NativeText style={[styles.icon, isPrimary && styles.primaryIcon]}>
            {icon}
          </NativeText>
        </View>
        <NativeText style={styles.label}>{label}</NativeText>
      </TouchableOpacity>
    </View>
  );
};

export default QuickActionButton;
