import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { Theme } from '../../libs';

export const PhoneInput = ({
  value,
  onChangeText,
  placeholder = 'Enter phone number',
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Text style={styles.label}>Phone number</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <View style={styles.iconContainer}>
          <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
            <Path
              d="M1.10562 3.67721C1.0568 12.2375 7.9567 19.2165 16.517 19.2653C16.9032 19.2675 17.2862 19.2556 17.6655 19.23C18.1008 19.2006 18.3184 19.1859 18.5171 19.073C18.6816 18.9795 18.8381 18.8131 18.9213 18.6431C19.0217 18.4378 19.0231 18.1977 19.0258 17.7176L19.0419 14.9004C19.0442 14.4966 19.0454 14.2947 18.9799 14.1213C18.9221 13.9681 18.8275 13.8314 18.7045 13.7233C18.5653 13.6009 18.3759 13.5308 17.9973 13.3907L14.7972 12.2063C14.3566 12.0433 14.1363 11.9617 13.9268 11.9742C13.7421 11.9851 13.564 12.0471 13.4124 12.1533C13.2405 12.2737 13.1185 12.4744 12.8745 12.8758L12.0456 14.2398C9.40259 13.0246 7.26665 10.8613 6.07987 8.20564L7.45317 7.39228C7.85736 7.15289 8.05945 7.0332 8.1818 6.86267C8.28967 6.7123 8.35371 6.53495 8.36678 6.35035C8.3816 6.141 8.30259 5.91981 8.14457 5.47742L6.99676 2.26399C6.86094 1.88376 6.79303 1.69364 6.67224 1.55301C6.56554 1.42879 6.42997 1.33268 6.27743 1.27311C6.10475 1.20567 5.90287 1.20452 5.49912 1.20222L2.68186 1.18615C2.20173 1.18342 1.96167 1.18205 1.75528 1.28012C1.58433 1.36135 1.41608 1.51596 1.32071 1.67943C1.20557 1.87681 1.1884 2.09427 1.15405 2.52919C1.12413 2.90816 1.10782 3.29099 1.10562 3.67721Z"
              stroke={Theme.colors.primary}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType="phone-pad"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 24,
  },
  label: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 12,
    ...Theme.fontWeight[500],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  inputContainerFocused: {
    borderColor: '#34E0A1',
  },
  iconContainer: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#4b5563',
    fontSize: 16,
    ...Theme.fontWeight[400],
  },
});
