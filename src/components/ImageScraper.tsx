import React from 'react';
import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import { fetchCatsFallback } from 'utils';

type ImageScraperProps = {
  callback: (images: string[]) => void;
  modifier: string;
};

const ImageScraper: React.FC<ImageScraperProps> = ({ callback, modifier }) => {
  React.useEffect(() => {
    async function fetchCatsFallbackCaller() {
      const fallbackImages = await fetchCatsFallback(modifier);
      callback(fallbackImages);
    }

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
      onMessage={(event: WebViewMessageEvent) => callback(JSON.parse(event.nativeEvent.data))}
      onError={(event) => console.error(event.nativeEvent)}
    />
  );
};

export default ImageScraper;
