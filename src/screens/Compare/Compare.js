import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import { Theme } from '../../libs';
import getStyles from './style';

const Compare = ({ navigation }) => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Compare" showBack={true} />

      <View style={styles.container}>
        <View style={styles.comparisonContainer}>
          {/* Left Column */}
          <View style={styles.column}>
            {/* Dashed Line on the far left */}
            <View style={{ position: 'absolute', left: 0, height: '100%' }}>
              {/* This is just a placeholder for the dashed line on the edge */}
            </View>

            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>[ImageItem item </Text>
              <Text style={styles.companyName}>CompanyName]</Text>
            </View>
          </View>

          {/* Center Visual Dividers */}
          {/* <View style={styles.dashedDivider} />
          <View style={styles.divider} /> */}

          {/* Right Column */}
          <View style={styles.column}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>[ImageItem item</Text>
              <Text style={styles.companyName}>CompanyName]</Text>
            </View>

            {/* Side Arrow Button */}
            <TouchableOpacity
              style={styles.arrowContainer}
              onPress={() => navigation.navigate('ImageDetail')}
            >
              <Text style={styles.arrowText}>›</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Compare;
