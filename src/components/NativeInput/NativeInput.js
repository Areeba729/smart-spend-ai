import React from 'react';
import { TextInput, Text, View } from 'react-native';

import { Responsive, Theme } from '../../libs';
import { useTheme } from '@react-navigation/native';
import getStyles from './NativeInputStyle';
import NativeText from '../NativeText/NativeText';

const NativeInput = ({
  onChangeText = () => {},
  leftIcon,
  icon,
  inputContainerStyle,
  placeholder = '',
  inputStyle = {},
  placeholderTextColor = Theme.colors.text,
  selectionColor = 'gray',
  value = '',
  keyboardType = 'default',
  autoFocus = false,
  ref = null,
  blurOnSubmit = true,
  dataDetectorTypes = 'none',
  editable = true,
  enterKeyHint = 'done',
  focusable = true,
  keyboardAppearance = 'default',
  maxLength = 5000,
  multiline = false,
  onBlur = () => {},
  onEndEditing = () => {},
  onFocus = () => {},
  onSubmitEditing = () => {},
  returnKeyType = 'done',
  secureTextEntry = false,
  textAlignVertical = 'auto',
  errorText = null,
  noErrorContainer,
  placeholderStyle = {},
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  return (
    <View style={{ marginBottom: Responsive?.getHeight(0.45) }}>
      <View
        style={[
          styles.inputContainer,
          inputContainerStyle,
          errorText && { borderColor: Theme.colors.error },
        ]}
      >
        <View style={styles.inputicon}>{leftIcon || icon}</View>
        <TextInput
          style={[styles.input, inputStyle, { flex: 1 }]}
          selectionColor={selectionColor}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          placeholderStyle={placeholderStyle}
          value={value}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          ref={ref}
          blurOnSubmit={blurOnSubmit}
          dataDetectorTypes={dataDetectorTypes}
          editable={editable}
          enterKeyHint={enterKeyHint}
          focusable={focusable}
          keyboardAppearance={keyboardAppearance}
          maxLength={maxLength}
          multiline={multiline}
          onBlur={onBlur}
          onEndEditing={onEndEditing}
          onFocus={onFocus}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          textAlignVertical={textAlignVertical}
        />
      </View>
      <View style={[styles.errorContainer]}>
        {errorText && (
          <NativeText style={styles.errorText}>{errorText}</NativeText>
        )}
      </View>
    </View>
  );
};

export default NativeInput;
