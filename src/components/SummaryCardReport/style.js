// screens/Reports/components/SummaryCard/style.js
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    width: '48%',
    minWidth: 0,
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  svgContainer: {
    flexDirection: 'row',
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: '#777',
    fontSize: 12,
    marginTop: scale(10),
    flex: 1,
    flexShrink: 1,
  },

  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
    flexShrink: 1,
  },

  expenseValue: {
    fontSize: 22,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
    flexShrink: 1,
  },

  expenseSubtitle: {
    color: '#FF4D4F',
  },

  categorySubtitle: {
    color: '#9AC23C',
  },
});
