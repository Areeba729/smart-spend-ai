import { StyleSheet } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    paddingHorizontal: scale(16),
  },

  list: {
    paddingBottom: scale(80),
  },

  calendarContainer: {
    height: 250,
    marginBottom: scale(70),
  },
  eventCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Theme.colors.primary,
    borderColor: '#666',
    borderWidth: 1,
    marginBottom: scale(12),
  },
  listTitle: {
    fontSize: scale(16),
    fontWeight: '600',
    color: Theme.colors.secondary,
    marginBottom: scale(12),
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
