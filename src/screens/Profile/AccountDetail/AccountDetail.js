import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { SvgXml } from 'react-native-svg';
import { editIcon } from '../../../assets/icons';
import { images } from '../../../assets/images';
import NativeInput from '../../../components/NativeInput/NativeInput';
import NativeText from '../../../components/NativeText/NativeText';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import { Theme } from '../../../libs';
import getStyles from './Style';

const { colors } = Theme;
const styles = getStyles(colors);

const ModalCard = ({ visible, onClose, children }) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <TouchableOpacity
      activeOpacity={1}
      style={styles.backdrop}
      onPressOut={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.modalCard, { backgroundColor: colors.background }]}
        onPress={() => {}}
      >
        {children}
      </TouchableOpacity>
    </TouchableOpacity>
  </Modal>
);

const AccountDetail = ({ navigation }) => {
  // Mock user data - replace with your actual data source
  const user = {
    uid: 'mock-uid',
    firstName: 'John',
    surname: 'Doe',
    fullName: 'John Doe',
    phonenumber: '+1234567890',
    companyName: 'Sample Company',
    employmentType: 'full-time',
    profile: null,
  };

  // UI state
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [nameValue, setNameValue] = useState(user?.fullName ?? '');

  // Mounted ref to avoid state updates after unmount during async ops
  const mountedRef = useRef(true);
  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  const displayName = useMemo(() => user?.fullName ?? '', [user?.fullName]);

  const handleUpdate = useCallback(async fields => {
    setLoading(true);
    try {
      // TODO: Update local state or context with new user data
      console.log('User updated:', fields);
    } catch (e) {
      // You can plug in a toast/snackbar here
      console.warn('Failed to update user:', e);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  const pickImage = useCallback(() => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 1 },
      async response => {
        if (response?.didCancel || response?.errorCode) return;
        const asset = response?.assets?.[0];
        if (!asset?.uri) return;

        setLoading(true);
        try {
          const path = `users/profile/${user.uid}_${Date.now()}.jpg`;
          console.log(path);

          // const url = await uploadImageToFirebase(asset.uri, path);

          await handleUpdate({ profile: 'url' });
        } catch (e) {
          console.warn('Image upload failed:', e);
        } finally {
          if (mountedRef.current) setLoading(false);
        }
      },
    );
  }, [handleUpdate, user?.uid]);

  const saveName = useCallback(async () => {
    const trimmed = (nameValue ?? '').trim();
    if (!trimmed) return;

    let fields;
    fields = { fullName: trimmed };
    await handleUpdate(fields);
    if (mountedRef.current) setEditNameOpen(false);
  }, [handleUpdate, nameValue]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Account Details"
        showBookmark={false}
        onBackPress={() => navigation?.goBack?.()}
      />

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        {loading ? (
          <ActivityIndicator color={colors.primary} style={styles.avatar} />
        ) : (
          <Image
            source={user?.profile ? { uri: user.profile } : images.profile}
            style={styles.avatar}
          />
        )}
        <View style={styles.editIconPos}>
          <TouchableOpacity style={styles.editIconWrapper} onPress={pickImage}>
            <SvgXml
              xml={editIcon}
              width={26}
              height={26}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Full name */}
      <View style={styles.section}>
        <NativeText style={styles.label}>Full Name</NativeText>
        <View style={styles.inputCard}>
          <NativeText style={styles.inputText}>{displayName}</NativeText>
          <TouchableOpacity
            style={styles.editIconWrapper}
            onPress={() => setEditNameOpen(true)}
          >
            <SvgXml
              xml={editIcon}
              width={26}
              height={26}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Phone (read-only) */}
      <View style={styles.section}>
        <NativeText style={styles.label}>Phone Number</NativeText>
        <View style={styles.inputCard}>
          <NativeText style={styles.inputText}>
            {user?.phonenumber ?? ''}
          </NativeText>
        </View>
      </View>

      {/* Edit Name Modal */}
      <ModalCard
        visible={editNameOpen}
        onClose={() => setEditNameOpen(false)}
        colors={colors}
      >
        <NativeText style={styles.modalTitle}>Full Name</NativeText>
        <NativeInput
          value={nameValue}
          onChangeText={setNameValue}
          inputContainerStyle={[styles.inputContainer(colors)]}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={saveName}
        />
        <PrimaryButton
          title="Save"
          containerStyle={styles.fullWidth}
          onPress={saveName}
          loading={loading}
        />
      </ModalCard>
    </View>
  );
};

export default AccountDetail;
