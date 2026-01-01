// screens/Reports/components/ReportTabs/style.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: 14,
    padding: 4,
    marginTop: 16,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTab: {
    backgroundColor: '#9AC23C',
  },

  tabText: {
    color: '#888',
    fontWeight: '600',
  },

  activeTabText: {
    color: '#000',
  },
});
