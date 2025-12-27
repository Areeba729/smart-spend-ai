import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: scale(16),
    width: scale(349),
    height: scale(700),
    paddingHorizontal: scale(16),
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
    backgroundColor: Theme.colors.white,
    borderColor: Theme.colors.text,
    width: scale(325),
    height: scale(50),
    paddingHorizontal: scale(16),
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
    color: 'black',
    fontSize: 14,
  },
  input: {
    fontSize: 12,
    color: 'black',
    flex: 1,
    padding: 0,
  },
  error: {
    color: '#EC495D',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#4C6EF5',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
