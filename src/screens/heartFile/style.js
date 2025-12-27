import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3E64FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F1F4F9',
  },
  scrollContent: {
    paddingBottom: verticalScale(20),
  },
  descriptionText: {
    fontSize: moderateScale(14),
    color: '#333',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(20),
    lineHeight: verticalScale(20),
    fontWeight: '400',
  },
});

export default styles;
