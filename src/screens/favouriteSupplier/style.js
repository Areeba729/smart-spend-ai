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
  addButtonContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(10),
  },
  addButton: {
    backgroundColor: '#3E64FF',
    borderRadius: scale(20),
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
  },
  addButtonText: {
    color: Theme.colors.white,
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },
  card: {
    backgroundColor: Theme.colors.white,
    borderRadius: scale(12),
    padding: scale(16),
    marginBottom: verticalScale(16),
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  companyName: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#000',
  },
  favoriteIconContainer: {
    padding: scale(4),
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },
  address: {
    fontSize: moderateScale(12),
    color: '#94A3B8',
    marginLeft: scale(4),
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  categoryPill: {
    backgroundColor: '#EBF2FF',
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(8),
  },
  categoryText: {
    color: '#3E64FF',
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
});

export default styles;
