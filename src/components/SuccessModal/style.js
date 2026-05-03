import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: moderateScale(20),
    padding: moderateScale(30),
    alignItems: 'center',
  },
  iconCircle: {
    width: moderateScale(80),
    height: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20),
    position: 'relative',
  },
  innerCircle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: '#00C2B2', // Matches image's teal color for the icon background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  dot: {
    position: 'absolute',
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
    backgroundColor: '#00C2B2',
  },
  dot1: { top: 0, left: 20 },
  dot2: { top: 10, right: 10 },
  dot3: { bottom: 10, left: 10 },
  dot4: { bottom: 0, right: 30 },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: moderateScale(15),
    textAlign: 'center',
  },
  message: {
    fontSize: moderateScale(14),
    color: '#7C7C7C',
    textAlign: 'center',
    lineHeight: moderateScale(20),
    marginBottom: moderateScale(25),
    paddingHorizontal: moderateScale(10),
  },
  doneButton: {
    backgroundColor: Theme.colors.secondary, // User specifically asked for secondary color
    width: '100%',
    height: moderateScale(50),
    borderRadius: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});
