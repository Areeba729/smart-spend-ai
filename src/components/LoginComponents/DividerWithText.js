import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../libs';

export const DividerWithText = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  text: {
    marginHorizontal: 16,
    color: Theme.colors.border,
    fontSize: 14,
    ...Theme.fontWeight[400],
  },
});
