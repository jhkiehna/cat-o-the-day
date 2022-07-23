import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, ToastAndroid, Image } from 'react-native';

import { styles } from './styles';

const pexelsApiKey = '563492ad6f917000010000017b40f39d8095444facc21e9d744ba5b0';

export default function App() {
  const [imageUri, setImageUri] = React.useState<string>(null);

  async function getCat() {
    const response = await fetch('https://api.pexels.com/v1/search?query=cat', {
      headers: { Authorization: pexelsApiKey },
      mode: 'cors',
    }).catch((error) => console.error(error));

    if (!response) return;

    const body = await response.json().catch((error) => console.error(error));

    if (!body?.photos?.length) return;

    const photo = body.photos[Math.floor(Math.random() * body.photos.length)];
    const uri = photo?.src?.medium ?? photo?.src?.small ?? photo?.src?.large;
    console.log(uri);

    setImageUri(uri);

    try {
      ToastAndroid.show('Got a Cat for the Day!', ToastAndroid.SHORT);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Cat-o-the-day App</Text>
      <Button title="Getta Cat!" onPress={getCat} />
      <StatusBar style="auto" />

      {imageUri && <Image style={styles.catimg} source={{ uri: imageUri }} />}
    </View>
  );
}
