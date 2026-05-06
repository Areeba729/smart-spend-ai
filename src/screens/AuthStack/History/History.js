import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Theme } from '../../../libs';
import { moderateScale } from 'react-native-size-matters';
import ExpenseItem from '../../../components/HomeComponents/ExpenseItem/ExpenseItem';
import { SafeAreaView } from 'react-native-safe-area-context';

const History = ({ route }) => {
  const { historyData } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Theme.colors.secondary}
      />
      <FlatList
        data={historyData}
        keyExtractor={item => item.date}
        renderItem={({ item }) => (
          <ExpenseItem
            icon={item.icon || '💸'} // Default icon if not provided
            category={item.category}
            note={item.note}
            amount={`${item.amount} PKR`}
            title={item.title}
            date={item.date}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={{ color: Theme.colors.white, fontSize: 16 }}>
              No expenses found for this month.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  scrollView: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
});
