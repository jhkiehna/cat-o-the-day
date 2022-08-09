import { Image } from 'react-native';

import { notify } from 'utils';

import { styles } from 'styles';

export default function ImageContainer(props: { imageUri: string }) {
  const { imageUri } = props;

  return (
    <Image
      style={styles.catimg}
      source={{ uri: imageUri }}
      // onLoad={() => notify('Got a Cat for the Day!')}
      resizeMode={'contain'}
    />
  );
}
