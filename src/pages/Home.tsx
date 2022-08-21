import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, SafeAreaView, TextInput, Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { AppTitle, ImageScraper, CatButton, LoadingSpinner } from 'components';

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

const Home: React.FC = () => {
  const initialModifier = defaultModifiers[Math.floor(Math.random() * defaultModifiers.length)];

  const [displayedImage, setDisplayedImage] = React.useState<string>(null);
  const [images, setImages] = React.useState<string[]>([]);
  const [inputText, setInputText] = React.useState<string>(initialModifier);
  const [modifier, setModifier] = React.useState<string>(initialModifier);
  const inputRef = React.useRef<TextInput>();

  const tailwind = useTailwind();

  React.useEffect(() => {
    if (images.length) {
      setDisplayedImage(images[Math.floor(Math.random() * images.length)]);
    }
  }, [images]);

  async function handleClick() {
    // Triggers a refetching of images if text input has changed.
    if (modifier !== inputText) return handleSubmit();

    // Iterates through array of available images and displays the next one.
    if (images.length && displayedImage) {
      const indexOfCurrentImage = images.findIndex((image) => image === displayedImage);
      setDisplayedImage(images[indexOfCurrentImage + 1] ?? images[0]);
    }
  }

  // Resets images and modifier, which triggers a refetching of images from the scraper.
  async function handleSubmit() {
    if (modifier === inputText) return;

    setDisplayedImage(null);
    setModifier(inputText);
    inputRef.current.blur();
  }

  return (
    <SafeAreaView style={tailwind('h-full flex flex-col justify-evenly pt-12 main-bg')}>
      <View style={{ display: 'none', width: 0, height: 0 }}>
        <ImageScraper setImages={setImages} modifier={modifier} />
      </View>

      <AppTitle text="Cat-o-the-Day!!" />

      <View style={tailwind('h-1/2 flex justify-center')}>
        {displayedImage ? (
          <Image
            style={tailwind('w-full h-full')}
            source={{ uri: displayedImage }}
            resizeMode={'contain'}
            key={displayedImage.slice(0, 50)}
          />
        ) : (
          <LoadingSpinner />
        )}
      </View>

      <TextInput
        ref={inputRef}
        style={tailwind('self-center w-1/2 border border-solid border-sky-500 rounded py-1 px-2')}
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        onEndEditing={handleSubmit}
        onSubmitEditing={handleSubmit}
      />

      <View style={tailwind('self-center w-1/2 border border-solid border-sky-500 rounded')}>
        <CatButton text="Show Me Cat!!" onPress={handleClick} />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Home;
