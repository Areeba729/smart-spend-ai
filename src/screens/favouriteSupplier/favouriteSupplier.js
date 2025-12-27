import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { heartIcon, locationIcon } from '../../assets/icons'; // Assuming locationIcon is available or use a pin
import CustomStatusBar from '../../components/CustomStatusBar/CustomStatusBar';
import Header from '../../components/Header/Header';
import styles from './style';

const FavoriteSupplierScreen = () => {
  const suppliers = [
    {
      id: '1',
      company: 'Digital Solutions Co.',
      address: '123 Main St, New York, NY',
      isFavorite: true,
      categories: ['IT Services', 'Cloud', 'Marketing'],
    },
    {
      id: '2',
      company: 'Logistics Pro',
      address: '456 Express Blvd, Chicago, IL',
      isFavorite: true,
      categories: ['Transportation', 'Warehousing'],
    },
    {
      id: '3',
      company: 'Tech Innovators',
      address: '789 Silicon Rd, San Jose, CA',
      isFavorite: true,
      categories: ['Hardware', 'Software'],
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.companyName}>[{item.company}]</Text>
        <TouchableOpacity style={styles.favoriteIconContainer}>
          <SvgXml
            xml={heartIcon}
            width={24}
            height={24}
            fill={item.isFavorite ? '#3E64FF' : 'none'}
            color="#3E64FF"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.locationContainer}>
        <SvgXml
          xml={
            locationIcon ||
            `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`
          }
          width={14}
          height={14}
        />
        <Text style={styles.address}>[{item.address}]</Text>
      </View>

      <View style={styles.categoriesContainer}>
        {item.categories.map((cat, index) => (
          <View key={index} style={styles.categoryPill}>
            <Text style={styles.categoryText}>[CategoriesItem item]</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.safeArea}>
      <CustomStatusBar barStyle="light-content" backgroundColor="#3E64FF" />
      <Header title="Favorite Suppliers" showBack={true} />

      <View style={styles.container}>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Favorite Supplier</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={suppliers}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default FavoriteSupplierScreen;
