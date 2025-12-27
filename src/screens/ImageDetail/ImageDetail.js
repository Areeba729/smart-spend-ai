import React from 'react';
import { View } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import { Theme } from '../../libs';
import getStyles from './style';

const ImageDetail = () => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Image Detail" showBack={true} />

      <View style={styles.container}>
        {/* <View style={styles.divider} /> */}
      </View>
    </View>
  );
};

export default ImageDetail;
