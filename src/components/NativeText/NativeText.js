import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';
import { Theme } from '../../libs';
import { moderateScale } from 'react-native-size-matters';

const { colors } = Theme;

const NativeText = ({
  style,
  children,
  fontFamily = 'Poppins-Regular',
  ...props
}) => {
  const fontSize = (style && style.fontSize) || moderateScale(15);

  return (
    <Text
      style={[
        styles.text,
        { fontFamily, fontSize },
        Platform.OS === 'android' && styles.androidFix,
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
  },
  androidFix: {
    includeFontPadding: false,
  },
});

export default NativeText;
