import React from 'react';
import { Text, Platform } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const iOSFont = 'AvenirNext-Bold';
const fontFamily = Platform.OS === 'ios' ? iOSFont : 'sans-serif';

const AppTitle: React.FC<{ text: string }> = ({ text }) => {
  const tailwind = useTailwind();

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
};

export default AppTitle;
