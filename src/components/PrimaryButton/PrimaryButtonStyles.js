import { StyleSheet } from "react-native"

import { Theme, Responsive } from "../../libs"

const { AppFonts } = Responsive
const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borders.regularRadius,
    alignItems: "center",
    justifyContent: 'center',
    width: Responsive.sizeMatter.scale(325),
    height: Responsive.sizeMatter.scale(52),
    alignSelf: 'center',
  },
  buttonText: {
    color: Theme.colors.white,
    fontSize: AppFonts.h5,
    fontFamily: Theme?.typography?.subheading?.fontFamily,
    // lineHeight: Responsive?.getHeight(3.4),
  },
})

export default styles
