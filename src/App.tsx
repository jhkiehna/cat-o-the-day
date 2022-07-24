import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';

import { styles } from 'styles';
import { ImageContainer } from 'components/imageContainer';
import { fetchCat, notify, usePushNotifications } from 'utils';

function App() {
  const [imageUri, setImageUri] = React.useState<string>(null);
  const expoPushToken = usePushNotifications();

  async function handleClick() {
    const imageUri = await fetchCat();

    if (imageUri) {
      setImageUri(imageUri);
      notify(expoPushToken, 'Got a Cat for the Day!');
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
