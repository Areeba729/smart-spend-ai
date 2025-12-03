import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window')
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const parseValue = value => {
  if (typeof value === 'number') {
    // If the value is already a number, return it as is
    return value
  } else if (typeof value === 'string') {
    // Check if the string ends with '%'
    const isPercentage = value.endsWith('%')

    // If it's a percentage, attempt to parse the numeric part
    if (isPercentage) {
      const numericPart = parseFloat(value)

      // Check if parsing was successful and the result is a finite number
      if (!isNaN(numericPart) && isFinite(numericPart)) {
        return numericPart
      }
    }

    // If it's not a percentage or parsing fails, attempt to parse the entire string
    const parsedValue = parseFloat(value)

    // Check if parsing was successful and the result is a finite number
    if (!isNaN(parsedValue) && isFinite(parsedValue)) {
      return parsedValue
    }
  }
}

// Dimensions.addEventListener('change', ({ window }) => {
//   width = window.width;
//   height = window.height;
// });


const Responsive = {
  width,
  height,
  // getWidth: value => {
  //   const parsedValue = parseValue(value);
  //   let responsiveWidth = 0;
  //   responsiveWidth = width * (parsedValue / 100);
  //   return responsiveWidth;
  // },
  // getHeight: value => {
  //   const parsedValue = parseValue(value);
  //   let responsiveHeight = 0;
  //   responsiveHeight = height * (parsedValue / 100);
  //   return responsiveHeight;
  // },

  getWidth: (value, pixel) => {
    try {
      const parsedValue = parseValue(value)
      const calculatedWidth =
        pixel === 'pixel'
          ? parsedValue
          : (width * parsedValue) / 100
      return Math.round(calculatedWidth) // Use Math.round for rounding
    } catch (error) {
      console.error(error.message)
      return 0
    }
  },
  getHeight: (value, pixel) => {
    try {
      const parsedValue = parseValue(value)
      const calculatedHeight =
        pixel === 'pixel'
          ? parsedValue
          : (height * parsedValue) / 100
      return Math.round(calculatedHeight) // Use Math.round for rounding
    } catch (error) {
      console.error(error.message)
      return 0
    }
  },
  AppFonts: {
    h1: moderateScale(24),
    h2: moderateScale(22),
    h3: moderateScale(20),
    h4: moderateScale(18),
    h5: moderateScale(16),
    t1: moderateScale(14),
    t2: moderateScale(12),
    t3: moderateScale(10),
  },

  sizeMatter: {
    scale: (value) => scale(value), // Width
    verticalScale: (value) => verticalScale(value), // Height
    moderateScale: (value) => moderateScale(value), // Text
  },

}

export default Responsive