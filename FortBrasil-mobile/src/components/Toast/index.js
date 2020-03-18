import Toast from 'react-native-tiny-toast';
import {StyleSheet} from 'react-native';

export const successIcon = msg => {
  Toast.showSuccess(msg, {
    showSuccess: true,
    containerStyle: styles.successIconContainer,
    duration: 3000,
    shadow: true,
    mask: true,
    onMaskPress: () => {
      Toast.hide();
    },
  });
};
export const info = msg =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: styles.infoContainer,
    textStyle: styles.erroText,
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 3000,
    animation: true,
  });

export const success = msg =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: styles.successContainer,
    textStyle: styles.erroText,
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 3000,
    animation: true,
  });

export const error = msg =>
  Toast.show(msg, {
    position: Toast.position.center,
    containerStyle: styles.errorContainer,
    textStyle: styles.erroText,
    imgStyle: {},
    mask: false,
    maskStyle: {},
    duration: 3000,
    animation: true,
  });

export function loading(status) {
  if (status) {
    Toast.showLoading('Carregando...');
  } else {
    Toast.hide();
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#aa1111',
    fontWeight: 'bold',
  },
  erroText: {
    color: '#fff',
  },
  successContainer: {
    backgroundColor: '#11aa11',
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#0088ff',
    fontWeight: 'bold',
  },
  successIconContainer: {
    backgroundColor: '#11aa11',
    height: 100,
    width: 100,
  },
});
