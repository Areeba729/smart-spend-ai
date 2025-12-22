import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: '100%',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  resendLink: {
    color: Theme.colors.secondary,
    fontWeight: 'bold',
  },
  timerPill: {
    backgroundColor: '#2A3310', // Dark olive/greenish background for timer
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
    tintColor: Theme.colors.secondary,
  },
  timerText: {
    color: Theme.colors.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  verifyButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
