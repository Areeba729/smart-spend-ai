import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../../components/NativeText/NativeText';
import { check } from '../../../../assets/icons'; // Using 'check' which is a circle check
import { styles } from '../style';

const HealthCard = () => {
  return (
    <View style={[styles.card, styles.healthCard]}>
      <View style={styles.healthIconWrapper}>
        <SvgXml xml={check} width={24} height={24} color="#86AE12" />
      </View>
      <View style={styles.healthContent}>
        <View style={styles.healthRow}>
          <NativeText style={styles.healthTitle}>
            Budget Health:{' '}
            <NativeText style={styles.healthStatus}>Safe</NativeText>
          </NativeText>
          <View style={styles.badge}>
            <NativeText style={styles.badgeText}>ON TRACK</NativeText>
          </View>
        </View>
        <NativeText style={styles.healthDescription}>
          Great job! Your spending is optimized.
        </NativeText>
      </View>
    </View>
  );
};

export default HealthCard;
