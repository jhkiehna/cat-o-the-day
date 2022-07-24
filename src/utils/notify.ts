import { ToastAndroid, Platform } from 'react-native';

async function sendPushNotification(expoPushToken: string, message: string) {
  const body = {
    to: expoPushToken,
    sound: 'default',
    title: message,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

export default async function notify(expoPushToken: string, message: string, duration?: number) {
  if (Platform.OS === 'android') {
    try {
      ToastAndroid.show(message, duration ?? ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
    }
  }

  sendPushNotification(expoPushToken, message);
}
