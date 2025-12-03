import { ScrollView, View } from 'react-native';
import NativeText from '../../../components/NativeText/NativeText';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Theme } from '../../../libs';
import { PRIVACY_POLICY_CONTENT } from '../../../libs/constants';
import getStyles from './Style';

const PrivacyPolicy = ({ navigation }) => {
  const { colors } = Theme;
  const styles = getStyles(colors);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Privacy Policy"
        showBookmark={false}
        onBackPress={() => navigation?.goBack?.()}
      />
      <ScrollView>
        <NativeText style={styles.contentText}>
          {PRIVACY_POLICY_CONTENT}
        </NativeText>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
