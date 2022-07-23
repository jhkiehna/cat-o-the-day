import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import { styles } from './styles';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Cat-o-the-day App</Text>
      <StatusBar style="auto" />
    </View>
  );
}
