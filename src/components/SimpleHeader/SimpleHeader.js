import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import NativeText from '../NativeText/NativeText';
import styles from './style';
import { SvgXml } from 'react-native-svg';
import { BackArrowIcon } from '../../assets/icons';

const SimpleHeader = ({
  title = 'Title',
  onBackPress,
  showBack = !!onBackPress,
}) => {
  return (
    <View style={styles.header}>
      {/* Left: Back Arrow or Placeholder */}
      {showBack ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <SvgXml xml={BackArrowIcon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      {/* Center: Title */}
      <NativeText style={styles.title}>{title}</NativeText>

      {/* Right: Empty space to keep title centered */}
      <View style={styles.rightSpace} />
    </View>
  );
};

export default SimpleHeader;
