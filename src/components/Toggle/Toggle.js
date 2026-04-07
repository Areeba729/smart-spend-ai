import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const Toggle = ({ icon, label, subtitle, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      {icon && <Text style={styles.icon}>{icon}</Text>}

      {/* TEXT AREA */}
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>

        {/* subtitle optional */}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#333', true: '#93C523' }}
        thumbColor="#fff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  icon: {
    fontSize: moderateScale(20),
    marginRight: moderateScale(10),
    width: moderateScale(32),
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(16),
    color: Theme.colors.white,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
    marginTop: moderateScale(4),
  },
});

export default Toggle;
