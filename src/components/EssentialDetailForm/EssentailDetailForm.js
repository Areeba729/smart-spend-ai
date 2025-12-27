import { View, Text, TouchableOpacity } from 'react-native';
import {
  FormProvider,
  SmartFormField,
  useSmartForm,
} from 'react-native-fn-forms';
import { SvgXml } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { Theme } from '../../libs';
import { useState } from 'react';

const EssentailDetailForm = ({ onSubmit }) => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [selectedConstructionTypes, setSelectedConstructionTypes] = useState(
    [],
  );
  const navigation = useNavigation();

  const constructionTypes = [
    '[contractorTypelist 0]',
    '[contractorTypelist 1]',
    '[contractorTypelist 2]',
    '[contractorTypelist 3]',
  ];

  const form = useSmartForm({
    fields: {
      companyName: {
        type: 'text',
        required: true,
      },
      companyAddress: {
        type: 'text',
        required: true,
      },
      companyPhone: {
        type: 'phone',
        required: true,
      },
      biddingExpiration: {
        type: 'number',
        required: true,
      },
    },
  });

  const toggleConstructionType = type => {
    if (selectedConstructionTypes.includes(type)) {
      setSelectedConstructionTypes(
        selectedConstructionTypes.filter(t => t !== type),
      );
    } else {
      setSelectedConstructionTypes([...selectedConstructionTypes, type]);
    }
  };

  const handleSubmit = async () => {
    await form.submitForm();

    if (!form.isValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Form',
        text2: 'Please fix the errors',
      });
      return;
    }

    if (selectedConstructionTypes.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Selection Required',
        text2: 'Please select at least one construction type',
      });
      return;
    }

    if (!agreeToTerms) {
      Toast.show({
        type: 'error',
        text1: 'Agreement Required',
        text2: 'Please agree to the Terms & Privacy',
      });
      return;
    }

    onSubmit({
      ...form.values,
      constructionTypes: selectedConstructionTypes,
    });
  };

  const locationIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  return (
    <FormProvider value={form}>
      <View style={styles.container}>
        <SmartFormField
          name="companyName"
          label="Company Name"
          placeholder="Company Name"
          placeholderTextColor={Theme.colors.text}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          style={styles.input}
          errorStyle={styles.error}
        />

        <SmartFormField
          name="companyAddress"
          label="Company address*"
          placeholder="Select Location"
          fieldStyle={styles.field}
          labelStyle={styles.label}
          placeholderTextColor={Theme.colors.text}
          inputContainerStyle={styles.inputContainer}
          style={styles.input}
          errorStyle={styles.error}
          leftIcon={<SvgXml xml={locationIcon} style={styles.locationIcon} />}
        />

        <SmartFormField
          name="companyPhone"
          label="Company Phone Number"
          placeholder="Company Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor={Theme.colors.text}
          fieldStyle={styles.field}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          style={styles.input}
          errorStyle={styles.error}
        />

        <SmartFormField
          name="biddingExpiration"
          label="Default Bidding Expiration (After how many days the bidding will be closed?)*"
          placeholder="Enter days"
          keyboardType="numeric"
          fieldStyle={styles.field}
          placeholderTextColor={Theme.colors.text}
          labelStyle={styles.label}
          inputContainerStyle={styles.inputContainer}
          style={styles.input}
          errorStyle={styles.error}
        />

        <Text style={styles.sectionTitle}>Construction Types*</Text>
        <Text style={styles.sectionSubtitle}>
          Please select all that apply for best results.
        </Text>

        {constructionTypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={styles.checkboxContainer}
            onPress={() => toggleConstructionType(type)}
          >
            <View
              style={[
                styles.checkbox,
                selectedConstructionTypes.includes(type) &&
                  styles.checkboxChecked,
              ]}
            >
              {selectedConstructionTypes.includes(type) && (
                <Text style={styles.checkboxCheckmark}>✓</Text>
              )}
            </View>
            <Text style={styles.checkboxText}>{type}</Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          <View
            style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
          >
            {agreeToTerms && <Text style={styles.checkboxCheckmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxText}>
            I have read and agree to the{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            >
              Privacy Policy, Terms & Conditions, Disclaimer
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
};

export default EssentailDetailForm;
