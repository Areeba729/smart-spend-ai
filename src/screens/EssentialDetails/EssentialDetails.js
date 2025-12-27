import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SvgXml } from 'react-native-svg';
import { arrowIcon } from '../../assets/icons';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import EssentialDetailForm from '../../components/EssentialDetailForm/EssentailDetailForm';
import { Theme } from '../../libs';
import getStyles from './style';

const EssentialDetails = () => {
  const navigation = useNavigation();
  const { colors } = Theme;
  const styles = getStyles(colors);

  const handleFormSubmit = values => {
    console.log('Form Values:', values);
    // Handle form submission logic here
  };

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <KeyboardAwareScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <SvgXml
              xml={arrowIcon}
              width={24}
              height={24}
              color={Theme.colors.white}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Essential Details</Text>
          <Text style={styles.subtitle}>
            Add details to take control of your material sourcing
          </Text>
        </View>

        <View style={styles.formContainer}>
          <EssentialDetailForm onSubmit={handleFormSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EssentialDetails;
