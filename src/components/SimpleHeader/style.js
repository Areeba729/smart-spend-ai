import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = StyleSheet.create({
  container: {
  backgroundColor: Theme.colors.primary,
},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
    backgroundColor: Theme.colors.secondary,
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(20),
    width: scale(350),
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    alignSelf: 'center',
    paddingTop: scale(40),
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  backArrow: {
    fontSize: 22,
    color: Theme.colors.text,
  },

  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: scale(18),
    fontWeight: 'bold',
    color: Theme.colors.white,
  },

  rightSpace: {
    width: 40,
  },
});

export default styles;
