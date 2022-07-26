import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import { styles } from 'styles';
import { ImageContainer, ImageScraper } from 'components';
import { fetchCatsFallback } from 'utils';

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

  async function handleClick() {
    if (images.length) return setDisplayedImage(images[Math.floor(Math.random() * images.length)]);

    const fallbackImages = await fetchCatsFallback();
    setImages(fallbackImages);

    if (!displayedImage && fallbackImages.length) {
      setDisplayedImage(fallbackImages[Math.floor(Math.random() * fallbackImages.length)]);
    }
  }

  return (
    <View style={styles.container}>
      <ImageScraper style={{ display: 'none', width: 0, height: 0 }} handleOnMessage={handleOnMessage} />
      <Text
        style={styles.header}
        numberOfLines={1}
        allowFontScaling={true}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.1}
        suppressHighlighting={true}
      >
        Cat-o-the-Day!!
      </Text>
      <Button title="Show Me Cat!!" onPress={handleClick} />

      {displayedImage ? <ImageContainer imageUri={displayedImage} /> : null}
      <StatusBar style="auto" />
    </View>
  );
}

registerRootComponent(App);
