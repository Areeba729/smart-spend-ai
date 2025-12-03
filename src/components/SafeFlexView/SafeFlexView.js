import { useTheme } from '@react-navigation/native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Platform, View } from 'react-native';
import CustomStatusBar from './CustomStatusBar';
import getStyles from './Style';

const SafeFlexView = ({
  children,
  isTop = true,
  isBottom = false,
  backgroundColor,
  isTopColor,
  isBottomColor,
  translucent,
  isPaddingTop = true,
  isPaddingBottom = true,
  barStyle = 'dark-content',
}) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const styles = getStyles(
    colors,
    isTopColor,
    isBottomColor,
    insets,
    isTop,
    isPaddingTop,
    isPaddingBottom,
  );

  return (
    <View style={[styles.container]}>
      <SafeAreaView edges={isTop ? [''] : ['top']} style={[styles.topFlex]} />
      <SafeAreaView
        edges={isBottom ? [''] : ['']}
        style={{ ...styles.bottomFlex, paddingBottom: 0 }}
      >
        {children}
      </SafeAreaView>

      {Platform.OS === 'android' && (
        <CustomStatusBar
          backgroundColor={backgroundColor}
          translucent={translucent}
          barStyle={barStyle}
        />
      )}
    </View>
  );
};

export default SafeFlexView;
