// screens/Reports/components/RecentList/style.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  heading: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  subheading: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
    marginBottom: 12,
  },

  emptyText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },

  viewAll: {
    color: '#9AC23C',
    fontSize: 13,
    fontWeight: '600',
  },

  itemContainer: {
    backgroundColor: '#111',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemTitle: {
    color: '#fff',
    fontWeight: '600',
    flex: 1,
    marginRight: 8,
  },

  itemTime: {
    color: '#777',
    fontSize: 12,
    marginTop: 2,
  },

  amount: {
    color: '#FF4D4F',
    fontWeight: '700',
    flexShrink: 0,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },
  itemTextWrap: {
    flex: 1,
    minWidth: 0,
  },

  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1B2A10',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
});
