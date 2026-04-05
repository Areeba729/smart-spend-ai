// screens/Reports/components/ExpenseChart/style.js
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { Theme } from '../../libs';

export default StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 16,
    marginTop: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  label: {
    color: '#777',
    fontSize: 13,
  },

  amount: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
    marginTop: 6,
  },

  percentageBadge: {
    backgroundColor: '#1B2A10',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  percentageText: {
    color: '#9AC23C',
    fontWeight: '700',
    fontSize: 12,
  },
  alertText: {
    fontSize: scale(10),
    color: Theme.colors.secondary,
  },
  remainingText: {
    fontSize: scale(10),
    color: Theme.colors.secondary,
  },
  graphWrapper: {
    marginTop: 16,
  },
});
