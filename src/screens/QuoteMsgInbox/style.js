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
    backgroundColor: '#F1F5F9', // Light grey background for the list
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    backgroundColor: '#FFFFFF',
    gap: scale(10),
  },
  tab: {
    paddingHorizontal: scale(25),
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: scale(100),
  },
  activeTab: {
    backgroundColor: '#3E64FF',
  },
  inactiveTab: {
    backgroundColor: '#C7D2FE',
  },
  tabText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: '#4ADE80', // Green badge
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -verticalScale(8),
    right: -scale(8),
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#000000',
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: verticalScale(20),
  },
  messageItem: {
    backgroundColor: '#F1F5F9', // Matches container
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
  },
  iconContainer: {
    marginRight: scale(10),
    paddingTop: verticalScale(2),
  },
  textContainer: {
    flex: 1,
  },
  supplierName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: verticalScale(4),
  },
  snippet: {
    fontSize: moderateScale(14),
    color: '#1E293B',
    lineHeight: verticalScale(18),
  },
});

export default styles;
