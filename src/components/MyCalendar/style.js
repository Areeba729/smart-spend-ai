import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F7F8FA',
  },

  /* ---------- DATE BUTTON ---------- */
  dateButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },

  /* ---------- EVENT LIST ---------- */
  eventItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    fontSize: 14,
    color: '#333',
    elevation: 2,
  },

  /* ---------- MODAL ---------- */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
    marginTop: 12,
    marginBottom: 6,
  },

  modalText: {
    fontSize: 14,
    color: '#333',
  },

  /* ---------- INPUT ---------- */
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111',
    marginBottom: 12,
  },

  /* ---------- BUTTONS ---------- */
  button: {
    backgroundColor: '#4A6CF7',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  cancelButton: {
    marginTop: 12,
    alignItems: 'center',
  },
});

export default styles;
