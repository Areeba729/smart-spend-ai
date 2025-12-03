import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const { colors, borders, typography, shadows } = Theme;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: moderateScale(50),
    marginBottom: moderateScale(16),
    height: moderateScale(44),
  },
  iconButton: {
    width: moderateScale(44),
    height: '100%',
    borderRadius: borders.normalRadius,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    ...typography.heading,
    fontSize: moderateScale(22),
    color: colors.text,
    textAlign: 'center',
    ...Theme.fontWeight[600],
  },
});

export default styles;
