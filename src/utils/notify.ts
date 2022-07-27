import { ToastAndroid, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

let EXPO_PUSH_TOKEN: string;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'web' && !Device.isDevice) throw new Error('Cannot get token for non mobile device');

  if ((await Notifications.getPermissionsAsync()).status !== 'granted') {
    const status = (await Notifications.requestPermissionsAsync()).status;

    if (status !== 'granted') throw new Error('Failed to get push token for push notification!');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  EXPO_PUSH_TOKEN = (await Notifications.getExpoPushTokenAsync()).data;
}

async function sendPushNotification(message: string) {
  const body = {
    to: EXPO_PUSH_TOKEN,
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

export default async function notify(message: string, duration?: number) {
  try {
    if (!EXPO_PUSH_TOKEN) await registerForPushNotificationsAsync();
    if (EXPO_PUSH_TOKEN) sendPushNotification(message);
    if (Platform.OS === 'android') ToastAndroid.show(message, duration ?? ToastAndroid.SHORT);
  } catch (error) {
    console.error(error);
  }
}
