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
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#3E64FF',
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  logoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoText: {
    fontSize: moderateScale(42),
    fontWeight: '700',
    color: Theme.colors.white,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
  },
  headerIcons: {
    flexDirection: 'row',

    gap: scale(15),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(8),
    backgroundColor: '#ccc',
  },
  profileName: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: Theme.colors.white,
  },
  profileEmail: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: Theme.colors.white,
  },
  profileInfo: {
    marginLeft: scale(12),
  },
  companyName: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: Theme.colors.white,
  },
  userName: {
    fontSize: moderateScale(14),
    color: Theme.colors.white,
    opacity: 0.9,
  },
  navLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(20),
  },
  navLinkText: {
    fontSize: moderateScale(13),
    color: Theme.colors.white,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: scale(15),
    justifyContent: 'space-between',
    marginTop: verticalScale(10),
  },
  card: {
    width: '47%',
    height: verticalScale(140),
    backgroundColor: Theme.colors.white,
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(10),
    marginBottom: verticalScale(15),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardIcon: {
    marginBottom: verticalScale(12),
  },
  cardText: {
    fontSize: moderateScale(12),
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    lineHeight: verticalScale(16),
  },
});

export default styles;
