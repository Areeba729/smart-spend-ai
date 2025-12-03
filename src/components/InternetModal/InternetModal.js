import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import Modal from 'react-native-modal'
import images from '../../assets/images'
import { Responsive, Theme } from '../../libs'
import NativeButton from '../NativeButton/NativeButton'

const { AppFonts, getHeight, getWidth } = Responsive

export default function InternetModal({
  isVisible,
  handleRetry,
  title,
  description,
  shortDescription,
  btnTxt,
  btnDisable,
}) {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationInTiming={1000}
      animationOut="fadeOut"
      animationOutTiming={600}
      avoidKeyboard
      backdropOpacity={0.5}
      style={styles.modalStyle}
    >
      <View style={styles.wrapper}>
        <View style={styles.topWrap}>
          <Text style={styles.titleText}>{title}</Text>
          <Image
            source={images.signal}
            resizeMode='contain'
            style={styles.signalStyle}
          />
        </View>
        <View style={styles.bottomWrap}>
          <Text style={styles.descTxt}>{description}</Text>
          <Text style={styles.shortDescTxt}>{shortDescription}</Text>


          <NativeButton
            title={btnTxt}
            onPress={handleRetry}
            containerStyle={styles.btnContainer}
            titleStyle={styles.titleStyle}
            loading={btnDisable}
            disabled={btnDisable}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({

  modalStyle: {
    justifyContent: 'center',
  },

  wrapper: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borders.fullRadius,
  },

  topWrap: {
    borderTopRightRadius: Theme.borders.fullRadius,
    borderTopLeftRadius: Theme.borders.fullRadius,
    backgroundColor: Theme.colors.accent,
    justifyContent: 'center',
    paddingVertical: getWidth(4)
  },

  titleText: {
    fontSize: AppFonts.h4,
    fontWeight: 'bold',
    color: Theme.colors.white,
    textAlign: 'center',
  },

  signalStyle: {
    height: getWidth(20),
    width: getWidth(20),
    alignSelf: 'center',
    marginTop: getHeight(2)
  },


  bottomWrap: {
    paddingHorizontal: getWidth(7),
    paddingVertical: getWidth(4)
  },


  descTxt: {
    color: Theme.colors.black,
    textAlign: 'center',
    fontSize: AppFonts.h5
  },

  shortDescTxt: {
    marginTop: getHeight(1),
    color: Theme.colors.black,
    textAlign: 'center',
    fontSize: AppFonts.h5
  },

  btnContainer: {
    marginTop: getHeight(3),
    marginBottom: getHeight(0.5),
    width: '100%',
    alignSelf: 'center',
    height: getHeight(4.5),
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center'
  },
})
