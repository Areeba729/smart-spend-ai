import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import styles from './style';

const QuoteManagementTool = () => {
  const navigation = useNavigation();
  const data = [
    {
      id: '49496',
      projectName: 'Khajoor',
      date: '11/22/25\n8:37 am',
      status: 'Quote Sent to\nAdmin',
      quotes: { new: 0, total: 1 },
    },
    {
      id: '49494',
      projectName: 'Test Agian',
      date: '',
      status: 'Received',
      quotes: { new: 0, total: 3 },
    },
    {
      id: '49492',
      projectName: 'Gourmet\n101',
      date: '',
      status: 'In Review',
      quotes: { new: 1, total: 2 },
    },
    {
      id: '49479',
      projectName: 'Keys 2.0',
      date: '',
      status: 'Declined',
      quotes: { new: 0, total: 0 },
    },
    {
      id: '49443',
      projectName: 'Testing\nHeights',
      date: '',
      status: 'Completed',
      quotes: { new: 2, total: 5 },
    },
  ];

  const renderHeader = () => (
    <View style={styles.tableHeader}>
      <View style={[styles.headerCell, styles.colViewQuotes]}>
        <Text style={styles.headerText}>View\nQuotes</Text>
      </View>
      <View style={[styles.headerCell, styles.colProjectName]}>
        <Text style={styles.headerText}>Project\nName</Text>
      </View>
      <View style={[styles.headerCell, styles.colDate]}>
        <Text style={styles.headerText}>Date\nCreated</Text>
      </View>
      <View style={[styles.headerCell, styles.colStatus]}>
        <Text style={styles.headerText}>Status</Text>
      </View>
      <View style={[styles.colQuotes]}>
        <View style={styles.headerCell}>
          <Text style={styles.headerText}>Quotes</Text>
        </View>
        <View style={styles.subHeaderRow}>
          <View style={styles.subHeaderCell}>
            <Text style={styles.headerText}>New</Text>
          </View>
          <View style={[styles.subHeaderCell, styles.subHeaderCellLast]}>
            <Text style={styles.headerText}>Total</Text>
          </View>
        </View>
      </View>
      <View style={[styles.headerCell, styles.colDetails]}>
        <Text style={styles.headerText}>Project\nDetails</Text>
      </View>
    </View>
  );

  const renderRow = ({ item }) => (
    <View style={styles.row}>
      <View style={[styles.cell, styles.colViewQuotes]}>
        <TouchableOpacity style={styles.idButtonBase}>
          <Text style={styles.idButtonText}>{item.id}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.cell, styles.colProjectName]}>
        <Text style={styles.projectNameText}>{item.projectName}</Text>
      </View>
      <View style={[styles.cell, styles.colDate]}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={[styles.cell, styles.colStatus]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
      <View style={[styles.colQuotes, { flexDirection: 'row' }]}>
        <View
          style={{
            flex: 1,
            borderRightWidth: 1,
            borderColor: '#E5E7EB',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.quoteCountText}>{item.quotes.new}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={styles.quoteCountText}>{item.quotes.total}</Text>
        </View>
      </View>
      <View style={[styles.cell, styles.colDetails]}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate('QuoteInbox')}
        >
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Quote Management Tool" showBack={true} />

      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Quote Management Panel</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View>
            {renderHeader()}
            <FlatList
              data={data}
              renderItem={renderRow}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default QuoteManagementTool;
