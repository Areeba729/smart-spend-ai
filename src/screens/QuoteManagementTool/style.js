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
  titleContainer: {
    paddingVertical: verticalScale(20),
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: '#000000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#D1D5DB',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerCell: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  headerText: {
    fontSize: moderateScale(11),
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  subHeaderRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  subHeaderCell: {
    flex: 1,
    paddingVertical: verticalScale(4),
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  subHeaderCellLast: {
    borderRightWidth: 0,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: verticalScale(60),
  },
  cell: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  idButtonBase: {
    backgroundColor: '#34D399',
    borderRadius: scale(20),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(10),
    minWidth: scale(50),
    alignItems: 'center',
  },
  idButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  projectNameText: {
    fontSize: moderateScale(11),
    color: '#374151',
    textAlign: 'center',
  },
  dateText: {
    fontSize: moderateScale(9),
    color: '#374151',
    textAlign: 'center',
  },
  statusText: {
    fontSize: moderateScale(10),
    color: '#374151',
    textAlign: 'center',
  },
  quoteCountText: {
    fontSize: moderateScale(11),
    color: '#EF4444',
    fontWeight: '500',
  },
  viewButton: {
    backgroundColor: '#3E64FF',
    borderRadius: scale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(12),
    minWidth: scale(50),
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: moderateScale(11),
    fontWeight: '600',
  },
  // Column widths
  colViewQuotes: { width: scale(65) },
  colProjectName: { width: scale(75) },
  colDate: { width: scale(70) },
  colStatus: { width: scale(85) },
  colQuotes: { width: scale(80) },
  colDetails: { width: scale(70), borderRightWidth: 0 },
});

export default styles;
