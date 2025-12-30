import { StyleSheet } from 'react-native';

import { Theme, Responsive } from '../../libs';

const { AppFonts } = Responsive;
const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borders?.regularRadius,
    alignItems: 'center',
    justifyContent: 'center',
    width: Responsive.getWidth(325),
    height: Responsive.getHeight(52),
    alignSelf: 'center',
    marginTop: 300,
  },
  buttonText: {
    color: Theme.colors.white,
    fontSize: AppFonts.h5,
    fontFamily: Theme?.typography?.subheading?.fontFamily,
  },
});

export default styles;
