import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import { styles } from 'styles';
import { ImageContainer, ImageScraper } from 'components';

function App() {
  const [displayedImage, setDisplayedImage] = React.useState<string>(null);
  const [images, setImages] = React.useState<string[]>([]);

  function handleOnMessage(event: WebViewMessageEvent) {
    if (images.length) return; // This fires twice for some reason, returning early if we already have images

    const imageSrcs: string[] = JSON.parse(event.nativeEvent.data).filter((src: string) => src.length);
    console.log({ imageSrcs });

    setImages(imageSrcs);

    if (!displayedImage) setDisplayedImage(imageSrcs[Math.floor(Math.random() * imageSrcs.length)]);
  }

  return (
    <View style={styles.container}>
      <ImageScraper style={{ display: 'none', width: 0, height: 0 }} handleOnMessage={handleOnMessage} />
      <View>
        <Text>Cat-o-the-day App</Text>
        <Button
          title="Show Me Cat!!"
          onPress={() => setDisplayedImage(images[Math.floor(Math.random() * images.length)])}
        />
      </View>

      {displayedImage ? <ImageContainer imageUri={displayedImage} /> : null}
      <StatusBar style="auto" />
    </View>
  );
}

registerRootComponent(App);
