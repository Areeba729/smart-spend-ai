import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

const styles = StyleSheet.create({
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

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  profilePic: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: Theme.colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(12),
  },

  profileInitial: {
    fontSize: moderateScale(18),
    color: Theme.colors.black,
  },

  greeting: {
    fontSize: moderateScale(12),
    color: Theme.colors.white,
  },

  userName: {
    fontSize: moderateScale(16),
    color: Theme.colors.white,
  },

  notificationButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
  },

  notificationIcon: {
    fontSize: moderateScale(20),
  },
});

export default styles;
