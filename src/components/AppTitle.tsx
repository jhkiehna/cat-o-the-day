import { Text, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const iOSFont = 'AvenirNext-Bold, Avenir Next, sans-serif-medium, sans-serif';
const fontFamily = Platform.OS === 'ios' ? iOSFont : 'sans-serif';

export default function AppTitle(props: { text: string }) {
  const tailwind = useTailwind();
  const { text } = props;

  return (
    <Text
      style={{
        ...tailwind(`font-bold text-xl text-center`),
        fontFamily,
      }}
      suppressHighlighting={true}
    >
      {text}
    </Text>
  );
}
