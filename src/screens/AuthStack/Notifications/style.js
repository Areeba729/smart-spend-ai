import { StyleSheet } from 'react-native';
import { Theme } from '../../../libs';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },

  systemNotificationBanner: {
    backgroundColor: Theme.colors.primary,
    borderRadius: 10,
    padding: 15,
    marginBottom: scale(20),
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
    marginTop: scale(10),
    margin: scale(10),
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.colors.text,
  },
  bannerSubText: {
    fontSize: 14,
    color: Theme.colors.text,
    marginVertical: 5,
  },
  openSettingsButton: {
    backgroundColor: Theme.colors.secondary,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: scale(10),
  },
  openSettingsText: {
    color: Theme.colors.white,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Theme.colors.white,
    marginBottom: 10,
    marginLeft: scale(15),
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(15),
    borderRadius: scale(8),
    backgroundColor: Theme.colors.primary,
    margin: scale(10),
    padding: scale(15),
  },
  alertLabel: {
    fontSize: 16,
    color: Theme.colors.white,
  },
  alertValue: {
    fontSize: 16,
    color: Theme.colors.primary,
  },
});

export default styles;
