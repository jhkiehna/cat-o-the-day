import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { debounce, random } from 'lodash';

import { styles } from 'styles';
import { ImageContainer, ImageScraper } from 'components';

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
  const updateModifier = React.useCallback(
    debounce((text) => {
      setModifier(text);
    }, 500),
    [],
  );

  function getRandomNewImage() {
    let randomImage: string;

    do {
      randomImage = images[random(0, images.length - 1)];
    } while (displayedImage === randomImage && displayedImage?.length);

    return randomImage;
  }

  React.useEffect(() => {
    if (images.length) setDisplayedImage(getRandomNewImage());
  }, [images]);

  async function handleClick() {
    if (modifier !== inputText) updateModifier.flush();
    if (images.length) setDisplayedImage(getRandomNewImage());
  }

  function handleChangeText(text: string) {
    setInputText(text);
    setImages([]);
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

      {displayedImage ? <ImageContainer imageUri={displayedImage} /> : null}

      <StatusBar style="auto" />
    </View>
  );
}

registerRootComponent(App);
