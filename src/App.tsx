import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, Platform } from 'react-native';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import { debounce } from 'lodash';

import { styles } from 'styles';
import { ImageContainer, ImageScraper } from 'components';
import { fetchCatsFallback } from 'utils';

const defaultTypes = [
  'cute',
  'playing',
  'baby',
  'eating',
  'sleeping',
  'winter',
  'mountain',
  'wild',
  'meme',
  'American',
  'Russian',
  'African',
  'Japanese',
];

function App() {
  const [displayedImage, setDisplayedImage] = React.useState<string>(null);
  const [images, setImages] = React.useState<string[]>([]);
  const [type, setType] = React.useState<string>(defaultTypes[Math.floor(Math.random() * defaultTypes.length)]);

  function handleOnMessage(event: WebViewMessageEvent) {
    if (images.length) return; // This fires twice for some reason, returning early if we already have images

    let imageSrcs = JSON.parse(event.nativeEvent.data) as string[];
    console.log({ imageSrcs });

    setImages(imageSrcs);

    if (!displayedImage) setDisplayedImage(imageSrcs[Math.floor(Math.random() * imageSrcs.length)]);
  }

  async function handleClick() {
    if (images.length) return setDisplayedImage(images[Math.floor(Math.random() * images.length)]);

    if (Platform.OS === 'web') {
      const fallbackImages = await fetchCatsFallback();
      setImages(fallbackImages);

      if (!displayedImage && fallbackImages.length) {
        setDisplayedImage(fallbackImages[Math.floor(Math.random() * fallbackImages.length)]);
      }
    }
  }

  function handleChange(event) {
    setImages([]);
    setDisplayedImage(null);

    return setType(event);
  }

  return (
    <View style={styles.container}>
      <ImageScraper style={{ display: 'none', width: 0, height: 0 }} handleOnMessage={handleOnMessage} type={type} />
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
      <TextInput style={styles.input} value={type} onChangeText={handleChange} />
      <Button title="Show Me Cat!!" onPress={handleClick} />

      {displayedImage ? <ImageContainer imageUri={displayedImage} /> : null}
      <StatusBar style="auto" />
    </View>
  );
}

registerRootComponent(App);
