import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, NativeSyntheticEvent } from 'react-native';

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
  const initialModifier = defaultModifiers[Math.floor(Math.random() * defaultModifiers.length)];

  const [displayedImage, setDisplayedImage] = React.useState<string>(null);
  const [images, setImages] = React.useState<string[]>([]);
  const [inputText, setInputText] = React.useState<string>(initialModifier);
  const [modifier, setModifier] = React.useState<string>(initialModifier);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (images.length) {
      setDisplayedImage(images[Math.floor(Math.random() * images.length)]);
      setLoading(false);
    }
  }, [images]);

  async function handleClick() {
    if (modifier !== inputText) {
      setLoading(true);
      setImages([]);
      setModifier(inputText);
      return;
    }

    if (images.length) {
      const indexOfCurrentImage = images.findIndex((image) => image === displayedImage);
      setDisplayedImage(images[indexOfCurrentImage + 1] ?? images[0]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ display: 'none', width: 0, height: 0 }}>
        <ImageScraper setImages={setImages} modifier={modifier} images={images} />
      </View>

      <Text style={styles.header} suppressHighlighting={true}>
        Cat-o-the-Day!!
      </Text>

      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        onEndEditing={handleClick}
        onSubmitEditing={handleClick}
      />

      <Button title="Show Me Cat!!" onPress={handleClick} />

      {loading ? <LoadingSpinner /> : <ImageContainer imageUri={displayedImage} />}

      <StatusBar style="auto" />
    </View>
  );
}

registerRootComponent(App);
