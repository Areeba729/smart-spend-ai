import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Responsive, Theme } from '../../libs';
const { AppFonts, getHeight, getWidth } = Responsive;

const renderTextWithEmailLinks = (content, style, linkStyle) => {
  if (!content) return null;

  // Simple email regex pattern
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  const parts = [];
  let lastIndex = 0;
  let match;

  // Find all email matches in the text
  while ((match = emailRegex.exec(content)) !== null) {
    const email = match[0];
    const index = match.index;

    // Add text before the email
    if (index > lastIndex) {
      parts.push(content.substring(lastIndex, index));
    }

    // Add the email as a clickable link
    parts.push(
      <Text
        key={index}
        style={[styles.emailText, linkStyle]}
        onPress={() => Linking.openURL(`mailto:${email}`)}
      >
        {email}
      </Text>,
    );

    lastIndex = index + email.length;
  }

  // Add remaining text after the last email
  if (lastIndex < content.length) {
    parts.push(content.substring(lastIndex));
  }

  return parts.length > 0 ? parts : content;
};

const LabelText = ({
  children,
  text, // Direct text prop as an alternative to children
  style, // Custom style object
  fontSize = AppFonts.t1, // Default font size
  lineHeight, // Optional custom line height
  textAlign = 'center', // Default text alignment
  color, // Text color
  linkStyle, // Style for email links
  numberOfLines = 1, // Number of lines to display (default: 1)
  ellipsizeMode = 'tail', // Where to place the ellipsis ('head', 'middle', 'tail', 'clip')
  ...props // Other Text props
}) => {
  const content = text || children;
  const isString = typeof content === 'string';

  return (
    <Text
      style={[
        styles.labelText,
        {
          fontSize,
          lineHeight: lineHeight || fontSize * 1.4,
          textAlign,
          color,
        },
        style,
      ]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      {...props}
    >
      {isString ? renderTextWithEmailLinks(content, style, linkStyle) : content}
    </Text>
  );
};

const styles = StyleSheet.create({
  labelText: {
    // fontFamily: Theme?.typography?.medium?.fontFamily,
    fontFamily: Theme?.fontWeight?.['500']?.fontFamily,
    // Base styles
  },
  emailText: {
    color: Theme.colors.primary,
    textDecorationLine: 'underline',
  },
});

export default LabelText;
