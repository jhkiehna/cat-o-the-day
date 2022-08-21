import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  View,
  ImageBackground,
  Text,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';

type CatButtonProps = {
  text: string;
  onPress: (event?: GestureResponderEvent) => void;
};

const CatButton: React.FC<CatButtonProps> = ({ text, onPress }) => {
  const tailwind = useTailwind();

  const Touchable: React.ComponentType<TouchableOpacityProps | TouchableNativeFeedbackProps> =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <Touchable onPress={onPress} accessibilityRole="button">
      <View style={tailwind('h-10 flex justify-center bg-sky-200 static')}>
        <ImageBackground
          source={require('images/cat-paw-vector-19.png')}
          style={tailwind('absolute top-0 left-0 w-2/3 h-full opacity-50')}
          resizeMode="cover"
        />
        <ImageBackground
          source={require('images/cat-paw-vector-19.png')}
          style={{
            ...tailwind('absolute bottom-0 right-0 w-1/2 h-full opacity-50'),
            transform: [{ scaleX: -1 }, { scaleY: -1 }],
          }}
          resizeMode="cover"
        />
        <Text
          style={{
            ...tailwind('text-center font-bold text-lg'),
            textShadowColor: '#333',
            textShadowRadius: 1,
            textShadowOffset: { width: 0.5, height: 0.5 },
            shadowOpacity: 0.2,
            opacity: 1,
          }}
        >
          {text.toUpperCase()}
        </Text>
      </View>
    </Touchable>
  );
};

export default CatButton;
