import React from 'react';
import { Image } from 'react-native';
import { useTailwind } from 'tailwind-rn';

const LoadingSpinner: React.FC = () => {
  const tailwind = useTailwind();

  return (
    <Image
      style={tailwind('w-full h-full')}
      source={require('images/cat_spin_dribble.gif')}
      resizeMode={'contain'}
      key="loading"
    />
  );
};

export default React.memo(LoadingSpinner);
