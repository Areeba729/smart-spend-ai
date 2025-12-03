import React from 'react';
import { View, Text } from 'react-native';
import NativeInput from '../NativeInput/NativeInput';
import getStyles from './Style';
import { Theme } from '../../libs';

const Textarea = ({
  value,
  onChange,
  placeholder,
  label,
  description,
  containerStyle,
  placeholderTextColor = Theme.colors.text,
  ...props
}) => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  return (
    <View style={containerStyle}>
      {description && <Text style={styles.description}>{description}</Text>}
      {label && <Text style={styles.label}>{label}</Text>}
      <NativeInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder || 'Write here...'}
        placeholderTextColor={placeholderTextColor}
        inputContainerStyle={styles.textareaContainer}
        inputStyle={styles.textareaInput}
        multiline={true}
        textAlignVertical={'top'}
        {...props}
      />
    </View>
  );
};

export default Textarea;
