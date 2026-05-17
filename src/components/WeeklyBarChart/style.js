import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#161618',
    borderRadius: 16,
    paddingTop: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#2a2a2e',
    overflow: 'hidden',
  },
  title: {
    color: '#e0e0e0',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.3,
    paddingHorizontal: 16,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  navButton: {
    padding: 8,
  },
  weekLabel: {
    color: '#e0e0e0',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  chart: {
    alignSelf: 'flex-start',
    paddingRight: 52,
    paddingTop: 28,
    paddingBottom: 18,
  },
});
