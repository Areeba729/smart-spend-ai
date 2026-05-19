import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  scrollContent: {
    paddingBottom: moderateScale(40),
  },
  intro: {
    fontSize: moderateScale(14),
    color: Theme.colors.grey,
    lineHeight: moderateScale(22),
    paddingHorizontal: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  section: {
    marginBottom: moderateScale(24),
    paddingHorizontal: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: moderateScale(12),
    marginLeft: moderateScale(5),
  },
  aboutCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  aboutTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Theme.colors.white,
    marginBottom: moderateScale(8),
  },
  aboutBody: {
    fontSize: moderateScale(14),
    color: Theme.colors.lighttextcolor,
    lineHeight: moderateScale(22),
  },
  faqCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(16),
    marginBottom: moderateScale(12),
  },
  faqQuestion: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: Theme.colors.white,
    marginBottom: moderateScale(8),
  },
  faqAnswer: {
    fontSize: moderateScale(14),
    color: Theme.colors.lighttextcolor,
    lineHeight: moderateScale(22),
  },
  contactCard: {
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(18),
    marginBottom: moderateScale(12),
  },
  contactLabel: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Theme.colors.white,
    marginBottom: moderateScale(4),
  },
  contactHint: {
    fontSize: moderateScale(13),
    color: Theme.colors.grey,
    marginBottom: moderateScale(4),
  },
  contactValue: {
    fontSize: moderateScale(14),
    color: Theme.colors.secondary,
    fontWeight: '600',
  },
  version: {
    fontSize: moderateScale(12),
    color: Theme.colors.grey,
    textAlign: 'center',
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(20),
  },
});

export default styles;
