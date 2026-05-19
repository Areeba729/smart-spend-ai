import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { BackArrowIcon } from '../../../assets/icons';
import NativeText from '../../../components/NativeText/NativeText';
import { Theme } from '../../../libs';
import { scanReceiptWithMindee } from '../../../utils/scanReceiptWithMindee';
import styles from './style';

const ReceiptScannerScreen = ({ navigation }) => {
  const camera = useRef(null);
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scanning, setScanning] = useState(false);

  // ── Permission check ────────────────────────────────────────────────────
  if (!hasPermission) {
    return (
      <View style={styles.centeredContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <NativeText style={styles.permissionText}>
          Camera access is needed to scan receipts.
        </NativeText>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={() => {
            requestPermission();
          }}
        >
          <NativeText style={styles.permissionButtonText}>
            Grant Permission
          </NativeText>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centeredContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <NativeText style={styles.permissionText}>
          No camera device found on this device.
        </NativeText>
      </View>
    );
  }

  // ── Capture & process ───────────────────────────────────────────────────
  const handleCapture = async () => {
    if (!camera.current || scanning) return;

    try {
      const photo = await camera.current.takePhoto();
      setScanning(true);

      const { title, amount, date, category, note, currency } =
        await scanReceiptWithMindee(photo.path);

      navigation.navigate('AddExpense', {
        prefillData: { title: title, amount, date, note, category, currency },
      });
    } catch (error) {
      console.log('Receipt scan error:', error);
      Alert.alert(
        'Scan Failed',
        'Could not read the receipt. Please fill in the details manually.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('AddExpense'),
          },
        ],
      );
    } finally {
      setScanning(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Camera feed */}
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        photo
      />

      {/* Dark gradient at top for header legibility */}
      <View style={styles.topGradient} />

      {/* Header overlay */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          hitSlop={20}
          onPress={() => navigation.goBack()}
        >
          <SvgXml xml={BackArrowIcon} />
        </TouchableOpacity>
        <NativeText style={styles.headerTitle}>Scan Receipt</NativeText>
        <View style={styles.headerSpacer} />
      </View>

      {/* Viewfinder hint */}
      {!scanning && (
        <View style={styles.hintContainer} pointerEvents="none">
          <NativeText style={styles.hintText}>
            Point camera at the receipt and tap capture
          </NativeText>
        </View>
      )}

      {/* Scanning overlay */}
      {scanning && (
        <View style={styles.scanningOverlay}>
          <ActivityIndicator size="large" color={Theme.colors.secondary} />
          <NativeText style={styles.scanningText}>
            AI Scanning Receipt...
          </NativeText>
        </View>
      )}

      {/* Capture button */}
      {!scanning && (
        <View style={styles.captureContainer}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapture}
            activeOpacity={0.8}
          >
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ReceiptScannerScreen;
