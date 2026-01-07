// import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';
import { StyleSheet } from 'react-native';

const ProfileHeader = ({ title, onBackPress, rightComponent }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Text style={styles.backIcon}>❮</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <View>{rightComponent ? rightComponent : null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(30),
  },
  backIcon: {
    fontSize: moderateScale(20),
    color: Theme.colors.white,
  },
  title: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
});

export default ProfileHeader;
