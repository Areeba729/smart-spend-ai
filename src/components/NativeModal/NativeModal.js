import { Modal, StyleSheet, View } from 'react-native';

const NativeModal = ({ open, setOpen, t, children }) => {
  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.successModal}>{children}</View>
      </View>
    </Modal>
  );
};

export default NativeModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  successModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 28,
    alignItems: 'center',
    width: '89%',
  },
});
