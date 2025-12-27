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
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  rfqId: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#1E293B',
  },
  subHeaderActions: {
    flexDirection: 'row',
    gap: scale(8),
  },
  subButton: {
    backgroundColor: '#3E64FF',
    borderRadius: scale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
  },
  subButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  inboxTitleSection: {
    alignItems: 'center',
    paddingVertical: verticalScale(20),
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  inboxTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#3E64FF',
  },
  contentRow: {
    flex: 1,
  },
  quotesList: {
    paddingBottom: verticalScale(40),
  },
  rowContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardContainer: {
    flex: 1,
    padding: scale(15),
    paddingRight: scale(5),
  },
  sidebarCell: {
    width: scale(60),
    borderLeftWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sidebarHeader: {
    width: scale(60),
    height: verticalScale(100), // Adjusted to match title height
    borderLeftWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(40),
  },
  sidebarTitle: {
    fontSize: moderateScale(10),
    color: '#64748B',
    fontWeight: '600',
    textAlign: 'center',
    transform: [{ rotate: '-90deg' }],
    width: scale(100), // Height becomes width after rotation
    position: 'absolute',
    // bottom: scale(40),
  },
  sidebarIcon: {
    marginTop: verticalScale(60),
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(20),
    padding: scale(15),
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeaderIcons: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(8),
  },
  supplierName: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: verticalScale(15),
  },
  viewQuoteButton: {
    borderWidth: 1,
    borderColor: '#3E64FF',
    borderRadius: scale(8),
    width: '100%',
    paddingVertical: verticalScale(8),
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  viewQuoteText: {
    color: '#3E64FF',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  supplierDetailsButton: {
    backgroundColor: '#3E64FF',
    borderRadius: scale(8),
    width: '100%',
    paddingVertical: verticalScale(8),
    alignItems: 'center',
  },
  supplierDetailsText: {
    color: '#FFFFFF',
    fontSize: moderateScale(13),
    fontWeight: '600',
  },
  selectionCircle: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: '#64748B',
  },
});

export default styles;
