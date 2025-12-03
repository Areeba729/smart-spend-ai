import { Image, View } from 'react-native';
import NativeText from '../NativeText/NativeText';

export default function OnboardingHeader({ image, title, desc, styles }) {
  return (
    <>
      <View style={styles.halfCircle} />
      <View style={styles.illustrationWrap}>
        <Image
          source={image}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      <View style={styles.textWrap}>
        <NativeText style={styles.title}>{title}</NativeText>
        <NativeText style={styles.desc}>{desc}</NativeText>
      </View>
    </>
  );
}
