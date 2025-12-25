import { StyleSheet } from 'react-native';
import { Theme } from '../../libs';
import { scale } from 'react-native-size-matters';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '100%',
  },
  fieldLabel: {
    color: Theme.colors.white,
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
  },
  field: {
    marginBottom: 5, // Reduced margin to fit strength meter
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 14,
    backgroundColor: '#1E1E1E',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: Theme.colors.primary,
    width: scale(325),
    borderColor: '#666',
    height: scale(50),
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#D6D6D6',
    fontSize: 14,
  },
  input: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    padding: 0,
  },
  error: {
    color: '#EC495D',
    fontSize: 12,
    marginTop: 4,
  },
  inputIcon: {
    marginRight: 10,
  },

  // Strength Meter Styles
  strengthContainer: {
    marginBottom: 20,
    marginTop: 5,
  },
  strengthBars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 4,
    marginBottom: 8,
  },
  strengthBarItem: {
    flex: 1,
    height: '100%',
    backgroundColor: '#333',
    borderRadius: 2,
    marginHorizontal: 2,
  },
  strengthLabel: {
    fontSize: 12,
    fontWeight: '600',
  },

  submitButton: {
    backgroundColor: '#86AE12',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    width: '100%',
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
