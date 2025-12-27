import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { homeIcon, profileIcon } from '../../assets/icons'; // Using existing icons as placeholders
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import { Theme } from '../../libs';
import getStyles from './style';

const RFQManagement = () => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  const data = [
    {
      id: '1',
      link: '12345',
      name: '[$.job_name]',
      status: '[$.status]',
      active: true,
    },
    {
      id: '2',
      link: '12345',
      name: '[$.job_name]',
      status: '[$.status]',
      active: false,
    },
    {
      id: '3',
      link: '12345',
      name: '[$.job_name]',
      status: '[$.status]',
      active: false,
    },
    {
      id: '4',
      link: '12345',
      name: '[$.job_name]',
      status: '[$.status]',
      active: false,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <View style={styles.column1}>
        <View
          style={[
            styles.projectLink,
            !item.active && styles.projectLinkInactive,
          ]}
        >
          <Text style={styles.projectLinkText}>{item.link}</Text>
        </View>
        <View style={styles.verticalDivider} />
      </View>

      <View style={styles.column2}>
        <Text style={styles.cellText}>{item.name}</Text>
        <View style={styles.verticalDivider} />
      </View>

      <View style={styles.column3}>
        <Text style={styles.cellText}>{item.status}</Text>
        <View style={styles.verticalDivider} />
      </View>

      <View style={styles.column4}>
        <TouchableOpacity
          style={[
            styles.reUploadButton,
            !item.active && styles.reUploadButtonInactive,
          ]}
        >
          <Text style={styles.reUploadText}>Re-Upload</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="RFQ Management" showBack={true} />

      <View style={styles.container}>
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <View style={styles.column1}>
              <Text style={styles.headerText}>Project Link</Text>
              <View style={styles.verticalDivider} />
            </View>
            <View style={styles.column2}>
              <Text style={styles.headerText}>Project name</Text>
              <View style={styles.verticalDivider} />
            </View>
            <View style={styles.column3}>
              <Text style={styles.headerText}>Upload Status</Text>
              <View style={styles.verticalDivider} />
            </View>
            <View style={styles.column4}>
              <Text style={styles.headerText}></Text>
            </View>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Bottom Tab Bar Placeholder */}
        <View style={styles.bottomTabContainer}>
          <TouchableOpacity style={styles.tabItem}>
            <SvgXml xml={homeIcon} width={24} height={24} color="#3E64FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            {/* Grid Icon Placeholder */}
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: '#3E64FF',
                borderRadius: 4,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            {/* Document Icon Placeholder */}
            <View
              style={{
                width: 24,
                height: 24,
                borderWidth: 2,
                borderColor: '#3E64FF',
                borderRadius: 4,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <SvgXml xml={profileIcon} width={24} height={24} color="#3E64FF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RFQManagement;
