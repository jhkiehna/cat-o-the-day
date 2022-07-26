import { Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

export default function ImageScraper(props: { style: object; handleOnMessage: (event: WebViewMessageEvent) => void }) {
  const { style, handleOnMessage } = props;

  if (Platform.OS === 'web') return null;

  return (
    <WebView
      style={style}
      source={{ uri: 'https://www.google.com/search?q=cats&tbm=isch&tbs=isz:m' }}
      injectedJavaScript={`(() => {let imageSrcs = []; window.document.querySelectorAll('img').forEach((img) => {imageSrcs = [...imageSrcs, img.src];});window.ReactNativeWebView.postMessage(JSON.stringify(imageSrcs));})()`}
      onMessage={handleOnMessage}
    />
  );
}
