import { useState } from 'react';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import NativeText from '../../../components/NativeText/NativeText';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Theme } from '../../../libs';
import { CONTACT_CONTENT, FAQ_CONTENT } from '../../../libs/constants';
import getStyles from './Style';

const TABS = [
  { key: 'faq', label: 'FAQ' },
  { key: 'contact', label: 'Contact' },
];

const HelpCenter = ({ navigation }) => {
  const { colors } = Theme;
  const styles = getStyles(colors);
  const [activeTab, setActiveTab] = useState('faq');

  const screenWidth = Dimensions.get('window').width - 32 - 16; // 16px padding each side + 16px (8px each side for underline wrapper)
  const tabWidth = screenWidth / TABS.length;

  return (
    <View style={styles.container}>
      <PageHeader
        title="Help Center"
        showBookmark={false}
        onBackPress={() => navigation?.goBack()}
      />
      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => setActiveTab(tab.key)}
          >
            <NativeText
              style={[
                styles.tabText,
                activeTab === tab.key && styles.tabTextActive,
              ]}
            >
              {tab.label}
            </NativeText>
          </TouchableOpacity>
        ))}
      </View>
      {/* Underline */}
      <View style={styles.tabUnderlineWrapper}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: colors['dark-grey'],
            borderRadius: 1,
          }}
        />
        <View
          style={{
            width: tabWidth + 14,
            left: activeTab === 'faq' ? 0 : tabWidth,
            position: 'absolute',
            backgroundColor: colors.primary,
            height: 2,
            borderRadius: 1,
          }}
        />
      </View>
      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'faq' ? (
          <NativeText style={styles.contentText}>{FAQ_CONTENT}</NativeText>
        ) : (
          <NativeText style={styles.contentText}>{CONTACT_CONTENT}</NativeText>
        )}
      </ScrollView>
    </View>
  );
};

export default HelpCenter;
