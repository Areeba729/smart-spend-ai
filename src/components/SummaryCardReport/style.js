// screens/Reports/components/SummaryCard/style.js
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

export default StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
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
  },
  title: {
    color: '#777',
    fontSize: 12,
    marginTop: scale(10),
    // letterSpacing: 0.6,
  },

  value: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 6,
  },

  expenseValue: {
    fontSize: 22,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 12,
  },

  expenseSubtitle: {
    color: '#FF4D4F',
  },

  categorySubtitle: {
    color: '#9AC23C',
  },
});
