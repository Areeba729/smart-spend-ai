import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Theme } from '../../libs';

/**
 * Full content-area loader: use below the header when loading.
 * Fills the space below the header and shows a centered, visible loader.
 */
const ScreenLoader = ({ color = Theme.colors.secondary, size = 'large' }) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.black,
  },
});

export default ScreenLoader;
