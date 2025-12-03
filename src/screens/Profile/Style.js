import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Responsive, Theme } from '../../libs';
const { getHeight, getWidth } = Responsive;

const { colors } = Theme;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    paddingHorizontal: moderateScale(16),
  },

  badgeButton: {
    width: getWidth(10),
    height: getHeight(5),
    backgroundColor: colors.lightPrimaryLight20,
    borderRadius: Theme.borders.miniRadius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  profileContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  profileImageContainer: {
    width: getHeight(10),
    height: getHeight(10),
    overflow: 'hidden',
    marginBottom: getHeight(2),
    borderRadius: Theme.borders.circleRadius,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userName: {
    fontSize: 24,
    color: colors.text,
    marginBottom: moderateScale(26),
    ...Theme.fontWeight[500],
  },
  jobInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: Theme.borders.miniRadius,
    width: '100%',
  },
  jobText: {
    fontSize: scale(12),
    color: colors.text,
    marginLeft: 12,
    flex: 1,
    ...Theme.fontWeight[500],
  },
  badgeImage: {
    width: getWidth(7),
    height: getHeight(4),
    resizeMode: 'contain',
  },
  menuContainer: {
    marginTop: moderateScale(12),
    marginBottom: moderateScale(112),
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: moderateScale(18),
    borderBottomWidth: 1,
    borderBottomColor: colors['light-grey'],
  },
  lastMenuRow: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: moderateScale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: scale(13),
    color: colors.text,
    ...Theme.fontWeight[500],
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuRightText: {
    color: colors.text,
    fontSize: scale(12),
    ...Theme.fontWeight[500],
    marginRight: 8,
  },

  cheveron: {
    transform: [{ rotateZ: '-90deg' }],
  },
  // Modal Styles
  modalOverlay: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: 'rgba(0,0,0,0.12)',
  },
  bottomSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
  },
  handleIndicator: {
    backgroundColor: colors['light-grey'],
    width: 48,
    height: 5,
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 8,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  modalTitle: {
    color: colors.primary,
    fontSize: scale(16),
    textAlign: 'center',
    ...Theme.fontWeight[700],
  },
  modalDivider: {
    width: '100%',
    height: 1,
    backgroundColor: colors['light-grey'],
    marginVertical: 12,
  },
  modalDescription: {
    color: colors.text,
    fontSize: scale(13),
    textAlign: 'center',
    marginBottom: scale(12),
    marginTop: 18,
    ...Theme.fontWeight[500],
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: scale(16),
  },
  modalCancelButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginRight: 8,
  },
  modalCancelButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalConfirmButton: {
    flex: 1,
    height: 56,
    marginLeft: 8,
    borderRadius: 16,
  },
  modalConfirmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
