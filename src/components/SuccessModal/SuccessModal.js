import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../NativeText/NativeText';
import { checkMark } from '../../assets/icons';
import { styles } from './style';

const SuccessModal = ({ visible, onClose, title, message,m }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconCircle}>
            <View style={styles.innerCircle}>
              <SvgXml xml={checkMark} width={24} height={24} color="#fff" />
            </View>
            {/* Dots decoration */}
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
            <View style={[styles.dot, styles.dot4]} />
          </View>

          <NativeText style={styles.title}>
            {title || 'Added Successfully'}
          </NativeText>
          <NativeText style={styles.message}>
            {message ||
              'Your expense has been added successfully. You can now view it in your transaction history.'}
          </NativeText>

          <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <NativeText style={styles.doneButtonText}>Done</NativeText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
