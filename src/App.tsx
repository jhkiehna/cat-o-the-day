import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import { styles } from 'styles';
import { ImageContainer } from 'components/imageContainer';

function App() {
  const [imageUri, setImageUri] = React.useState<string>(null);

  function handleOnMessage(event: WebViewMessageEvent) {
    if (imageUri) return;

    const imageSrcs: string[] = JSON.parse(event.nativeEvent.data);
    console.log({ imageSrcs });

    while (imageSrcs.length) {
      const randomImageSrc = imageSrcs.splice(Math.floor(Math.random() * imageSrcs.length), 1)?.pop();
      console.log(randomImageSrc);
      if (randomImageSrc?.length) {
        setImageUri(randomImageSrc);
        break;
      }
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WebView
        style={{ display: 'none', width: 0, height: 0 }}
        source={{ uri: 'https://www.google.com/search?q=cats&tbm=isch&tbs=isz:m' }}
        injectedJavaScript={`(() => {let imageSrcs = []; window.document.querySelectorAll('img').forEach((img) => {imageSrcs = [...imageSrcs, img.src];});window.ReactNativeWebView.postMessage(JSON.stringify(imageSrcs));})()`}
        onMessage={handleOnMessage}
      />
      <Text>Cat-o-the-day App</Text>

      {imageUri ? <ImageContainer imageUri={imageUri} /> : null}
    </View>
  );
}

registerRootComponent(App);
