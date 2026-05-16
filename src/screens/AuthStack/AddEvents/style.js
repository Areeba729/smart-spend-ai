import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    paddingHorizontal: scale(16),
  },
  ListContainer:{
    flex: 1,
  },

  list: {
    paddingBottom: scale(80),
  
  },

  calendarContainer: {
    marginBottom: scale(12),
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
    borderColor: '#666',
    borderWidth: 1,
    marginBottom: scale(12),
  },
  eventCardContent: {
    flex: 1,
    paddingRight: scale(8),
  },
  eventCardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  editButton: {
    padding: scale(6),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    padding: scale(6),
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: Theme.colors.secondary,
    marginBottom: scale(12),
    zIndex: 1,
  },
  title: {
    fontSize: scale(14),
    fontWeight: '600',
    color: Theme.colors.text,
  },
  description: {
    fontSize: scale(12),
    marginTop: 4,
    color: Theme.colors.text,
  },
  date: {
    fontSize: scale(12),
    marginTop: 6,
    color: Theme.colors.text,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default styles;
