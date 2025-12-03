import React from 'react';
import { ActivityIndicator } from 'react-native';
import LinearGradientBackground from '../../components/LinearGradientBackground';

const Loader = () => {
  return (
    <LinearGradientBackground
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <ActivityIndicator size="large" color="#007AFF" />
    </LinearGradientBackground>
  );
};

export default Loader;
