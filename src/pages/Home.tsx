import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, Button, TextInput, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { AppTitle, ImageScraper, LoadingSpinner } from 'components';

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
  'cartoon',
  'fluffy',
  'bread',
  'happy',
  'hemmingway',
  'scottish fold',
  'tuxedo',
  'longhair',
  'kitten',
  'nyan',
  'poptart',
  'UwU',
  'pusheen',
  'sneaky',
];

export default function Home() {
  const initialModifier = defaultModifiers[Math.floor(Math.random() * defaultModifiers.length)];

  const [displayedImage, setDisplayedImage] = React.useState<string>(null);
  const [images, setImages] = React.useState<string[]>([]);
  const [inputText, setInputText] = React.useState<string>(initialModifier);
  const [modifier, setModifier] = React.useState<string>(initialModifier);
  const [loading, setLoading] = React.useState<boolean>(true);

  const tailwind = useTailwind();

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
    <SafeAreaView style={tailwind('h-full flex flex-col justify-evenly pt-12 main-bg')}>
      <View style={{ display: 'none', width: 0, height: 0 }}>
        <ImageScraper setImages={setImages} modifier={modifier} images={images} />
      </View>
      <AppTitle text="Cat-o-the-Day!!" />

      <View style={tailwind('h-1/2 flex justify-center')}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Image style={tailwind('w-full h-full')} source={{ uri: displayedImage }} resizeMode={'contain'} />
        )}
      </View>

      <TextInput
        style={tailwind('self-center w-1/2 border border-solid border-sky-500 rounded py-1 px-2')}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        onEndEditing={handleClick}
        onSubmitEditing={handleClick}
      />

      <Button title="Show Me Cat!!" onPress={handleClick} />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
