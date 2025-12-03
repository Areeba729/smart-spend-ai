import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { images } from '../../assets/images';
import {  Responsive} from '../../libs';
const { getHeight } = Responsive;

export const CompanyLogo = () => {
  return (
    <View style={styles.container}>
      <Image source={images.logoCompany} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf:"center",
    top: getHeight(8),
  },
});
