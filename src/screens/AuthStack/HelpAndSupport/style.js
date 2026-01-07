import { StyleSheet } from 'react-native';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
    padding: 20,
  },
  searchSection: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Theme.colors.white,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: 10,
    padding: 10,
    color: Theme.colors.white,
  },
  contactOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactOptionButton: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  contactOptionText: {
    color: Theme.colors.white,
    fontWeight: 'bold',
  },
  faqSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.white,
    marginBottom: 10,
  },
  faqItem: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  faqQuestion: {
    color: Theme.colors.white,
  },
  linksSection: {
    marginBottom: 20,
  },
  linkItem: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  linkText: {
    color: Theme.colors.white,
  },
});

export default styles;
