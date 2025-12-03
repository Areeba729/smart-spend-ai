import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { arrowIcon, bookmarkIcon, filterIcon } from '../../assets/icons';
import { Theme } from '../../libs';
import NativeText from '../NativeText/NativeText';
import styles from './Style';

const PageHeader = ({
  title,
  showBack = true,
  onBackPress,
  showBookmark = true,
  onBookmarkPress,
  customBackIcon,
  customBookmarkIcon,
  showFilter = false,
  onFilterPress,
}) => (
  <View style={styles.header}>
    {showBack ? (
      <View style={styles.iconButton}>
        <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
          <SvgXml
            xml={customBackIcon || arrowIcon}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View />
    )}
    <NativeText style={styles.title}>{title}</NativeText>
    {showFilter ? (
      <View style={styles.iconButton}>
        <TouchableOpacity style={styles.iconButton} onPress={onFilterPress}>
          <SvgXml xml={filterIcon} color={Theme.colors.primary} />
        </TouchableOpacity>
      </View>
    ) : null}
    {showBookmark ? (
      <View style={styles.iconButton}>
        <TouchableOpacity style={styles.iconButton} onPress={onBookmarkPress}>
          <SvgXml
            xml={customBookmarkIcon || bookmarkIcon}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    ) : (
      <View />
    )}
  </View>
);

export default PageHeader;
