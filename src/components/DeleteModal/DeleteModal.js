import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import NativeText from '../NativeText/NativeText';
import { Theme } from '../../libs';
import { styles } from './style';

const DeleteModal = ({
  visible,
  message = 'Are you sure you want to delete this event?',
  onCancel,
  onConfirm,
  confirmText = 'Yes, Delete',
  cancelText = 'Cancel',
  loading = false,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <NativeText style={styles.message}>{message}</NativeText>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                loading && styles.buttonDisabled,
              ]}
              onPress={onCancel}
              disabled={loading}
            >
              <NativeText style={styles.cancelButtonText}>{cancelText}</NativeText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                loading && styles.buttonDisabled,
              ]}
              onPress={onConfirm}
              disabled={loading}
            >
              <View style={styles.buttonInner}>
                <NativeText
                  style={[
                    styles.confirmButtonText,
                    loading && styles.buttonTextHidden,
                  ]}
                >
                  {confirmText}
                </NativeText>
                {loading && (
                  <View style={styles.loaderOverlay}>
                    <ActivityIndicator
                      color={Theme.colors.white}
                      size="small"
                    />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
