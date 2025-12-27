import { StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3E64FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#3E64FF',
  },
  header: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(30),
    paddingTop: verticalScale(35),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImageWrapper: {
    position: 'relative',
    width: scale(70),
    height: scale(70),
  },
  profileImageContainer: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  editButton: {
    position: 'absolute',
    bottom: verticalScale(-5),
    right: scale(-5),
    backgroundColor: '#FFFFFF',
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  editButtonText: {
    color: '#3E64FF',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  userInfoText: {
    marginLeft: scale(15),
    flex: 1,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  userEmailHeader: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: moderateScale(13),
  },
  headerActions: {
    alignItems: 'center',
    gap: verticalScale(10),
  },
  bellButton: {
    backgroundColor: '#FFFFFF',
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: moderateScale(14),
    fontWeight: '500',
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: scale(30),
    borderTopRightRadius: scale(30),
    paddingTop: verticalScale(20),
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: scale(25),
    marginHorizontal: scale(20),
    padding: scale(4),
    marginBottom: verticalScale(20),
  },
  tab: {
    flex: 1,
    paddingVertical: verticalScale(10),
    alignItems: 'center',
    borderRadius: scale(20),
  },
  activeTab: {
    backgroundColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: moderateScale(12),
    color: '#64748B',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#3E64FF',
    fontWeight: 'bold',
  },
  formScroll: {
    paddingHorizontal: scale(20),
  },
  inputGroup: {
    marginBottom: verticalScale(15),
  },
  label: {
    fontSize: moderateScale(13),
    color: '#1E293B',
    fontWeight: '600',
    marginBottom: verticalScale(6),
  },
  mandatoryStar: {
    color: '#EF4444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: scale(12),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(14),
    color: '#1E293B',
    backgroundColor: '#F8FAFC',
  },
  textArea: {
    height: verticalScale(60),
    textAlignVertical: 'top',
  },
  addressLink: {
    color: '#3E64FF',
    fontSize: moderateScale(12),
    marginTop: verticalScale(5),
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(15),
  },
  checkbox: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(4),
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    marginRight: scale(10),
  },
  checkboxLabel: {
    fontSize: moderateScale(13),
    color: '#64748B',
  },
  updateButton: {
    backgroundColor: '#3E64FF',
    borderRadius: scale(25),
    paddingVertical: verticalScale(15),
    alignItems: 'center',
    marginHorizontal: scale(20),
    marginVertical: verticalScale(20),
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
});

export default styles;
