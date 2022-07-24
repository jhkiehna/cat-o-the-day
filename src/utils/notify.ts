import { ToastAndroid, Platform } from 'react-native';

export default function notify(message: string, duration?: number) {
  if (Platform.OS === 'android') {
    try {
      ToastAndroid.show(message, duration ?? ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
    }
  }
}
