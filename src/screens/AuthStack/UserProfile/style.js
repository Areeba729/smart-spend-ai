import { StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.black,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: moderateScale(40),
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: moderateScale(15),
  },
  avatar: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#93C523',
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Theme.colors.black,
  },
  cameraIcon: {
    fontSize: moderateScale(18),
    color: Theme.colors.black,
  },
  changePhotoText: {
    fontSize: moderateScale(14),
    color: '#93C523',
    fontWeight: '600',
  },
  formContainer: {
    paddingHorizontal: moderateScale(20),
  },
  label: {
    fontSize: moderateScale(13),
    color: Theme.colors.grey,
    marginBottom: moderateScale(8),
    marginLeft: moderateScale(5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(6),
    marginBottom: moderateScale(20),
  },
  inputIcon: {
    fontSize: moderateScale(20),
    marginRight: moderateScale(12),
    color: Theme.colors.grey,
  },
  input: {
    flex: 1,
    fontSize: moderateScale(16),
    color: Theme.colors.white,
  },
  saveButton: {
    backgroundColor: '#93C523',
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(40),
    marginBottom: moderateScale(30),
    paddingVertical: moderateScale(16),
    borderRadius: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: Theme.colors.black,
  },
});

export default styles;
