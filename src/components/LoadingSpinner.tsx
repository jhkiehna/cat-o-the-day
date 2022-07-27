import { Image } from 'react-native';

import { styles } from 'styles';

export default function LoadingSpinner() {
  return <Image style={styles.loadingSpinner} source={require('images/cat_spin_dribble.gif')} resizeMode={'contain'} />;
}
