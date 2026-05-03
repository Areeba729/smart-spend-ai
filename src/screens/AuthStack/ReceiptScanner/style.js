import { StyleSheet } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';
import { Theme } from '../../../libs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  // ── Permission / error screens ──────────────────────────────────────────
  centeredContainer: {
    flex: 1,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
  },
  permissionText: {
    color: Theme.colors.text,
    fontSize: moderateScale(15),
    textAlign: 'center',
    marginBottom: scale(20),
    fontFamily: Theme.fonts.regular,
  },
  permissionButton: {
    backgroundColor: Theme.colors.secondary,
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    borderRadius: Theme.borders.fullRadius,
  },
  permissionButtonText: {
    color: Theme.colors.white,
    fontSize: moderateScale(14),
    fontFamily: Theme.fonts.semiBold,
  },

  // ── Top gradient overlay ────────────────────────────────────────────────
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: scale(100),
    backgroundColor: 'rgba(0,0,0,0.55)',
  },

  // ── Header overlay ──────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(48),
    paddingHorizontal: scale(16),
    paddingBottom: scale(12),
  },
  backButton: {
    width: scale(36),
    height: scale(36),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: Theme.colors.white,
    fontSize: moderateScale(17),
    fontFamily: Theme.fonts.semiBold,
  },
  headerSpacer: {
    width: scale(36),
  },

  // ── Hint text ───────────────────────────────────────────────────────────
  hintContainer: {
    position: 'absolute',
    bottom: scale(140),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  hintText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: moderateScale(13),
    fontFamily: Theme.fonts.regular,
    textAlign: 'center',
    paddingHorizontal: scale(32),
  },

  // ── Scanning overlay ────────────────────────────────────────────────────
  scanningOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(14),
  },
  scanningText: {
    color: Theme.colors.white,
    fontSize: moderateScale(16),
    fontFamily: Theme.fonts.semiBold,
    marginTop: scale(4),
  },

  // ── Capture button ──────────────────────────────────────────────────────
  captureContainer: {
    position: 'absolute',
    bottom: scale(48),
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: scale(72),
    height: scale(72),
    borderRadius: scale(36),
    borderWidth: 4,
    borderColor: Theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: Theme.colors.white,
  },
});

export default styles;
