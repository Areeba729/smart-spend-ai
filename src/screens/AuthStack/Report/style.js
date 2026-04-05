// screens/Reports/style.js
import { StyleSheet } from 'react-native';
import { Theme } from '../../../libs';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  alertContainer: {
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },
  alertText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center',
    flexShrink: 1,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#111',
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryName: {
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  categoryAmount: {
    color: '#9AC23C',
    flexShrink: 0,
  },
  sectionTitle: {
    color: '#777',
    fontSize: 13,
    marginTop: 20,
    marginBottom: 10,
  },
  statisticsTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 4,
  },
  previewButton: {
    marginTop: 20,
    backgroundColor: Theme.colors.secondary,
  },
});
