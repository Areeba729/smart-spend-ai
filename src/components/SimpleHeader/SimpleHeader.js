import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StatusBar } from 'react-native';
import NativeText from '../NativeText/NativeText';
import styles from './style';
import { SvgXml } from 'react-native-svg';
import { BackArrowIcon } from '../../assets/icons';
import { Theme } from '../../libs';

const SimpleHeader = ({
  title = 'Title',
  onBackPress,
  showBack = !!onBackPress,
}) => {
  return (
    <>
      {/* 🔥 STATUS BAR */}
      <StatusBar
        backgroundColor={Theme.colors.primary} // same as header
        barStyle="light-content" // white text
      />

      <View
        style={[styles.container, { backgroundColor: Theme.colors.primary }]}
      >
        <View style={styles.header}>
          {showBack ? (
            <TouchableOpacity
              hitSlop={20}
              style={styles.backButton}
              onPress={onBackPress}
            >
              <SvgXml xml={BackArrowIcon} />
            </TouchableOpacity>
          ) : (
            <View style={styles.backButton} />
          )}

          <NativeText style={styles.title}>{title}</NativeText>
          <View style={styles.rightSpace} />
        </View>
      </View>
    </>
  );
};

export default SimpleHeader;
