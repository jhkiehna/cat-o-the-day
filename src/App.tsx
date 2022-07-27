import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { debounce, random } from 'lodash';

import { styles } from 'styles';
import { ImageContainer, ImageScraper, LoadingSpinner } from 'components';

const defaultModifiers = [
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
  const initialModifier = defaultModifiers[random(0, defaultModifiers.length - 1)];

  const [displayedImage, setDisplayedImage] = React.useState<string>(null);
  const [images, setImages] = React.useState<string[]>([]);
  const [inputText, setInputText] = React.useState<string>(initialModifier);
  const [modifier, setModifier] = React.useState<string>(initialModifier);
  const [loading, setLoading] = React.useState<boolean>(true);
  const updateModifier = React.useCallback(
    debounce((text) => {
      setLoading(true);
      setImages([]);
      setModifier(text);
    }, 1000),
    [],
  );

  React.useEffect(() => {
    if (images.length) {
      let randomImage: string;

      do {
        randomImage = images[random(0, images.length - 1)];
      } while (displayedImage === randomImage && displayedImage?.length);

      setDisplayedImage(randomImage);
      setLoading(false);
    }
  }, [images]);

  async function handleClick() {
    if (modifier !== inputText) return updateModifier.flush();
    if (images.length) {
      const indexOfCurrentImage = images.findIndex((image) => image === displayedImage);
      setDisplayedImage(images[indexOfCurrentImage + 1] ?? images[0]);
    }
  }

  function handleChangeText(text: string) {
    setInputText(text);
    updateModifier(text);
  }

  return (
    <View style={styles.container}>
      <View style={{ display: 'none', width: 0, height: 0 }}>
        <ImageScraper setImages={setImages} modifier={modifier} images={images} />
      </View>

      <Text style={styles.header} suppressHighlighting={true}>
        Cat-o-the-Day!!
      </Text>

      <TextInput style={styles.input} value={inputText} onChangeText={handleChangeText} />

      <Button title="Show Me Cat!!" onPress={handleClick} />

      {loading ? <LoadingSpinner /> : <ImageContainer imageUri={displayedImage} />}

      <StatusBar style="auto" />
    </View>
  );
}

registerRootComponent(App);
