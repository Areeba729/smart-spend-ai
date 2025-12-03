// PrimaryButton.js
import React from "react"
import { TouchableOpacity, Text } from "react-native"

import styles from "./PrimaryButtonStyles"

const PrimaryButton = ({
  onPress,
  title,
  containerStyle,
  titleStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      disabled={disabled}
      style={[styles.button, containerStyle]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default PrimaryButton
