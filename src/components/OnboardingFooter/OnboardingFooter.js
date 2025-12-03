import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { cheveron } from '../../assets/icons';
import { Theme } from '../../libs';

const { colors } = Theme;

export default function OnboardingFooter({ step, stepsCount, onNext, styles }) {
  return (
    <View style={styles.footer}>
      <View style={styles.stepperWrap}>
        {Array.from({ length: stepsCount }).map((_, i) => (
          <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
        ))}
      </View>
      <TouchableOpacity
        style={styles.nextBtn}
        onPress={onNext}
        activeOpacity={0.8}
      >
        <SvgXml
          xml={cheveron}
          height={20}
          width={20}
          color={colors.white}
          style={styles.nextBtnIcon}
        />
      </TouchableOpacity>
    </View>
  );
}
