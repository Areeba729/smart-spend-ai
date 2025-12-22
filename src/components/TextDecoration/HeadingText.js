import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Responsive, Theme } from '../../libs';
const { AppFonts, getHeight, getWidth } = Responsive;

const HeadingText = ({
  children,
  text, // Direct text prop as an alternative to children
  style, // Custom style object
  fontSize = AppFonts.h2, // Default font size
  lineHeight, // Optional custom line height
  textAlign = 'center', // Default text alignment
  color, // Text color
  ...props // Other Text props
}) => {
  return (
    <Text
      style={[
        styles.heading,
        {
          fontSize,
          lineHeight: lineHeight || fontSize,
          fontFamily: Theme?.typography?.heading?.fontFamily,
          textAlign,
          color,
        },
        style,
      ]}
      {...props}
    >
      {text || children}
    </Text>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: AppFonts.h2,
    color: Theme.colors.black,
  },
});

export default HeadingText;
