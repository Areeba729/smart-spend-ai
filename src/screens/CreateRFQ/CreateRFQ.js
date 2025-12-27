import React from 'react';
import { ScrollView, View } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import CreateRFQForm from '../../components/CreateRFQForm/CreateRFQForm';
import styles from './style';

const CreateRFQ = () => {
  const handleFormSubmit = formData => {
    console.log('RFQ Data:', formData);
    // Add logic to save the RFQ
  };

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Create New RFQ" showBack={true} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <CreateRFQForm onSubmit={handleFormSubmit} />
      </ScrollView>
    </View>
  );
};

export default CreateRFQ;
