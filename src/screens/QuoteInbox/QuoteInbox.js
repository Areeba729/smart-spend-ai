import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { rocketIcon, starIcon } from '../../assets/icons'; // Adjust if icons are named differently
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import styles from './style';

const QuoteInbox = () => {
  const navigation = useNavigation();
  const quotes = [
    { id: '1', supplier: 'EwayBuilder', hasBadge: true, isSelected: true },
    { id: '2', supplier: 'BigBuilder', hasBadge: true, isSelected: false },
    { id: '3', supplier: 'QuickConstruct', hasBadge: false, isSelected: false },
  ];

  const tickIcon = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E64FF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;

  const renderQuoteRow = ({ item }) => (
    <View style={styles.rowContainer}>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeaderIcons}>
            <SvgXml
              xml={
                starIcon ||
                `<svg width="20" height="20" viewBox="0 0 24 24" fill="#FBBF24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
              }
              width={20}
              height={20}
            />
            <SvgXml
              xml={
                rocketIcon ||
                `<svg width="20" height="20" viewBox="0 0 24 24" fill="#3B82F6"><path d="M4.5 16.5c.5 1 1 2 2 3s2 1.5 3 2c3 1.5 11.5 0 11.5 0S22 13 20.5 10c-.5-1-1-2-2-3s-2-1.5-3-2C12.5 3.5 4 5 4 5s1.5 8.5 3 11.5c.5-1-1.5 0-2.5 0z"/></svg>`
              }
              width={20}
              height={20}
            />
          </View>
          <Text style={styles.supplierName}>{item.supplier}</Text>
          <TouchableOpacity style={styles.viewQuoteButton}>
            <Text style={styles.viewQuoteText}>View Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.supplierDetailsButton}>
            <Text style={styles.supplierDetailsText}>Supplier Details</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.sidebarCell}>
        {item.isSelected ? (
          <SvgXml xml={tickIcon} width={20} height={20} />
        ) : (
          <View style={styles.selectionCircle} />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Quote Management Tool" showBack={true} />

      <View style={styles.container}>
        {/* Sub Header */}
        <View style={styles.subHeader}>
          <Text style={styles.rfqId}>RFQ 48679</Text>
          <View style={styles.subHeaderActions}>
            <TouchableOpacity style={styles.subButton}>
              <Text style={styles.subButtonText}>Compare Quotes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.subButton}
              onPress={() => navigation.navigate('QuoteExpandedView')}
            >
              <Text style={styles.subButtonText}>Expanded View</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Title Section with Sidebar Header */}
        <View style={{ flexDirection: 'row' }}>
          <View
            style={[
              styles.inboxTitleSection,
              { flex: 1, borderBottomWidth: 1, borderColor: '#E2E8F0' },
            ]}
          >
            <Text style={styles.inboxTitle}>Quote Inbox</Text>
          </View>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Select to Compare</Text>
            <View style={styles.sidebarIcon}>
              <SvgXml
                xml={`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E293B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>`}
                width={14}
                height={14}
              />
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentRow}>
          <FlatList
            data={quotes}
            renderItem={renderQuoteRow}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.quotesList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default QuoteInbox;
