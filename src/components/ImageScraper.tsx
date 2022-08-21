import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import { fetchCatsFallback } from 'utils';

type ImageScraperProps = {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  modifier: string;
};

const ImageScraper: React.FC<ImageScraperProps> = ({ setImages, modifier }) => {
  function handleOnMessage(event: WebViewMessageEvent) {
    if (event.nativeEvent.loading) return;
    setImages(JSON.parse(event.nativeEvent.data));
  }

  async function fetchCatsFallbackCaller() {
    const fallbackImages = await fetchCatsFallback(modifier);
    setImages(fallbackImages);
  }

  React.useEffect(() => {
    if (Platform.OS === 'web') fetchCatsFallbackCaller();
  }, []);

  if (Platform.OS === 'web') return null;

  return (
    <WebView
      source={{ uri: `https://www.google.com/search?q=cats${modifier ? `+${modifier}` : ''}&tbm=isch&tbs=isz:m` }}
      injectedJavaScript={`
        (() => {
          let imageSrcs = [];
          window.document.querySelectorAll('img').forEach((img) => {
            if(img.width > 100 && img.src.length) imageSrcs = [...imageSrcs, img.src];
          }); 
          window.ReactNativeWebView.postMessage(JSON.stringify(imageSrcs));
        })()
      `}
      onMessage={handleOnMessage}
      onError={(event) => console.error(event.nativeEvent)}
    />
  );
};

export default ImageScraper;
