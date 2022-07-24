import { Image } from 'react-native';

import { styles } from 'styles';

export function ImageContainer(props: { imageUri: string }) {
  const { imageUri } = props;

  return <Image style={styles.catimg} source={{ uri: imageUri }} />;
}
