import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  scrollContent: {
    padding: moderateScale(20),
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
    justifyContent: 'space-between',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: Theme.colors.secondary,
    marginBottom: moderateScale(20),
  },
});

export default styles;
