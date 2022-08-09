import { Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function LoadingSpinner() {
  const tailwind = useTailwind();

  return (
    <Image style={tailwind('w-full h-full')} source={require('images/cat_spin_dribble.gif')} resizeMode={'contain'} />
  );
}
