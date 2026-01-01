import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import NativeText from '../../../../components/NativeText/NativeText';
import { editIcon } from '../../../../assets/icons';
import { styles } from '../style';

const ActionItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionItem} onPress={onPress}>
    <View style={styles.actionIconWrapper}>
      {typeof icon === 'string' ? (
        <NativeText style={styles.smallIcon}>{icon}</NativeText>
      ) : (
        <SvgXml xml={icon} width={20} height={20} color="#fff" />
      )}
    </View>
    <NativeText style={styles.actionLabel}>{label}</NativeText>
  </TouchableOpacity>
);

const ActionGrid = ({ navigation }) => {
  return (
    <View style={styles.actionGrid}>
      <ActionItem
        icon="🔺"
        label="Categories"
        onPress={() => navigation.navigate('CategoryBudgetList')}
      />
      <ActionItem
        icon={editIcon}
        label="Edit Budget"
        onPress={() => navigation.navigate('EditBudget')}
      />
      <ActionItem icon="🧠" label="AI Advice" />
    </View>
  );
};

export default ActionGrid;
