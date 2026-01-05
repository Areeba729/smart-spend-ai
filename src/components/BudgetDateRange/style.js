import { StyleSheet } from 'react-native';
import { Theme } from '../../libs'; // Assuming you have Theme for your colors
import { scale } from 'react-native-size-matters';

const styles = {
  dateRangeContainer: {
    padding: 20,
    backgroundColor: Theme.colors.primary,
    borderRadius: 10,
    marginBottom: 15,

    // alignItems: 'center',
  },
  dateRangeText: {
    fontSize: scale(14),
    color: Theme.colors.text,
  },
  boldText: {
    fontWeight: 'bold',
  },
  changeDateText: {
    fontSize: scale(12),
    color: Theme.colors.secondary,
    marginTop: 5,
  },
};

export default styles;
