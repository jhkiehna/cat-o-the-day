import React from 'react';
import * as Notifications from 'expo-notifications';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';

import { styles } from 'styles';
import { ImageContainer } from 'components/imageContainer';
import { fetchCat, notify, registerForPushNotificationsAsync, sendPushNotification } from 'utils';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function App() {
  const [imageUri, setImageUri] = React.useState<string>(null);
  const [expoPushToken, setExpoPushToken] = React.useState<string>(null);
  const [notification, setNotification] = React.useState<Notifications.Notification>(null);
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function handleClick() {
    const imageUri = await fetchCat();

    if (imageUri) {
      setImageUri(imageUri);
      notify('Got a Cat for the Day!');
      sendPushNotification(expoPushToken, {
        title: 'Got a Cat!',
        body: 'Youve received your cat',
        data: { extra: 'Get more cats tomorrow!' },
      });
    }
  }

  return (
    <View style={styles.container}>
      <Text>Cat-o-the-day App</Text>
      <Button title="Getta Cat!" onPress={handleClick} />
      <StatusBar style="auto" />

      {imageUri && <ImageContainer imageUri={imageUri} />}
    </View>
  );
}

registerRootComponent(App);
