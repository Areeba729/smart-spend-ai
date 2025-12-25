import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignSelf: 'center',
  },
  field: {
    marginBottom: 20,
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
    fontSize: 12,
    color: '#fff',
    flex: 1,
    padding: 0,
  },
  error: {
    color: '#EC495D',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#86AE12',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
