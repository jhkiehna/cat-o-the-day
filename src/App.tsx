import React from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import { styles } from 'styles';
import { ImageContainer } from 'components/imageContainer';

function ImageWebView(props: { setImageUri: Function }) {
  const { setImageUri } = props;

  function handleOnMessage(event: WebViewMessageEvent) {
    const imageSrcs: string[] = JSON.parse(event.nativeEvent.data);
    console.log({ imageSrcs });
    const randomImageSrc = imageSrcs[Math.floor(Math.random() * imageSrcs.length)];
    setImageUri(randomImageSrc);
  }

  return (
    <View style={{ width: 100, height: 100, borderColor: 'red', borderWidth: 1, borderStyle: 'solid' }}>
      <WebView
        source={{ uri: 'https://www.google.com/search?q=cats&tbm=isch&tbs=isz:m' }}
        injectedJavaScript={`(() => {let imageSrcs = []; window.document.querySelectorAll('img').forEach((img) => {imageSrcs = [...imageSrcs, img.src];});window.ReactNativeWebView.postMessage(JSON.stringify(imageSrcs));})()`}
        onMessage={handleOnMessage}
      />
    </View>
  );
}

function App() {
  const [imageUri, setImageUri] = React.useState<string>(null);
  const [loadWebView, setLoadWebView] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoadWebView(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Cat-o-the-day App</Text>

      {imageUri ? <ImageContainer imageUri={imageUri} /> : null}

      {loadWebView ? <ImageWebView setImageUri={setImageUri} /> : null}
    </View>
  );
}

registerRootComponent(App);
