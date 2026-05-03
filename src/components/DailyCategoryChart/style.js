import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  title: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    color: '#888',
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  totalBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: '#888',
    fontSize: 14,
  },
  totalAmount: {
    color: '#9AC23C',
    fontSize: 20,
    fontWeight: '700',
  },
  list: {},
  row: {
    marginBottom: 14,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    minWidth: 0,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryName: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
    marginRight: 8,
  },
  amount: {
    color: '#9AC23C',
    fontSize: 15,
    fontWeight: '600',
    flexShrink: 0,
  },
  barTrack: {
    height: 8,
    backgroundColor: '#222',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  percentText: {
    color: '#666',
    fontSize: 12,
    marginLeft: 2,
  },
  placeholderText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 24,
    lineHeight: 20,
  },
});
