import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../../components/NativeText/NativeText';
import { check } from '../../../../assets/icons'; // Using 'check' which is a circle check
import { styles } from '../style';

const HealthCard = ({ status, badge, description }) => {
  return (
    <View style={[styles.card, styles.healthCard]}>
      <View style={styles.healthContent}>
        <View style={styles.healthRow}>
          <NativeText style={styles.healthTitle}>
            Budget Health:{' '}
            <NativeText style={styles.healthStatus}>{status}</NativeText>
          </NativeText>
          <View style={styles.badge}>
            <NativeText style={styles.badgeText}>{badge}</NativeText>
          </View>
        </View>
        <NativeText style={styles.healthDescription}>{description}</NativeText>
      </View>
    </View>
  );
};

export default HealthCard;
