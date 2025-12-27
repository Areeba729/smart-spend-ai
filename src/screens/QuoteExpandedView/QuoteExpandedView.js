import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { rocketIcon, starIcon } from '../../assets/icons';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import styles from './style';
import { moderateScale, scale } from 'react-native-size-matters';

const QuoteExpandedView = () => {
  const quotes = [
    {
      id: '1',
      supplier: 'EwayBuilder',
      sectors: [
        { id: 's1', name: 'Test Roofing' },
        { id: 's2', name: 'Test Siding' },
        { id: 's3', name: 'Test Lumber' },
        { id: 's4', name: 'Test Gutter' },
      ],
    },
    {
      id: '2',
      supplier: 'BigBuilder',
      sectors: [
        { id: 's1', name: 'Test Roofing' },
        { id: 's2', name: 'Test Siding' },
        { id: 's3', name: 'Test Lumber' },
        { id: 's4', name: 'Test Gutter' },
      ],
    },
  ];

  const renderQuoteRow = ({ item }) => (
    <View style={styles.row}>
      {/* Quote Inbox Column */}
      <View style={styles.inboxCell}>
        <View style={styles.miniCard}>
          <View style={styles.cardHeaderIcons}>
            <SvgXml xml={starIcon} width={15} height={15} />
            <SvgXml xml={rocketIcon} width={15} height={15} />
          </View>
          <Text style={styles.supplierMiniName}>{item.supplier}</Text>
        </View>
        <TouchableOpacity style={styles.moreInfoButton}>
          <Text style={styles.moreInfoText}>More Info</Text>
        </TouchableOpacity>
      </View>

      {/* Select to Compare Column */}
      <View style={styles.selectionCell}>
        <View style={styles.selectionCircle} />
      </View>

      {/* Building Sectors Column */}
      <View style={styles.sectorsCell}>
        {item.sectors.map((sector, index) => (
          <View
            key={sector.id}
            style={[
              styles.sectorItem,
              index === item.sectors.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Text style={styles.sectorText}>{sector.name}</Text>
          </View>
        ))}
      </View>

      {/* No Choice Column */}
      <View style={styles.statusChoicesCell}>
        {item.sectors.map((sector, index) => (
          <View
            key={sector.id}
            style={[
              styles.statusChoiceRow,
              index === item.sectors.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <View style={styles.selectionCircle} />
          </View>
        ))}
      </View>

      {/* Maybe Choice Column */}
      <View style={styles.statusChoicesCell}>
        {item.sectors.map((sector, index) => (
          <View
            key={sector.id}
            style={[
              styles.statusChoiceRow,
              index === item.sectors.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <View style={styles.selectionCircle} />
          </View>
        ))}
      </View>

      {/* Favorite Choice Column */}
      <View style={[styles.statusChoicesCell, { borderRightWidth: 0 }]}>
        {item.sectors.map((sector, index) => (
          <View
            key={sector.id}
            style={[
              styles.statusChoiceRow,
              index === item.sectors.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <View style={styles.selectionCircle} />
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Quote Management Tool" showBack={true} />

      <View style={styles.container}>
        {/* Sub Header Buttons */}
        <View style={styles.subHeader}>
          <TouchableOpacity style={styles.subButton}>
            <Text style={styles.subButtonText}>Quick View</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subButton}>
            <Text style={styles.subButtonText}>Compare Quotes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.subButton, { borderRightWidth: 0 }]}>
            <Text style={styles.subButtonText}>Select Filters</Text>
          </TouchableOpacity>
        </View>

        {/* RFQ ID Bar */}
        <View style={styles.rfqIdHeader}>
          <Text style={styles.rfqIdText}>RFQ 48679</Text>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={[styles.headerCell, { width: scale(110) }]}>
            <Text
              style={[
                styles.inboxTitle,
                { fontSize: moderateScale(14), color: '#3E64FF' },
              ]}
            >
              Quote Inbox
            </Text>
          </View>
          <View style={styles.rotatedHeaderCell}>
            <Text style={styles.rotatedHeaderText}>Select to Compare</Text>
            <View style={styles.headerIconContainer}>
              <SvgXml
                xml={`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`}
                width={14}
                height={14}
              />
            </View>
          </View>
          <View style={[styles.headerCell, { flex: 1, paddingHorizontal: 10 }]}>
            <Text
              style={[
                styles.inboxTitle,
                {
                  fontSize: moderateScale(12),
                  color: '#64748B',
                  textAlign: 'center',
                },
              ]}
            >
              Building Sectors
            </Text>
          </View>

          {/* Status Headers */}
          <View style={styles.statusHeaderCell}>
            <Text style={styles.statusLabelText}>No</Text>
            <SvgXml
              xml={`<svg width="14" height="14" viewBox="0 0 24 24" fill="#EF4444"><path d="M10 15v4a3 3 0 0 0 6 0v-4h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3V5a3 3 0 0 0-6 0v2H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4z"/></svg>`}
              width={14}
              height={14}
            />
          </View>
          <View style={styles.statusHeaderCell}>
            <Text style={styles.statusLabelText}>Maybe</Text>
            <SvgXml
              xml={`<svg width="14" height="14" viewBox="0 0 24 24" fill="#3B82F6"><path d="M14 9V5a3 3 0 0 0-6 0v4H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h3v4a3 3 0 0 0 6 0v-4h3a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3z"/></svg>`}
              width={14}
              height={14}
            />
          </View>
          <View style={[styles.statusHeaderCell, { borderRightWidth: 0 }]}>
            <Text style={styles.statusLabelText}>Favorite</Text>
            <SvgXml
              xml={`<svg width="14" height="14" viewBox="0 0 24 24" fill="#22C55E"><path d="M7 2v20h2v-8h11l-2-4 2-4H9V2H7z"/></svg>`}
              width={14}
              height={14}
            />
          </View>
        </View>

        {/* Content List */}
        <FlatList
          data={quotes}
          renderItem={renderQuoteRow}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default QuoteExpandedView;
