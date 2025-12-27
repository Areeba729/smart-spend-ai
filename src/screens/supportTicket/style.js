import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3E64FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1', // Matches the light grey in the image
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(30),
  },
  logo: {
    width: scale(100),
    height: scale(100),
    borderRadius: scale(50),
    // Background and border for the placeholder logo if needed
  },
  card: {
    width: scale(320),
    backgroundColor: Theme.colors.white,
    padding: scale(24),
    borderRadius: scale(4),
    borderWidth: 1,
    borderColor: '#E2E4E7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: moderateScale(14),
    color: '#3C434A',
    marginBottom: verticalScale(8),
    fontWeight: '400',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8C8F94',
    borderRadius: scale(4),
    paddingHorizontal: scale(12),
    height: verticalScale(45),
    marginBottom: verticalScale(20),
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: '#2C3338',
    padding: 0,
  },
  eyeButton: {
    padding: scale(4),
  },
  loginButton: {
    backgroundColor: '#2271B1', // WordPress blue
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: scale(3),
    alignSelf: 'flex-end',
  },
  loginButtonText: {
    color: Theme.colors.white,
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
});

export default styles;
