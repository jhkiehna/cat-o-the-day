import React from 'react';
import * as Notifications from 'expo-notifications';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Platform } from 'react-native';

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
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  React.useEffect(() => {
    if (Platform.OS !== 'web') registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

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
        body: "You've received your cat",
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
