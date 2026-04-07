import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SvgXml } from 'react-native-svg';
import { editIcon } from '../../../assets/icons';
import NativeInput from '../../../components/NativeInput/NativeInput';
import NativeText from '../../../components/NativeText/NativeText';
import PageHeader from '../../../components/PageHeader/PageHeader';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import { Theme } from '../../../libs';
import { selectUser } from '../../../redux/slices/userSlice';
import { useProfileImage } from '../../../hooks/useProfileImage';
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
  const user = useSelector(selectUser);
  const { profileImageUrl, refreshProfileImage } = useProfileImage();

  useFocusEffect(
    useCallback(() => {
      refreshProfileImage();
    }, [refreshProfileImage])
  );

  const [editNameOpen, setEditNameOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nameValue, setNameValue] = useState(user?.fullName ?? '');

  const mountedRef = useRef(true);
  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    [],
  );

  useEffect(() => {
    setNameValue(user?.fullName ?? '');
  }, [user?.fullName]);

  const displayName = useMemo(() => user?.fullName ?? '', [user?.fullName]);

  const handleUpdate = useCallback(async (fields) => {
    setLoading(true);
    try {
      // TODO: Update Firestore user document with fields (e.g. fullName)
      console.log('User updated:', fields);
    } catch (e) {
      console.warn('Failed to update user:', e);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []);

  const saveName = useCallback(async () => {
    const trimmed = (nameValue ?? '').trim();
    if (!trimmed) return;
    await handleUpdate({ fullName: trimmed });
    if (mountedRef.current) setEditNameOpen(false);
  }, [handleUpdate, nameValue]);

  const firstLetter = (user?.fullName || user?.email || '?').charAt(0).toUpperCase();

  return (
    <View style={styles.container}>
      <PageHeader
        title="Account Details"
        showBookmark={false}
        onBackPress={() => navigation?.goBack?.()}
      />

      {/* Avatar - display only; change photo in Edit Profile */}
      <View style={styles.avatarContainer}>
        {profileImageUrl ? (
          <Image source={{ uri: profileImageUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>{firstLetter}</Text>
          </View>
        )}
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
