import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { arrowIcon } from '../../assets/icons';
import { Theme } from '../../libs';
import styles from './style';

const Header = ({ title, showBack = true, onBackPress, customStyles }) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, customStyles?.container]}>
      {showBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress || (() => navigation.goBack())}
        >
          <SvgXml
            xml={arrowIcon}
            width={24}
            height={24}
            color={Theme.colors.white}
          />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, customStyles?.title]}>{title}</Text>
    </View>
  );
};

export default Header;
