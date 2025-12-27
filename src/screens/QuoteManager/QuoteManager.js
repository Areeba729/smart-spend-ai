import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import { Theme } from '../../libs';
import getStyles from './style';

const QuoteManager = () => {
  const navigation = useNavigation();
  const { colors } = Theme;
  const styles = getStyles(colors);

  const mockData = [
    {
      id: '1',
      company: '[$.company_name]',
      sectors: [
        '[sectorContainer item]',
        '[sectorContainer item]',
        '[sectorContainer item]',
      ],
      active: true,
    },
    {
      id: '2',
      company: '[$.company_name]',
      sectors: ['[sectorContainer item]', '[sectorContainer item]'],
      active: false,
    },
    {
      id: '3',
      company: '[$.company_name]',
      sectors: ['[sectorContainer item]'],
      active: false,
    },
    {
      id: '4',
      company: '[$.company_name]',
      sectors: [
        '[sectorContainer item]',
        '[sectorContainer item]',
        '[sectorContainer item]',
        '[sectorContainer item]',
      ],
      active: false,
    },
  ];

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={[styles.headerCell, styles.inboxCell]}>
        <Text style={styles.headerText}>Supply Quote Inbox</Text>
      </View>
      <View style={[styles.headerCell, styles.verticalHeaderCell]}>
        <View style={styles.verticalTextContainer}>
          <Text style={styles.headerText}>Compare</Text>
          <Text style={{ fontSize: 12, marginTop: 5 }}>⚖️</Text>
        </View>
      </View>
      <View style={[styles.headerCell, styles.sectorCell]}>
        <Text style={styles.headerText}>Building Sector Per Quotes</Text>
      </View>
      <View style={[styles.headerCell, styles.statusCell]}>
        <View style={styles.iconHeader}>
          <Text style={{ fontSize: 16 }}>👎</Text>
          <Text
            style={[
              styles.headerText,
              { color: 'red', transform: [{ rotate: '360deg' }] },
            ]}
          >
            No
          </Text>
        </View>
      </View>
      <View
        style={[styles.headerCell, styles.statusCell, { borderRightWidth: 0 }]}
      >
        <View style={styles.iconHeader}>
          <Text style={{ fontSize: 16 }}>👍</Text>
          <Text
            style={[
              styles.headerText,
              { color: 'blue', transform: [{ rotate: '360deg' }] },
            ]}
          >
            Maybe
          </Text>
        </View>
      </View>
    </View>
  );

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <View style={[styles.cell, styles.inboxCell]}>
        <TouchableOpacity style={styles.quoteCard}>
          <Text style={styles.quoteCardText}>Click on Quote ☰</Text>
          <Text style={styles.companyName}>{item.company}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.cell, styles.compareCell]}>
        <TouchableOpacity
          style={[styles.radioButton, item.active && styles.radioButtonActive]}
        >
          <View style={styles.radioInner} />
        </TouchableOpacity>
      </View>
      <View style={[styles.cell, styles.sectorCell]}>
        {item.sectors.map((sector, index) => (
          <Text key={index} style={styles.sectorItem}>
            {sector}
          </Text>
        ))}
      </View>
      <View style={[styles.cell, styles.statusCell]}>
        <TouchableOpacity style={styles.radioButton}>
          {/* Empty radio button */}
        </TouchableOpacity>
      </View>
      <View style={[styles.cell, styles.statusCell, { borderRightWidth: 0 }]}>
        <TouchableOpacity style={styles.radioButton}>
          {/* Empty radio button */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Quote Management Tool" showBack={true} />

      <View style={styles.container}>
        <View style={styles.contentHeader}>
          <Text style={styles.rfqTitle}>Material RFQ 00000</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Filter')}
            >
              <Text style={styles.actionButtonText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Compare')}
            >
              <Text style={styles.actionButtonText}>Compare</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ width: 400 }}>
            <FlatList
              data={mockData}
              renderItem={renderRow}
              keyExtractor={item => item.id}
              ListHeaderComponent={renderHeader}
              stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default QuoteManager;
