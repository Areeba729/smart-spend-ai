import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import styles from './style';

const QuoteMsgInbox = () => {
  const [activeTab, setActiveTab] = useState('New');

  const messages = [
    {
      id: '1',
      supplier: 'Eway Builder inc llc',
      snippet: 'House addition for the west property\nEtc etc',
      isNew: true,
    },
    {
      id: '2',
      supplier: 'Lumber Supply inc llc',
      snippet: 'LR expansion',
      isNew: true,
    },
    {
      id: '3',
      supplier: 'AAA Roofing Materials',
      snippet: 'House addition',
      isNew: false,
    },
    {
      id: '4',
      supplier: 'Construction Materials, LLC',
      snippet: 'House addition for the Jones property',
      isNew: false,
    },
    {
      id: '5',
      supplier: 'Construction Materials, LLC',
      snippet: 'Bath remodel',
      isNew: false,
    },
  ];

  const flagIcon = color => `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="${color}">
      <path d="M7 2v20h2v-8h11l-2-4 2-4H9V2H7z"/>
    </svg>
  `;

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity style={styles.messageItem}>
      <View style={styles.iconContainer}>
        <SvgXml
          xml={flagIcon(item.isNew ? '#22C55E' : '#475569')}
          width={20}
          height={20}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.supplierName}>{item.supplier}</Text>
        <Text style={styles.snippet}>{item.snippet}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Quote Inbox" showBack={true} />

      <View style={styles.container}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'New' ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab('New')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'New'
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              New
            </Text>
            {activeTab === 'New' && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'All' ? styles.activeTab : styles.inactiveTab,
            ]}
            onPress={() => setActiveTab('All')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'All'
                  ? styles.activeTabText
                  : styles.inactiveTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Message List */}
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default QuoteMsgInbox;
