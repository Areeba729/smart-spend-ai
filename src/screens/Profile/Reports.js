import React from 'react';
import { View, StyleSheet } from 'react-native';
import NativeText from '../../components/NativeText/NativeText';
import { Theme } from '../../libs';

const Reports = () => {
  return (
    <View style={styles.container}>
      <NativeText style={styles.text}>Reports Screen (Coming Soon)</NativeText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Theme.colors.white,
    fontSize: 18,
  },
});

export default Reports;
