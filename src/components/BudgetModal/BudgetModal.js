import React from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const BudgetModal = ({ visible, value, onChange, onSave, onCancel, loading }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Set Budget for this Month</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter budget"
            keyboardType="numeric"
            value={value}
            onChangeText={onChange}
            editable={!loading}
          />
          <View style={styles.buttonRow}>
            <Button title="Save" onPress={onSave} disabled={loading || !value} />
            <Button title="Cancel" onPress={onCancel} color="gray" disabled={loading} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: 300,
    alignItems: 'center',
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '100%',
    borderRadius: 6,
    marginBottom: 18,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
});

export default BudgetModal;
