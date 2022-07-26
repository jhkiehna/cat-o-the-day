import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

export default function ImageScraper(props: {
  style: object;
  handleOnMessage: (event: WebViewMessageEvent) => void;
  type: string;
}) {
  if (Platform.OS === 'web') return null;

  const { style, handleOnMessage, type } = props;

  return (
    <WebView
      style={style}
      source={{ uri: `https://www.google.com/search?q=cats+${type}&tbm=isch&tbs=isz:m` }}
      scalesPageToFit={false}
      contentMode="desktop"
      injectedJavaScript={`(() => {let imageSrcs = []; window.document.querySelectorAll('img').forEach((img) => {if(img.width > 100 && img.src.length) imageSrcs = [...imageSrcs, img.src];}); window.ReactNativeWebView.postMessage(JSON.stringify(imageSrcs));})()`}
      onMessage={handleOnMessage}
      onError={(event) => console.error(event.nativeEvent)}
    />
  );
}
