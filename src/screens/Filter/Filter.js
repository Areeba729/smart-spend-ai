import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { checkMark } from '../../assets/icons';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import { Theme } from '../../libs';
import getStyles from './style';

const Filter = () => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  const quoteStatusOptions = [
    '[FilterQuoteStatus 0]',
    '[FilterQuoteStatus 1]',
    '[FilterQuoteStatus 2]',
    '[FilterQuoteStatus 3]',
  ];

  const buildingSectorOptions = [
    '[materialscategory 0]',
    '[materialscategory 1]',
    '[materialscategory 2]',
    '[materialscategory 3]',
  ];

  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);

  const toggleStatus = status => {
    setSelectedStatus(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status],
    );
  };

  const toggleSector = sector => {
    setSelectedSectors(prev =>
      prev.includes(sector)
        ? prev.filter(s => s !== sector)
        : [...prev, sector],
    );
  };

  const renderFilterItem = (label, isSelected, onPress) => (
    <TouchableOpacity style={styles.filterItem} onPress={onPress}>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && (
          <SvgXml xml={checkMark} width={12} height={12} color="#3E64FF" />
        )}
      </View>
      <Text style={styles.filterText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Select Filters" showBack={true} />

      <View style={styles.container}>
        <ScrollView
          style={styles.contentArea}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Filter by Quote Status:</Text>
            {quoteStatusOptions.map(status =>
              renderFilterItem(status, selectedStatus.includes(status), () =>
                toggleStatus(status),
              ),
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Filter by Building Sectors:</Text>
            {buildingSectorOptions.map(sector =>
              renderFilterItem(sector, selectedSectors.includes(sector), () =>
                toggleSector(sector),
              ),
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => {
              setSelectedStatus([]);
              setSelectedSectors([]);
            }}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Filter;
